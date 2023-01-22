let main = document.querySelector("main");
  cats.forEach(function(cat) {
      let card = `<div class = "${cat.favourite ? "card like" : "card"}" style = "background-image: url(${cat.img_link})">
      <span>${cat.name}</span>
      </div>`;
      main.innerHTML += card;
    });
  
let cards = document.querySelectorAll(".card");
for (let i = 0, cnt = cards.length; i <cnt; i++) {
     const width = cards[i].offsetWidth;
      cards[i].style.height = width * 0.5 + "px";
    }
  

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
})

const api = new Api("ionovadasha"); 

let form = document.querySelector("form");
form.img_link.addEventListener("change", (e) => {
  form.firstElementChild.style.backgroundImage = `url(${e.target.value})`;
});
form.img_link.addEventListener("input", (e) => {
  form.firstElementChild.style.backgroundImage = `url(${e.target.value})`;
});
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
  api
    .addCat(body)
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "ok") {
        form.reset();
        closePopup.click();
      } else {
        console.log(data);
      }
    });
});


const updCards = function(data) {
  data.forEach(function(cat) {
    if (cat.id) {
      let card = `<div class = "${cat.favourite ? "card like" : "card"}" style = "background-image: url(${cat.img_link || "images/cat.jpg"})">
      <span>${cat.name}</span>
      </div>`;
      main.innerHTML += card;
    }
  })
}

const getCats = function(api) {
  api.getCats()
  .then(res => res.json())
  .then(data => {
    if (data.message === "ok") {
      updCards(data.data);
    }
  })
}

 getCats(api);

