/* eslint-disable no-unused-vars */
function charcountupdate(str, field_id) {
  var lng = str.length;
  document.getElementById(field_id).innerHTML = lng;
}
function UpdateWordCount(str, field_id) {
  let parsedStr = str.replace(/[0-9.,â€“Â£Â·()/]+/gm, "");
  parsedStr = parsedStr.split(/[\s'â€™]+/gm);
  document.getElementById(field_id).innerHTML = parsedStr.length;
}
