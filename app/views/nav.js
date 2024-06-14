export const Nav = (links, title="SPA") =>
    `<nav class="navbar navbar-dark navbar-expand-lg | bg-dark bg-gradient sticky-top | p-2">
        <a href="#" class="navbar-brand">${title}</a>
        <button class="navbar-toggler border-0 | fa fa-bars fs-3"
            data-bs-target=".navbar-nav"
            data-bs-toggle="collapse">
        </button>
        <ul class="navbar-nav navbar-collapse collapse">
            ${Menu(links)}
        </ul>
    </nav>`
export const Menu = (links, List='') => {
    for(let l of links) List+=
        `<li><a href="${l}" class="nav-link">${l}</a></li>`
    return List;
}