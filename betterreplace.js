/*
//Return only elements which have no children
function filterParents(elements) {
  var leaves = [];
  for(var i = 0; i < elements.length; i++) {
    if(!elements[i].hasChildNodes()){
      leaves[leaves.length]=i;
      console.log(elements[i].innerHTML);
    }
    return leaves;
  }
}
//Return an object with the array index of element as key, and an array of the words in its
//inner HTML as the value.
function getWordList(leaves, nodelist) {
  var wordlists = {};
  for(var i = 0; i < leaves.length; i++) {
    wordlists[leaves[i]] = nodelist[leaves[i]].innerHTML.split(" ");
  }
  return wordlists;
}
*/
//If the word is simple and contains no non-letters, replace it with a synonym
function tryGetReplace(word) {
  if(typeof word != "string") {
    return false;
  }

  var isCapitalized = false;
  var start = word.length;
  var end = 0;

  for(var i = 0; i < word.length; i++) {
    if(word.charCodeAt(i) >= 65 && word.charCodeAt(i) <= 90) {
      isCapitalized = true;
      start = i;
      break;
    }
    else if(word.charCodeAt(i) >= 97 && word.charCodeAt(i)<= 122) {
      start = i;
      break;
    }
  }

  for(var i = word.length; i >= 0; i--) {
    if((word.charCodeAt(i) >= 97 && word.charCodeAt(i) <= 122) || (word.charCodeAt(i) >= 65 && word.charCodeAt(i) <= 90)) {
      end = i;
      break;
    }
  }
  if(end <= start) {
    return false;
  }
  var testedword = word.slice(start,end+1).toLowerCase();
  console.log(testedword + "-Tested Word");
  var firstchars = word.slice(0,start);
  var lastchars = word.slice(end+1);
  /*
  for(var i = 0; i < testedword.length; i++) {
    if(testedword.charCodeAt(i) < 65 || testedword.charCodeAt(i) > 90){
      return false;
    }
  }
  */
  if(isSimple(testedword)) {
    var rawreplacement = getSynonym(testedword);
    var replacement;
    if(isCapitalized) {
      replacement = firstchars.concat(rawreplacement.slice(0,1).toUpperCase(),rawreplacement.slice(1),lastchars);
    }
    else {
      replacement = firstchars.concat(rawreplacement,lastchars);
    }
    return replacement;
  } else {
    return false;
  }
}
//Test whether a word is simple enough to replace but not too simple
function isSimple(word) {
  /*
  var rank = 0;
  if(word in frequencylist) {
    rank = frequencylist[word];
  }
  if(rank > 50 && rank < 1000) {
    return true;
  }
  return false;
  */
  if(word.length < 6) {
    return true;
  }
  return false;
}
//Get a synonym for a word
function getSynonym(word) {
  return word.concat("test");
}
//Replace approximately every nth word in an array of words with a synonym
function replaceWords(wordlist, n) {
  var index = 0;
  index += parseInt(Math.random()*n);
  while(index < wordlist.length) {
    var replacement = tryGetReplace(wordlist[index]);
    //var replacement = wordlist[index].concat("ttt");
    if(replacement) {
      wordlist[index] = replacement;
      index += parseInt(Math.random()*1.5*n);
    }
    else {
      index += 1;
    }
  }
}
//Turn an array of words back to a paragraph of text
function backToText(wordlist) {
  var string = wordlist[0];
  for(var i = 1; i < wordlist.length; i++) {
    string = string.concat(" ", wordlist[i]);
  }
  return string;
}

console.log("Starting Replacement");
/*
var frequencylist;
console.log(chrome.extension.getURL('words.json'));
$.getJSON(chrome.extension.getURL('words.json'), function(data) {
  frequencylist = data;//$.parseJSON(data);
});
console.log(typeof frequencylist);
*/
/*
var allelements = document.getElementsByTagName("*"); //All elements on page
console.log(allelements);
var list = filterParents(allelements); //Array indexes of elements on page meeting criteria
console.log(list);
console.log(document.getElementsByTagName("*")[list[0]].innerHTML);// = "why, oh god why will this message not appear";
var wordlists = getWordList(list, allelements); //allelements index : list of words
//var textlist = {};
for(id in wordlists) {
  replaceWords(wordlists[id], 7);
  allelements[id].innerHTML = backToText(wordlists[id]);
}
*/

walk(document.body);

function walk(node)
{
	// I stole this function from here:
	// http://is.gd/mwZp7E

	var child, next;

	switch ( node.nodeType )
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode)
{

  var wordlist = textNode.nodeValue.split(" ");
  console.log("Initial list "+wordlist);
  replaceWords(wordlist, 7);
  console.log("Changed list " + wordlist);
  var finalvalue = backToText(wordlist);
  console.log("Resulting text " + finalvalue);
  textNode.nodeValue = finalvalue;

  var v = textNode.nodeValue;
	v = v.replace(/\bAndrew\b/g, "The Greatest Among Us");
	textNode.nodeValue = v;
}
