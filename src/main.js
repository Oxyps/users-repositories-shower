import api from './api'

class App {
    constructor() {
        this.repositories= [];

        this.formElement = document.getElementById('user-form');
        this.inputElement = document.querySelector('input[name=username]');
        this.listElement = document.getElementById('repos-list');

        this.registerHandlers();
    }

    registerHandlers() {
        this.formElement.onsubmit = event => this.addRepos(event);
    }
    
    setLoading(loading=true) {
        if(loading) {
            let loadingElement = document.createElement('span');
            loadingElement.appendChild(document.createTextNode('loading..'));
            loadingElement.setAttribute('id', 'loading')
            
            this.formElement.appendChild(loadingElement);
        } else {
            document.getElementById('loading').remove();
        }

    }

    async addRepos(event) {
        event.preventDefault();

        const username = this.inputElement.value;

        if(username.length === 0)
            return;
        
        this.setLoading();
        try {
            const response = await api.get(`/users/${username}/repos`);

            response.data.forEach(repos => {
                const { name, description, html_url, owner: { avatar_url } } = repos;

                this.repositories.push({
                    name,
                    description,
                    avatar_url,
                    html_url,
                });
            });

            this.inputElement.value = '';
            this.render();
        } catch(error) {
            alert('User does not exist!');
        }
        this.setLoading(false);
    }
    
    render() {
        this.listElement.innerHTML = '';

        this.repositories.forEach(repos => {
            let imgElement = document.createElement('img');
            imgElement.setAttribute('src', repos.avatar_url);

            let titleElement = document.createElement('strong');
            titleElement.appendChild(document.createTextNode(repos.name));

            let descriptionElement = document.createElement('p');
            descriptionElement.appendChild(document.createTextNode(repos.description));

            let linkElement = document.createElement('a');
            linkElement.setAttribute('href', repos.html_url);
            linkElement.setAttribute('target', '_blank');
            linkElement.appendChild(document.createTextNode('Acessar'))
        
            let listItemElement = document.createElement('li');
            listItemElement.appendChild(imgElement);
            listItemElement.appendChild(titleElement);
            listItemElement.appendChild(descriptionElement);
            listItemElement.appendChild(linkElement);
            
            this.listElement.appendChild(listItemElement);
        });
    }
}

new App()