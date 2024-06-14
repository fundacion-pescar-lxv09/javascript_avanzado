export const users = ({id, name, username, email, phone, address, website, company}) => `
<article id="user_${id}" class="card p-0 col-md-5 col-lg-5">
    <header class="card-header">
        <h2>${username}</h2>
        <p>${name}</p>
    </header>
    <div class="card-body">
        <h3 class="h5">Datos personales</h3>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${address.street}</li>
            <li class="list-group-item">${address.suite}</li>
            <li class="list-group-item">${address.city}</li>
        </ul>
        <h3 class="h5">Datos Laborales</h3>
        
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${company.name}</li>
            <li class="list-group-item">${company.catchPhrase}</li>
            <li class="list-group-item">${company.bs}</li>
        </ul>
    </div>
    <footer class="card-footer">
        <h3 class="h5">Contactame</h3>
        <address>
            Llamando al ${phone} <br>
            Enviando un correo a <a href="mailto:${email}">${email}</a> <br>
            visitando el sitio <a href="${website}" target="_blank">${website}</a>
        </address>
    </footer>
<article>
`