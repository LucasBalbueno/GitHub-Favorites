// classe que vai conter a lógica dos dados (como os dados serão estruturados/armazenamento)
export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)

        this.tbody = this.root.querySelector('table tbody')

        this.load()
    }

    load() {
        this.entries = [
            {
            login:'lucasBalbueno',
            name:'Lucas Balbueno',
            public_repos: '356',
            followers: '45'
        },
        {
            login:'diego3g',
            name:'Diego Fernandes',
            public_repos: '233',
            followers: '124'
        }
    ]

    }
}


// classe que vai criar a visualização e eventos do HTML (criar o HTML com JS)
export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.update()
    }

    update() {
        this.removeAllTr()

        this.entries.forEach( user => {
        const row = this.createRow(user.login, user.name, user.public_repos, user.followers)

        this.tbody.append(row);
        })
    }

    createRow(login, name, public_repos, followers) {
        const tr = document.createElement('tr');

        tr.innerHTML = `
        <td class="user">
            <img src="https://github.com/${login}.png" alt="Imagem de ${name}">
            <a href="https://www.github.com/${login}" target="_blank">
                <p>${name}</p>
                <span>${login}</span>
            </a>
            <span></span>
        </td>
        <td class="repositories">${public_repos}</td>
        <td class="followers">${followers}</td>
        <td>
            <button class="remove">&times;</button>
        </td>
        `

        return tr
    }

    removeAllTr() {
        this.tbody.querySelectorAll('tr').forEach(tr => {
            console.log(tr.remove())
        })
    }
}