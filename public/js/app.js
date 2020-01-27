'use strict';
document.getElementById('addtodatabase').onclick = function() {myFunction();};

function myFunction() {
  alert('added thanks a lot ');
}

document.getElementById('updateclick').onclick = function() {myFunction2();};

function myFunction2() {
  alert('update');
  document.getElementById('hiddenform').style.display = 'block';
}
