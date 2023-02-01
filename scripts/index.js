
let main = document.querySelector("main");
const updCards = function(data) {
  main.innerHTML = "";
  data.forEach(function(cat) {
    if (cat.id) {
    let card = `<div class = "${cat.favourite ? "card like" : "card"}" style = "background-image: url(${cat.img_link || "images/cat.jpg"})">
    <button class = "card-info" type = "submit">${cat.name}<i class="fa-solid fa-arrow-up-right-from-square"></i></button>
      </div>`;
      main.innerHTML+=card;  
    }
  });

let cards = document.querySelectorAll(".card");
for (let i = 0, cnt = cards.length; i <cnt; i++) {
     const width = cards[i].offsetWidth;
      cards[i].style.height = width * 0.5 + "px";
    } 
};


let btnAdd = document.querySelector("#add");
let popup = document.querySelector("#popup-form");
let closePopup = document.querySelector(".popup-close");
btnAdd.addEventListener("click",(e) => {
    e.preventDefault();
    if(!popup.classList.contains("active")) {
        popup.classList.add("active");
        popup.parentElement.classList.add("active");
    }
});

closePopup.addEventListener("click", () => {
    popup.classList.remove("active");
    popup.parentElement.classList.remove("active");
});

const api = new Api("ionova-d"); 

let form = document.forms[0];
form.img_link.addEventListener("change", (e) => {
  form.firstElementChild.style.backgroundImage = `url(${e.target.value})`;
})
form.img_link.addEventListener("input", (e) => {
  form.firstElementChild.style.backgroundImage = `url(${e.target.value})`;
})
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let body = {};
  for (let i = 0; i < form.elements.length; i++) {
    let inp = form.elements[i];
    if (inp.type === "checkbox") {
      body[inp.name] = inp.checked;
    } else if (inp.name && inp.value) {
      if (inp.type === "number") {
        body[inp.name] = +inp.value;
      } else {
        body[inp.name] = inp.value;
      }
    }
  }
  console.log(body);
  api.addCat(body)
 .then(res => res.json())
 .then(data => {
  if (data.message === "ok") {
    form.reset();
    closePopup.click();
    api.getCat(body.id)
    .then(res => res.json())
    .then(cat => {
      if (cat.message === "ok") {
        catsData.push(cat.data);
        localStorage.setItem("cats", JSON.stringify(catsData));
        getCats(api, catsData);
      } else {
        console.log(cat);
      }
    })
  } else {
    console.log(data);
    api.getIds().then(res => res.json()).then(d => console.log(d));
  }
 })
});


let catsData = localStorage.getItem("cats");
 catsData = catsData ? JSON.parse(catsData) : [];

  const getCats = function(api, store) {
  if (!store.length) {
    api.getCats()
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.message === "ok") {
        localStorage.setItem("cats", JSON.stringify(data.data));
        catsData = [...data.data];
        updCards(data.data);
      }
    })
  } else {
    updCards(store);
  }
 };

 getCats(api, catsData);

 

