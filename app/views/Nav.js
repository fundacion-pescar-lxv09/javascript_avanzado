const simpleLinks = ["todo", "timer", "cardgame"]
const objectLinks = [
    {url: "#todo", text: "lista de tareas"},
    {url: "#timer", text: "cronometro"},
    {url: "#cardgame", text: "juego de cartas"}
]
const templateLink = ({url, text}) =>`<li><a class="nav-link" href="${url}">${text}</a></li>`
function Nav(){
    const nav = document.createElement('nav');
    Object.assign(nav, {
        id: 'navigation',
        className: 'navbar navbar-dark bg-dark navbar-expand-lg sticky-top p-2',
        innerHTML: `
            <a class="navbar-brand" href="#">Pescar</a>
            <button class="navbar-toggler navbar-toggler-icon border-0"
                data-bs-toggle="collapse"
                data-bs-target=".menu">
            </button>
            ${Links(objectLinks)}`,
    })
    return nav
}
function Links(array, list=''){
    list=`<ul class="navbar-nav navbar-collapse collapse menu">`
    array?.map(item => 
        list+= typeof item === "string" ? templateLink({url: "#"+item, text: item+"-app"}):templateLink(item))
    list+="</ul>"
    return list;
}
export default Nav;