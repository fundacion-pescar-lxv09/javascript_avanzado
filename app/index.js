(function () {
/**
 * Almacenamiento   | Capacidad | Duracion                           |
 * -----------------|-----------|------------------------------------|
 * cookies          |       4KB | determinado por la cookie(expires) |
 * sessionStorage   |       5MB | mientras la ventana este abierta   |
 * localStorage     |    5-10MB | hasta limpiar la memoria cache     |
 */

    const d = document;
    const root = d.getElementById('root');
    const create = ({element = "button", props = {}}) => {
        const tag = d.createElement(element)
        Object.assign(tag,props);
        return tag
    }
// Cookies
    const setCookie = (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "; expires=" + date.toUTCString();
        d.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
    };
    const addCookie = create({ props: {
        innerText: "agregar cookie",
        onclick: () => {
            const userName = prompt("¿cual es tu nombre?")
            let cookieData = `username=${userName}`
            const userAge = prompt("¿cual es tu edad?")
            cookieData+= ` userAge=${userAge}`
            const expires = prompt("¿cuanto dias deberia retener esta informacion?")
            cookieData+= ` expires=${new Date().getTime()+(expires*24*60*60*1000)}`
            d.cookie = encodeURI(cookieData);
        }
    }})
    const getCookies = create({props: {
        innerText: "leer cookies",
        onclick: () => alert(document.cookie)
    }})
    const cookieParse = create({props: {
        innerText: "ver cookies",
        onclick: () => console.log(d.cookie.split(" ").map(cname => cname.split("="))) 
    }})

// session
    const addSession = create({ props: {
        innerText: "crear sesion",
        onclick: () => {
            const user = {}
            const userName = prompt("¿cual es tu nombre?")
            const userAge = prompt("¿cual es tu edad?")
            const userString = JSON.stringify(
                Object.assign(user,{ userName, userAge })
            )
            sessionStorage.setItem("user", userString)
        }
    }})
    const getSession = create({props: {
        innerText: "obtener sesion",
        onclick: () => console.log(sessionStorage.getItem("user"))
    }})
    const delSession = create({props: {
        innerText: "eliminar sesion",
        onclick: () => sessionStorage.removeItem("user") 
    }})

// almacen local
    const addStorage = create({ props: {
        innerText: "crear almacen",
        onclick: () => {
            const key = prompt("¿que deseas guardar?")
            const value = prompt("¿cual es el valor?")
            localStorage.setItem(key,value)
        }
    }})
    const getStorage = create({props: {
        innerText: "obtener datos",
        onclick: () => {
            const key = prompt("¿que deseas obtener?")
            console.log(localStorage.getItem(key))
        }
    }})
    const delStorage = create({props: {
        innerText: "eliminar datos",
        onclick: () => {
            const key = prompt("¿que deseas eliminar?")
            localStorage.removeItem(key) 
        }
    }})
// renderizado
    root.append(
        addCookie, getCookies, cookieParse, 
        create({element: "hr"}),
        addSession, getSession, delSession,
        create({element: "hr"}),
        addStorage, getStorage, delStorage
    )

})()