function Section(title, id, children=document.createElement('div')){
    const section = document.createElement('section')
    Object.assign(section, {
        id, innerHTML: `<h2 class="text-center">${title}</h2>`,
    })
    section.appendChild(children)
    return section
}
export default Section;