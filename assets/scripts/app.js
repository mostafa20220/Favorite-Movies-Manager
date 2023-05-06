// Add Movie Button

const backdropEl = document.getElementById("backdrop");
const addModalEl = document.querySelector("#add-modal");
const userInputs = document.querySelectorAll("input");

const addMovieBtnEl = document.querySelector("header > button");
addMovieBtnEl.addEventListener("click", AddMovieBtnHandler);

function AddMovieBtnHandler() {
  showMovieModal();
  resetMovieInputs();
}

function showMovieModal() {
  addModalEl.classList.add("visible");
  showBackdrop();
}

function hideMovieModal() {
  addModalEl.classList.remove("visible");
  hideBackdrop();
}

function resetMovieInputs() {
  // resetting the input values
  for (const iterator of userInputs) {
    iterator.value = "";
  }
}

function showBackdrop() {
  backdropEl.classList.add("visible");
}

function hideBackdrop() {
  backdropEl.classList.remove("visible");
}

/*************************************************************************/
// modal cancel button
// backdrop click

const cancelBtn = document.querySelector(".btn--passive");
cancelBtn.addEventListener("click", hideMovieModal);
backdropEl.addEventListener("click", hideMovieModal);

/*************************************************************************/
// modal add button

const entryTextEl = document.getElementById("entry-text");
const modalAddBtn = cancelBtn.nextElementSibling;
const movieListEl = entryTextEl.nextElementSibling;
const moviesList = [
  {
    title: "The Amazing Spider-Man",
    imageURL:
      "https://www.heyuguys.com/images/2012/04/The-Amazing-Spider-Man-poster.jpg",
    rating: 4.5,
  },
  {
    title: "The Amazing Spider-Man 2",
    imageURL:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.O0s-bCyp0flft32pQ0VCpwHaK-%26pid%3DApi&f=1&ipt=39a6f4b8c7b532d4b2f3f34657716a994f9c396fcb155cadcb9a3dbec375647f&ipo=images",
    rating: 3,
  },
  {
    title: "The Amazing Spider-Man 3",
    imageURL:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.PFCoS390chfXAv_BsIuq_QAAAA%26pid%3DApi&f=1&ipt=c22356c0f200ee693e6f9bfebdce274c5c6a5c8d07885e145084132786155d55&ipo=images",
    rating: 5,
  },
];

modalAddBtn.addEventListener("click", modalAddBtnHandler);

// render the default samples of movies
{
  for (const movie of moviesList) {
    renderNewMovieEl(movie.title, movie.imageURL, movie.rating);
  }
  toggleEntryText();
}

function modalAddBtnHandler() {
  if (validateUserInput()) {
    addNewMovie();
    hideMovieModal();
  }
}

function validateUserInput() {
  if (!userInputs[0].value.trim() || !userInputs[1].value.trim()) {
    alert("Error, You can't leave any field empty!");
    return false;
  }

  const regex =
    /^(?:https?:\/\/(?:[^/]+\.)+\S+\/\S+\.(?:jpg|jpeg|png|gif))|(?:https?:\/\/external-content\.duckduckgo\.com\/\S+)$/;

  if (!regex.test(userInputs[1].value.trim())) {
    alert("Error, Invalid image URL!");
    return false;
  }

  // check if the image is entered before.
  for (const movie of moviesList) {
    if (movie.imageURL === userInputs[1].value.trim()) {
      alert("Error, You have Entered this image URL before!");
      return false;
    }
  }

  if (
    isNaN(userInputs[2].value) ||
    +userInputs[2].value > 5 ||
    +userInputs[2].value < 1 ||
    !userInputs[2].value.trim()
  ) {
    alert('Enter a valid rating "[1-5] only"');
    return false;
  }

  return true;
}

// Add a new movie for both the internal movies list and the UI.
function addNewMovie() {
  let newMovie = {
    title: userInputs[0].value,
    imageURL: userInputs[1].value,
    rating: +userInputs[2].value,
  };
  moviesList.push(newMovie);

  resetMovieInputs();
  toggleEntryText();
  renderNewMovieEl(newMovie.title, newMovie.imageURL, newMovie.rating);
}

function toggleEntryText() {
  if (moviesList.length) entryTextEl.style.display = "none";
  else entryTextEl.style.display = "block";
}

// render the new added movie
function renderNewMovieEl(title, imgURL, rating) {
  const newMovieEl = document.createElement("li");
  newMovieEl.className = "movie-element";
  newMovieEl.innerHTML = `
  <div class='movie-element__image'>
  <img src='${imgURL}' alt='${title}'>
  </div>
  <div class='movie-element__info'>
  <h2>${title}</h2>
  <p>${rating}/5 stars</p>
  </div>
  `;

  movieListEl.append(newMovieEl);

  // handle the click on the new movie to delete it.
  newMovieEl.addEventListener("click", (event) => {
    chosenMovieEl = event.target.closest("li");
    showDeleteModal();
  });
}

/************************************************************************ */
// delete modal

let chosenMovieEl;
const deleteModalEl = document.getElementById("delete-modal");
const noBtnEl = deleteModalEl.querySelector("button");
const yesBtnEl = noBtnEl.nextElementSibling;
deleteModalEl.addEventListener("click", deleteHandler);
backdropEl.addEventListener("click", hideDeleteModal);

function deleteHandler(event) {
  if (event.target === yesBtnEl) {
    deleteChosenMovie();
    toggleEntryText();
    hideDeleteModal();
  } else if (event.target === backdropEl || event.target === noBtnEl)
    hideDeleteModal();
}

function showDeleteModal() {
  deleteModalEl.classList.add("visible");
  showBackdrop();
}

function hideDeleteModal() {
  deleteModalEl.classList.remove("visible");
  hideBackdrop();
}

function deleteChosenMovie() {
  for (let i = 0; i < moviesList.length; i++) {
    if (
      chosenMovieEl.lastElementChild.firstElementChild.textContent ===
      moviesList[i].title
    ) {
      moviesList.splice(i, 1);
      chosenMovieEl.remove();
      return;
    }
  }
}
