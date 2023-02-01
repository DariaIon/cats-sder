let appendBtn = document.querySelector("#append");
let authorForm =document.querySelector("#author-form");
let closeAuthorForm = document.querySelector(".author_form-close");
appendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!authorForm.classList.contains("active")) {
        authorForm.classList.add("active");
        authorForm.parentElement.classList.add("active"); 
}
});
closeAuthorForm.addEventListener("click", () => {
authorForm.classList.remove("active");
authorForm.parentElement.classList.remove("active");
})



let formAuthorButton = document.querySelector(".form_author_button");
let inputName = document.querySelector('[name ="name_author"]');

formAuthorButton.addEventListener("click", (e) => {
    e.preventDefault(); 
    if (typeof(inputName.value) === "string") {
        document.cookie = `user=${inputName.value}`;
        inputName.value = "Авторизация успешна";
        setTimeout(closeAuthor, 1000);
    } else  {
        inputName.value = "Вы не авторизировались";
    }
});
function closeAuthor () {
        authorForm.classList.remove("active");
        authorForm.parentElement.classList.remove("active");
        };  

