import formTamplate from "./form.html";
import { service } from "../../service/service";
import { showJoke } from "../jokes/jokes";
const formWrapper = document.getElementById("formWrapper");

if (formWrapper && formTamplate) {
  formWrapper.innerHTML = formTamplate;
}

let path = "";
export const setPathfromCategory = (newPath) => {
  path = newPath;
};
const searchInput = formWrapper.querySelector("#searchInput");
const form = formWrapper.querySelector("form");
const categoriesWrapper = form.querySelector("#categoriesWrapper");

const cleanCategoryWrapper = () => {
  categoriesWrapper.querySelectorAll("li").forEach((item) => {
    item.lastChild.classList.remove("focus");
  });
};

if (formWrapper) {
  formWrapper.onsubmit = (e) => {
    e.preventDefault();

    let jokeType = formWrapper.querySelector(
      `input[name="jokeType"]:checked`
    ).value;
    switch (jokeType) {
      case "random":
        path = `random`;
        break;
      case "search":
        path = `/search?query=${searchInput.value}`;
        break;
    }
    try {
      (async () => {
        const res = await service.getJoke(path);

        res.result
          ? res.result.forEach((item) => showJoke(item))
          : showJoke(res);
      })();
    } catch (err) {
      console.log(err);
    }
    searchInput.value = "";
    path = `random`;
    cleanCategoryWrapper();
  };
}

function show(element) {
  element.classList.remove("hide");
}
function hide(element) {
  element.classList.add("hide");
}

form.onchange = () => {
  let reqType = form.querySelector(`input[name="jokeType"]:checked`).value;
  switch (reqType) {
    case "random":
      hide(categoriesWrapper);
      hide(searchInput);
      searchInput.removeAttribute("required");

      break;

    case "categories":
      show(categoriesWrapper);
      hide(searchInput);
      searchInput.removeAttribute("required");

      break;

    case "search":
      hide(categoriesWrapper);
      show(searchInput);
      searchInput.setAttribute("required", "required");

      break;
  }
};
