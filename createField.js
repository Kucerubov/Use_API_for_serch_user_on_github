const fieldName = document.querySelector(".output_name");
const followers = document.querySelector(".followers");
const repos = document.querySelector(".repos");

function showFolowers(data){
    deleteElement(followers);
   data.forEach((e) => {
       create(e, followers);
   })
}

function showRepos(data){
    deleteElement(repos);
    data.forEach((e) => {
        create(e, repos);
    })
}

function showNameUser(data){
    fieldName.innerHTML = data.login;
    fieldName.setAttribute('href', data.html_url);
    fieldName.setAttribute('target', "_blank");
}

function create(data, parentElement){
    const element = document.createElement('a');
    element.setAttribute('target', "_blank");
    element.setAttribute('href', data.html_url);
    if(data.login !== undefined){
        element.innerHTML =  data.login;
    }else element.innerHTML =  data.name;
    parentElement.appendChild(element);
}

function deleteElement(parentElement){
    let nodeList = parentElement.querySelectorAll('*');
    nodeList.forEach(e => {
        if (e.tagName !== 'H3'){
            e.remove();
        }
    });
}