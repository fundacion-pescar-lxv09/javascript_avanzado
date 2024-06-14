export const posts = async({id,userId,title,body, callback}) => {
    const comments = await callback(id);
    return(`
    <article id="post_${id}" class="card col-md-9 p-0">
        <h2 class="card-header text-bg-dark fs-3">${title}</h2>
        <p class="card-body">${body}</p>
        <footer class="card-footer">
            <p>Publicado por el usuario ${userId}</p>
            <section id="comments_${id}">
                <h3 class="fs-5">Comentarios</h3>
                ${ comments }
            </section>
        </footer>
    </article>
`)}