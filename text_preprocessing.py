import re
import nltk
import itertools
import pickle
from collections import Counter
from nltk.stem.wordnet import WordNetLemmatizer
import os
import sys

def save_obj(obj, name):
    with open(name + '.pkl', 'wb') as f:
        pickle.dump(obj, f, pickle.HIGHEST_PROTOCOL)

def load_obj(name):
    with open(name + '.pkl', 'rb') as f:
        return pickle.load(f)

def get_pos(tag):
    if tag.startswith('V'):
        return 'v'
    elif tag.startswith('R'):
        return 'r'
    elif tag.startswith('N'):
        return 'n'
    elif tag.startswith('J'):
        return 'a'
    else:
        return ''

def get_freqs(paths):
    lemmatized = []
    frequencies = Counter()
    percent = 0
    blacklist = ['be', 'have', 'it', '—', 'also', 'its']

    for index, path in enumerate(paths):
        try:
            with open(path, 'r+') as file:
                text = file.read()

            text = text.lower()
            tokens = nltk.word_tokenize(text)
            tagged = nltk.pos_tag(tokens)
            lmtzr = WordNetLemmatizer()


            for ele in tagged:
                if get_pos(ele[1]):
                    lemmatized.append(lmtzr.lemmatize(ele[0], get_pos(ele[1])))
                elif ele[1] in ['DT', 'TO', 'CC', 'IN']:
                    pass
                elif re.search('([A-Za-z])', ele[1]):
                    lemmatized.append(ele[0])

            for i in range(len(lemmatized)):
                word = lemmatized[i]
                for j in itertools.chain(range(max(0, i-10), i),
                    range(i+1, min(len(lemmatized), i+10))):
                    adj_word = lemmatized[j]
                    if adj_word not in blacklist:
                        if word in frequencies:
                            if adj_word in frequencies[word]:
                                frequencies[word][adj_word] += 1
                            else:
                                frequencies[word][adj_word] = 1
                        else:
                            frequencies[word] = Counter({adj_word: 1})
        except:
            print("Could not open file!")
        if 100*index/len(paths) >= percent + .1:
            percent += .1
            print(str(percent) + '%')
            print(path)

    for word in frequencies:
        tot = sum([frequencies[word][adj_word] for adj_word in frequencies[word]])
        frequencies[word] = Counter(dict(frequencies[word].most_common(50)))
        for adj_word in frequencies[word]:
            frequencies[word][adj_word] /= tot
    return frequencies

if __name__ == "__main__":
    paths = sys.argv
    freqs = get_freqs(paths)
    save_obj(freqs, 'freqs')
