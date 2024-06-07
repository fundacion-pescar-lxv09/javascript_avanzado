/* Declaraciones */
const d = document;
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
function getItem(array, type, className="active"){
    let newItem;
    // Busqueda y eliminacion de clase
    for (let i = 0; i < array.length; i++){
        if (array[i].classList.contains(className)){
            toggle(array[i], className)
            // Definir el nuevo Elemento
            switch(type){
                case "NEXT":
                    newItem = array[i + 1] ?? array[0];
                break;
                case "PREV":
                    newItem = array[i - 1] ?? array[array.length - 1];
                break;
                default:
                    newItem = array[type];
            }
        }
    }
    toggle(newItem, className);
}
/* Eventos */
navButton.onclick = () => toggle(navMenu)
mapButton.onclick = () => toggle(mapFrame)

prev.addEventListener("click", () => {
    getItem(gallery,"PREV");
    getItem(controls, "PREV");
})
next.addEventListener("click", () => {
    getItem(gallery,"NEXT");
    getItem(controls, "NEXT");
})
controls.forEach((btn,i) => btn.addEventListener("click", () => {
    getItem(gallery, i);
    getItem(controls, i);
}))