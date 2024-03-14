import { userGithub } from './userGithub.js'

// classe que vai conter a lógica dos dados (como os dados serão estruturados/armazenamento)
class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites')) || []
        console.log(this.entries)
    }

    save() {
        localStorage.setItem('@github-favorites', JSON.stringify(this.entries))
    }

    async add(username) {
        try {
            const userExists = this.entries.find(entry => entry.login.toLowerCase() === username.toLowerCase());

            if (userExists) {
                throw new Error('Usuário já está nos favoritos!')
            }

            const user = await userGithub.search(username)

            if (user.login === undefined) {
                throw new Error('Usuário não encontrado!')
            }

            this.entries = [user, ...this.entries]
            this.update()
            this.save()

        }  catch (error) {
            alert(error.message)
        }
    }

    delete(user) {
        const filteredEntries = this.entries.filter((entry) => entry.login !== user.login)

        console.log(filteredEntries)
        this.entries = filteredEntries
        this.update()
        this.save()
    }
}

// classe que vai criar a visualização e eventos do HTML (criar o HTML com JS)
export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
        this.onadd()
    }

    onadd() {
        const addButton = this.root.querySelector('.search button')

        const handleEvent = () => {
            const { value } = this.root.querySelector('.search input')
            this.add(value)
        }

        addButton.addEventListener('click', handleEvent)
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