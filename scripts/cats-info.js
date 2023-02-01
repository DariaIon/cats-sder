 let btnInfo = document.querySelectorAll(".card-info");
 let popupCatInfo = document.querySelector(".popup_container");
 let closeCatInfo = document.querySelector(".popup_close-cat");
 let cards = document.querySelectorAll(".card");
 let parentCat = document.querySelector("#cat-info");
 let idCats = parentCat.querySelector(".id");
 let nameCats = parentCat.querySelector(".name");
 let rateCats = parentCat.querySelector(".rate");
 let ageCats = parentCat.querySelector(".age");
 let descriptionCats = parentCat.querySelector(".description");
 let imgCats = parentCat.querySelector(".img_link");
 let favouriteCats = parentCat.querySelector("#favourite");
 let likes = document.querySelector(".fa-heart");



 cards.forEach(function(btnInfo) {
  btnInfo.addEventListener("click", (e) => {
        e.preventDefault();
        if (!popupCatInfo.classList.contains("open")) {
            popupCatInfo.classList.add("open");
            popupCatInfo.parentElement.classList.add("open"); 
            api.getCats()
      .then((res) => res.json())
      .then((data1) => {
        if (data1.message === "ok") {
          let dataCats = data1.data;
          for (let i = 0; i < dataCats.length; i++) {
           e.target
           if (btnInfo.innerText === dataCats[i].name) {
            idCats.innerHTML = "ID: " + dataCats[i].id;
            nameCats.innerHTML = dataCats[i].name;
            rateCats.innerHTML = dataCats[i].rate;
            ageCats.innerHTML = dataCats[i].age;
            descriptionCats.innerHTML = dataCats[i].description;
            imgCats.style.backgroundImage = `url(${dataCats[i].img_link})`;
             if (dataCats[i].favourite === true) {
              likes.setAttribute("style", "color: red;")
             } else if (dataCats[i].favourite === false) {
              likes.setAttribute("style", "color: gray")
             }
           }
          }   
        }
      })
        }
    })
});  

 closeCatInfo.addEventListener("click", () => {
     popupCatInfo.classList.remove("open");
     popupCatInfo.parentElement.classList.remove("open");
 });

 



