export const create = ({tagName, ...props}) => {
    const tag = document.createElement(tagName)
    Object.assign(tag, props)
    return tag
}