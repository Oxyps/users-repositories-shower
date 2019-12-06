var listReposElement = document.querySelector('#repos')
var spanErrorElement = document.querySelector('#error')

function renderRepos(repos) {
    for(r of repos) {
        var liReposElement = document.createElement('li')
        var reposText = document.createTextNode(r.name)

        liReposElement.appendChild(reposText)
        listReposElement.appendChild(liReposElement)
    }
}

function renderError() {
    var errorText = document.createTextNode('User not found!')

    spanErrorElement.appendChild(errorText)
}

function callApi() {
    var inputElement = document.querySelector('#user')
    var user = inputElement.value

    axios.get('https://api.github.com/users/' + user + '/repos')
            .then(function(response) {
                listReposElement.innerHTML = ''
                spanErrorElement.innerHTML = ''
                renderRepos(response.data)
            })
            .catch(function() {
                listReposElement.innerHTML = ''
                renderError()
            })
}

var btnElement = document.querySelector('#search')

btnElement.onclick = callApi