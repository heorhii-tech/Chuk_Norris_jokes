const header = document.getElementById("header");
import burgerMenuClosedTamplate from "../../assets/favoriteON.png";
import burgerMenuOpenedTamplate from "../../assets/close.png";
import headerTamplate from "./header.html";
const sideBar = document.getElementById(`sideBar`);
const overlay = document.getElementById(`overlay`);

if (header && headerTamplate) {
  header.innerHTML = headerTamplate;
}
const burgerMenu = header.querySelector("#burgerMenu");
const favIcon = burgerMenu.querySelector("#favIcon");

favIcon ? (favIcon.src = burgerMenuClosedTamplate) : null;
const setFavIcon = () => {
  if (burgerMenu.classList.contains("opened"))
    favIcon.src = burgerMenuClosedTamplate;
  else if (burgerMenu.classList.contains("closed"))
    favIcon.src = burgerMenuOpenedTamplate;
};

burgerMenu.onclick = () => {
  switch (true) {
    case burgerMenu.classList.contains("opened"):
      burgerMenu.classList.remove("opened");
      burgerMenu.classList.add("closed");
      sideBar.classList.remove("hide");
      overlay.classList.add(`overlay`);

      setFavIcon();
      break;
    case burgerMenu.classList.contains("closed"):
      burgerMenu.classList.remove("closed");
      burgerMenu.classList.add("opened");
      sideBar.classList.add("hide");
      overlay.classList.remove(`overlay`);
      setFavIcon();
      break;
  }
};
