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
        },
        {
            login:'maykbrito',
            name:'Mayk Brito',
            public_repos: '100',
            followers: '100'
        }
    ]

    }

    delete(user) {
        const filteredEntries = this.entries.filter((entry) => entry.login !== user.login)

        console.log(filteredEntries)
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

        row.querySelector('.remove').onclick = () => {
            const isOk = confirm(`Deseja remover ${user.name} dos favoritos?`)
            if(isOk) {
                this.delete(user)
            }
        }

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
            tr.remove()
        })
    }
}