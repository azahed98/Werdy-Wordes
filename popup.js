<<<<<<< HEAD
// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
 function getSelectedText() {
        var text = "";
        if (typeof window.getSelection != "undefined") {
            text = window.getSelection().toString();
        } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
            text = document.selection.createRange().text;
        }
        return text;
    }
    
    function doSomethingWithSelectedText() {
        var selectedText = getSelectedText();
        if (selectedText) {
            alert("Got selected text " + selectedText);
        }
    }

// $(".complexity").on("change", function(){console.log(document.getElementById("complexity").value);simplebenchmark = document.getElementById("complexity").value;});

document.getElementById("complexity").addEventListener("change", complexChange);

function complexChange() {
    // simplebenchmark  = document.getElementById("complexity").value;
    alert("test");
=======
// function renderStatus(statusText) {
//   document.getElementById('status').textContent = statusText;
// }
function complexFunc() {
  console.log("It's adead!");
  //alert(document.getElementById("complexity").value);
  chrome.extension.getBackgroundPage().simplebenchmark = document.getElementById("complexity").value;
>>>>>>> eb0477ba41cb661610631427c528e795675a1ac8
}
document.getElementById('complexity').onchange = complexFunc;
function jumpFunc() {
  chrome.extension.getBackgroundPage().replacespacing = document.getElementById("jumplength").value;
}
document.getElementById('jumplength').onchange = jumpFunc;
/*
document.addEventListener('DOMContentLoaded', function() {
  	renderStatus(window.getSelection().toString());
    console.log("testtest");
});
*/
document.addEventListener('DOMContentLoaded', function() {
    // renderStatus(window.getSelection().toString());
    console.log("testtest");
    document.getElementById("complexity").addEventListener("change", complexFunc);
});
