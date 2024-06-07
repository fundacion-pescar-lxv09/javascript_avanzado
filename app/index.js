/* Declaraciones */
const d = document;
const className = "active";
const navButton = d.querySelector("nav .nav__button");
const navMenu = d.querySelector("nav ul");

const mapButton = d.querySelector("footer .map__button");
const mapFrame = d.querySelector("iframe.map");

const gallery = d.querySelectorAll(".gallery-item");
const prev = d.querySelector(".gallery .icon-prev");
const next = d.querySelector(".gallery .icon-next");
const controls = d.querySelectorAll(".gallery-controls button");

/* Funciones */
function toggle(element, className="active"){
    element.classList.toggle(className);
}
function getItem(array, className="active"){
    for (let item of array){ 
        if (item.classList.contains(className)){
            toggle(item, className);
            return item
}}}
function setItem(array, type){
    const item = getItem(array);
    const newItem = (
        type === "NEXT" ?
        (item.nextElementSibling || item.parentNode.firstElementChild) :
        type === "PREV" ?
        (item.previousElementSibling || item.parentNode.lastElementChild) :
        array[type]
    )
    newItem.classList.toggle(className);
}
/* Eventos */
navButton.onclick = () => toggle(navMenu)
mapButton.onclick = () => toggle(mapFrame)

prev.addEventListener("click", () => {
    setItem(gallery,"PREV");
    setItem(controls, "PREV");
})
next.addEventListener("click", () => {
    setItem(gallery,"NEXT");
    setItem(controls, "NEXT");
})
controls.forEach((btn,i) => btn.addEventListener("click", () => {
    setItem(gallery, i);
    setItem(controls, i);
}))