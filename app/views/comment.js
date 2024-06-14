import { d, jph } from "../declarations.js"
import { getData } from "../promise.js"

export const comments = async(id, List='') => {
    const commentList = await getData({url:`${jph}/comments?postId=${id}`})
    commentList.map(c => List+= comment(c))
    return List
}
const comment = ({id, postId, name, email, body}) => `
    <div id="comment_${postId}${id}" class="col-md-6 col-lg-4 list-group-item mx-auto">
        <h4>${name}</h4>
        <p>${body}</p>
        <address>
            <a href="mailto:${email}">${email}</a>
        </address>
    </div>`