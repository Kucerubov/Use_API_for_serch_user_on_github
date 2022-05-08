
function requestSend(method, url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                console.log(xhr.response);
                resolve(xhr.response);
            }
        }
        xhr.onerror = () => {
            reject(xhr.response);
        }
        xhr.send();
    })
}


function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const processChange = debounce(() => {
    let userName = document.getElementById("searchName").value.trim();
    requestSend('GET',
        `https://api.github.com/users/${userName}`)
        .then(data => requestFolowersRepos(data))
        .catch(err => console.log(err))
});

function requestFolowersRepos(data){
    showNameUser(data);
    requestSend('GET', data.repos_url)
        .then(data => {
            showRepos(data)
            console.log(data)
        }).catch(err => console.error(err));
    requestSend('GET', data.followers_url)
        .then(data => {
            showFolowers(data)
            console.log(data)
        }).catch(err => console.error(err));
}




