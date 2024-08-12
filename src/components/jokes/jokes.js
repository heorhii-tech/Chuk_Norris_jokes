const allJokeWrapper = document.getElementById("jokesWrapper");
import commentIconTamplate from "../../assets/comments.png";
import commentIconSideBarTamplate from "../../assets/commentIconSideBar.png";
import unlikedIconTamplate from "../../assets/unliked.png";
import likedIconTamplate from "../../assets/liked.png";
const favJokesWrap = document.getElementById("favJokesWrap");

export const showJoke = (joke) => {
  const jokeDiv = document.createElement(`div`);

  const commentIconSideBar = document.createElement(`img`);
  commentIconSideBar.innerHTML = `src=${commentIconSideBarTamplate}`;

  jokeDiv.id = joke.id;
  jokeDiv.className = `joke`;
  const jokeUpdated = joke[`updated_at`];

  joke.categories.length
    ? (jokeDiv.innerHTML = `
  <img class="comment_icon" src=${commentIconTamplate} />
  <div>
   <a href="#">ID: ${joke.id}</a>
   <p>${joke.value}</p>
   <h4>Last updated: ${jokeUpdated}</h4>
  <h3>${joke.categories}</h3>
  </div>
  
  `)
    : (jokeDiv.innerHTML = `
    <img class="comment_icon" src=${commentIconTamplate} />
    <div>
     <a href="#">ID: ${joke.id}</a>
     <p>${joke.value}</p>
     <h4>Last updated: ${jokeUpdated}</h4>
    </div>`);

  let favBtn = document.createElement("img");
  favBtn.className = "like_btn";
  favBtn.src = unlikedIconTamplate;

  let storageJokes = localStorage.getItem(`jokes`);
  storageJokes = storageJokes ? JSON.parse(storageJokes) : [];

  let jokeExistInStorage = storageJokes.findIndex(
    (item) => item.id === joke.id
  );

  if (!joke.favorite && jokeExistInStorage >= 0) {
    jokeDiv.prepend(favBtn);
    favBtn.src = likedIconTamplate;
    favBtn.value = "remove";
    allJokeWrapper.append(jokeDiv);
  } else if (!joke.favorite) {
    favBtn.value = `add`;
    favBtn.src = unlikedIconTamplate;
    allJokeWrapper.prepend(jokeDiv);
    jokeDiv.prepend(favBtn);
  } else {
    favBtn.value = `remove`;
    favBtn.src = likedIconTamplate;
    jokeDiv.prepend(favBtn);
    jokeDiv.querySelector(`.comment_icon`).src = commentIconSideBarTamplate;

    favJokesWrap.prepend(jokeDiv);
  }

  attachFavButtonHandler(joke, favBtn);
};

const attachFavButtonHandler = (joke, favBtn) => {
  favBtn.onclick = () => {
    let storageJokes = localStorage.getItem("jokes");
    storageJokes = storageJokes ? JSON.parse(storageJokes) : [];
    let jokeExistInStorage = storageJokes.findIndex(
      (item) => item.id === joke.id
    );

    if (favBtn.value === `add`) {
      favBtn.src = likedIconTamplate;
      joke.favorite = true;
      storageJokes.push(joke);
      favBtn.value = `remove`;

      showJoke(joke);
    } else if (favBtn.value === `remove`) {
      sideBar.querySelector(`.joke[id="${joke.id}"]`).remove();
      storageJokes.splice(jokeExistInStorage, 1);
      let jokeFromAllJokeWrapper = allJokeWrapper.querySelector(
        `.joke[id="${joke.id}"]`
      );
      if (jokeFromAllJokeWrapper) {
        let jokeFromAllJokeWrapperBtn =
          jokeFromAllJokeWrapper.querySelector(`.like_btn`);
        jokeFromAllJokeWrapperBtn.value = `add`;
        jokeFromAllJokeWrapperBtn.src = unlikedIconTamplate;
      }
    }

    localStorage.setItem(`jokes`, JSON.stringify(storageJokes));
  };
};

(() => {
  let storageJokes = localStorage.getItem("jokes");
  storageJokes = storageJokes ? JSON.parse(storageJokes) : [];
  storageJokes.forEach((item) => {
    showJoke(item);
  });
})();
