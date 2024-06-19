import { jph } from "../declarations.js"
import { getData } from "../promise.js"

export const comments = async(id, List='') => {
    const commentList = await getData({url:`${jph}/comments?postId=${id}`})
    commentList.map(c => List+= comment(c))
    return List
}
const comment = ({id, postId, name, email, body}) => `
    <div id="comment_${postId}${id}" class="col-md-6 col-lg-4 list-group-item mx-auto border-bottom p-2">
        <h4 class="h5">${name}</h4>
        <p>${body}</p>
        <address>
            <a href="mailto:${email}">${email}</a>
        </address>
    </div>`