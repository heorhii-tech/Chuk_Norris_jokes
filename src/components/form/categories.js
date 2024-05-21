import { service } from "../../service/service";
const formWrapper = document.getElementById("formWrapper");
const form = formWrapper.querySelector("form");
const categoriesWrapper = form.querySelector("#categoriesWrapper");
import { setPathfromCategory } from "./form";

(async () => {
  try {
    const categories = await service.getCategories();
    categoriesWrapper.innerHTML = categories
      .map((category, index) => {
        return `<li data-cat=${category} class="liCat">
        <label for="" class="">${category.toUpperCase()}
            <input type="radio"
            name="jokeCategory"
            value=${category}
               ${!index ? "checked" : ""}
        </label>
    </li>`;
      })
      .join(" ");
    categoriesWrapper.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", (e) => {
        categoriesWrapper.querySelectorAll(`li`).forEach((cat) => {
          e.target.innerText === cat.innerText
            ? cat.lastChild.classList.add(`focus`)
            : cat.lastChild.classList.remove(`focus`);
        });
        setPathfromCategory(
          `/random?category=${e.target.innerText.toLowerCase()}`
        );
      });
    });
  } catch (err) {
    console.log(err);
  }
})();
