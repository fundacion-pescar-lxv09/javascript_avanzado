// Elementos del DOM
const d = document;
const checkers = d.querySelectorAll('img');
const cells = d.querySelectorAll('td');

// dataTransfer => objeto que captura al objeto arrastrado
const clickTransfer = {};
// dragStart => Arrastrar (elemento que vamos a mover)
const onDrag = (e) => {
    e?.dataTransfer?.setData('target', e.target.id)
    clickTransfer.target = e.target.id
}
// dragOver => Permitir (Me posiciono sobre el objetivo)
const onDragOver = (e) => {
    e.preventDefault()
}
// drop => Soltar (termina el evento de arrastrar)
const onDrop = (e) => {
    const id = e?.dataTransfer?.getData('target') ?? clickTransfer.target;
    const element = d.getElementById(id);
    element && e.target.appendChild(element)
    clickTransfer.target = null;
}

// Piezas
checkers.forEach(c => {
    Object.assign(c, { draggable: true })
    c.addEventListener('dragstart',onDrag)
    c.addEventListener('click',onDrag)
})
// Celdas
cells.forEach( c =>{
    c.addEventListener('dragover', onDragOver)
    c.addEventListener('drop', onDrop)
    c.addEventListener('click', onDragOver)
    c.addEventListener('click', onDrop)
})
