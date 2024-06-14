const ajax = ({method, url}) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', ({target:obj}) => {
        callback(obj.response)
    })
    xhr.addEventListener('progress', ({target:obj}) => {
        callback(obj.lengthComputable)
    })
    xhr.open(method, url);
    xhr.send();
}

export const getData = async ({url,params}) => {
    try{
        const response = await fetch(url,params);
        const data = await response.json();
        return data;
    }
    catch(e){
        console.error(e)
    }
}