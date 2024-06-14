export const todos = ({id, title, completed}) => `
    <div id="todo_${id}" class="col-md-8 col-lg-6 col-xxl-4 d-flex justify-content-between align-items-center border-bottom p-2">
        <p class="h6">${title}</p>
        <button class="btn fa fa-${completed?'check-circle btn-outline-success':'times-circle btn-outline-danger'}"></button>
    </div>
`