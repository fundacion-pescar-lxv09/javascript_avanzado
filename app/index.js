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

const forms = d.querySelectorAll('form');

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
// Formularios y expresiones regulares
forms.forEach(form => {
    form.addEventListener('submit', (event) => event.preventDefault())
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(field => field.addEventListener('input', (e) => {
        checkContent(field) ? 
        field.classList.add('valid') : 
        field.classList.remove('valid')
    }))
})

function checkContent(element){
    let regExp; // expresion regular
    switch(element.type){
        case "text":
            regExp = /(\D{3,50})|([A-Z a-z]{3,50})/
        break;
        case "tel":
            regExp = /\d{6,20}|^\(\d{2,5}\)(\-*\d{2,4}){2,4}$/
        break;
        case "email":
            regExp = /^(\S{2,}@\S{2,}.(\w{2,3}){1,2})$/
        break;
        case "password":
            regExp = /^\S{8,}$/
        break;
        default: 
            regExp = /(\w\d\s)+/
    }
    return regExp.test(element.value)
    /*  Identificadores de Caracteres
        \w solamente letras
        \d solamente digitos
        \s solamente espacios (tabulaciones y saltos de linea)

        \W todo menos letras
        \D todo menos digitos
        \S todo menos espacio

        Cuantificadores
        * uno, varios o ninguno
        + por lo menos una vez
        ? una o ninguna vez
        {n} exactamente n caracteres
        {n,} por lo menos n veces
        {n,m} entre n y m veces

        Posicionamiento
        ^ empieza con (al inicio de la expresion)
        $ termina con (al final de la expresion)
        \b al principio o al final de un espacio
    */
}