// Esperar a que se carguen todos los nodos del DOM
d.addEventListener('DOMContentLoaded', function() {

    // Trabajando con AJAX
    function ajax(url, data){
        const { method } = data;
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {
            console.log("cargado")
        })
        xhr.addEventListener('readystatechange', (e) => {
            if(e.target.readyState === 4 && e.target.status === 200){
                d.querySelector('main').innerHTML = e.target.response
            }
        })
        xhr.open(method, url);
        xhr.send()
    }

    ajax('/assets/content/AJAX.txt',{method: "GET"})
})