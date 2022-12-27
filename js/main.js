let elList = document.querySelector(".js-row");
let elInput = document.querySelector(".js-input");
let elSortName = document.querySelector(".sort-name");
let elSortYear = document.querySelector(".sort-year");
let elSortPage = document.querySelector(".sort-page");
let elSortLang = document.querySelector(".sort-lang");

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

// Sort name
books.forEach((item) => {
  let newOption = document.createElement("option");
  newOption.setAttribute("value", `${item.title}`);
  newOption.textContent = item.title;
  elSortName.appendChild(newOption);
});

// Change sort
let nameArray = [];
elSortName.addEventListener("change", () => {
  nameArray = [];
  if (elSortName.value != "all") {
    books.forEach((item) => {
      if (item.title.includes(elSortName.value)) {
        nameArray.push(item);
      }
    });
    bookFunc(nameArray, elList);
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

setPage.forEach((item) => {
  let newOption = document.createElement("option");
  newOption.setAttribute("value", `${item}`);
  newOption.textContent = item;
  elSortPage.appendChild(newOption);
});

// Change sort page
let pageArray = [];
elSortPage.addEventListener("change", () => {
  pageArray = [];
  if (elSortPage.value != "all") {
    books.forEach((item) => {
      if (item.pages == elSortPage.value) {
        pageArray.push(item);
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
