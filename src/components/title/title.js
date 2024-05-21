import titleTamplate from "./title.html";
const titleWrapper = document.getElementById("titleWrapper");

if (titleTamplate && titleWrapper) {
  titleWrapper.innerHTML = titleTamplate;
}
