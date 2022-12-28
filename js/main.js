let elList = document.querySelector(".js-row");
let elInput = document.querySelector(".js-input");
let elSortName = document.querySelector(".sort-name");
let elSortYear = document.querySelector(".sort-year");
let elSortPage = document.querySelector(".sort-page");
let elSortLang = document.querySelector(".sort-lang");
let elBody = document.querySelector('body')

function bookFunc(array, node) {
  node.innerHTML = "";
  array.forEach((item) => {
    let elCard = document.createElement("div");
    elCard.setAttribute("class", "col-md-4 stretch-card grid-margin");
    elCard.innerHTML = `
        <div class="card bg-gradient-info card-img-holder text-white">
            <div class="card-body p-3 ">
                <img class="img-fluid card__img rounded-3" src="./images/${item.imageLink}" alt="">
                <h4 class="font-weight-bold mb-3 mt-3 d-flex justify-content-center">#${item.id}</h4>
                <div class=" align-items-center justify-content-between">
                    <h4 class="m-0"><span class="text1">Author:</span> ${item.author}</h4>
                    <h4 class="card-text mt-3"><span class="text1">Pages:</span> ${item.pages}</h4>
                </div>
                <h3 class="mt-3">Title: ${item.title}</h3>
                <div class="d-flex align-items-center justify-content-between mb-4">
                    <h4 class="m-0"><span class="text2">Language:</span> ${item.language}</h4>
                    <h4 class="card-text"><span class="text2">Year:</span> ${item.year}</h4>
                </div>
            </div>
        </div>
        `;
    node.appendChild(elCard);
  });
}

bookFunc(books, elList);

// Input search
let searchArray = [];
elInput.addEventListener("input", () => {
  searchArray = [];
  books.forEach((item) => {
    if (item.title.toLowerCase().includes(elInput.value.toLowerCase())) {
      searchArray.push(item);
    }
  });
  console.log(searchArray);
  bookFunc(searchArray, elList);
});


var sortArr = [];
elSortName.addEventListener("change", function () {
  sortArr = [];
  if (elSortName.value != "all") {
    books.forEach((item) => {
      if (elSortName.value == "a_z") {
        sortArr.push(item);
        sortArr.sort(
          (a, b) =>
            a.title.toLowerCase().charCodeAt(0) -
            b.title.toLowerCase().charCodeAt(0)
        );
      } else {
        sortArr.push(item);
        sortArr.sort(
          (a, b) =>
            b.title.toLowerCase().charCodeAt(0) -
            a.title.toLowerCase().charCodeAt(0)
        );
      }
    });
    bookFunc(sortArr, elList);
  } else {
    bookFunc(books, elList);
  }
});


// Sort year
let setYear = new Set();
books.forEach((item) => {
  setYear.add(item.year);
});

setYear.forEach((item) => {
  let newOption = document.createElement("option");
  newOption.setAttribute("value", `${item > 0 ? item : item * -1}`);
  newOption.textContent = item > 0 ? item : item * -1;
  elSortYear.appendChild(newOption);
});

// Change sort year
let yearArray = [];
elSortYear.addEventListener("change", () => {
  yearArray = [];
  if (elSortYear.value != "all") {
    books.forEach((item) => {
      if (item.year == elSortYear.value) {
        yearArray.push(item);
      }
    });
    bookFunc(yearArray, elList);
  } else {
    bookFunc(books, elList);
  }
});

// Sort page
let setPage = new Set();
books.forEach((item) => {
  setPage.add(item.pages);
});


// Change sort page
let pageArray = [];
elSortPage.addEventListener("change", () => {
  pageArray = [];
  if (elSortPage.value != "all") {
    books.forEach((item) => {
      if (elSortPage.value == '50_to_2500') {
        pageArray.push(item);
        pageArray.sort((a,b) => a.pages - b.pages)
      }else {
        pageArray.push(item);
        pageArray.sort((a,b) => b.pages - a.pages)
      }
    });
    bookFunc(pageArray, elList);
  } else {
    bookFunc(books, elList);
  }
});

let set = new Set();
books.forEach((item) => {
  set.add(item.language);
});

set.forEach((item) => {
  let newOption = document.createElement("option");
  newOption.setAttribute("value", `${item}`);
  newOption.textContent = item;
  elSortLang.appendChild(newOption);
});

// Change lang
let langArray = [];
elSortLang.addEventListener("change", () => {
  langArray = [];
  if (elSortLang.value != "all") {
    books.forEach((item) => {
      if (item.language.includes(elSortLang.value)) {
        console.log(item);
        langArray.push(item);
      }
    });
    bookFunc(langArray, elList);
  } else {
    bookFunc(books, elList);
  }
});

// DARK MODE
var elDarkBtn = document.querySelector(".dark__mode");
var elLightBtn = document.querySelector(".light__mode");

let theme = false;

elDarkBtn.addEventListener("click", function () {
  theme = true;

  let bg = "dark";
  window.localStorage.setItem("theme", bg);
  darkFunc();
});

function darkFunc() {
  if (window.localStorage.getItem("theme") == "dark") {
    elDarkBtn.classList.add("mode__active");
    elLightBtn.classList.remove("mode__active");
    elBody.classList.add('bodyDark')
    // alert('sa')
    
  }
}

darkFunc();

elLightBtn.addEventListener("click", function () {
  theme = false;

  let bg = "light";
  window.localStorage.setItem("theme", bg);
  lightFunc();
});

function lightFunc() {
  if (window.localStorage.getItem("theme") == "light") {
    document.body.style.backgroundColor = "#fff";
    elDarkBtn.classList.remove("mode__active");
    elLightBtn.classList.add("mode__active");
    
  }
}

lightFunc();
