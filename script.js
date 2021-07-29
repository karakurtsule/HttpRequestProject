//PROMISE & HTTPREQUEST projesi: randomuser.me

var myObj = {
    url:'https://randomuser.me/api/?results=10',
    method:'GET'
}

let request = (obj) =>{
    return new Promise((resolve,reject)=>{
        var xhr = new XMLHttpRequest();
        xhr.open(obj.method || 'GET',obj.url,true);

        if(xhr.headers){ /* 'post' icin gerekli */
            Object.keys[obj.headers].forEach(key => {
                xhr.setRequestHeader(key,obj.headers[key]);
            });
        }

        xhr.onload = () => {
            if(xhr.status >=200 && xhr.status<300){
                resolve(xhr.responseText);
            }
            else{
                reject(xhr.statusText);
            }
        }

        xhr.onerror = () => {
            reject(xhr.statusText);
        }

        xhr.send();
    })
}


request(myObj).then(data => {
    var users = JSON.parse(data);
    
    users.results.forEach(user=>{
        
        var html = `
        <div>
            <div>
                <img src="${user.picture.large}" alt="">
                </div>
            <div>
                ${user.name.title}   
                ${user.name.first}    
                ${user.name.last}
            </div>
      </div>`

    document.querySelector('#user-control').innerHTML += html;
    })
    
}).catch(err => {
    console.log(err);
})