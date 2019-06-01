var application = null;
const serverAddress = "http://192.168.0.45:9002"

const users = []
const meetings = []

function router() {
    if ('content' in document.createElement('template')) {
        routeUser()
    } else {
        alert('ERROR: this website is not compatible with your browser. Please download a modern one.')
    }
}

function routeUser() {
    const userRequestedRoute = window.location.hash.startsWith('#')
    ? window.location.hash.substring(1)
    : window.location.hash

    const app = document.getElementById('app')

    if (userRequestedRoute === '' || userRequestedRoute === '/home') {
        app.innerHTML = ""//<todo-list :list='list'></todo-list>"
    } else if (userRequestedRoute === '/users') {
        $.ajax({
            type: "GET",
            url: serverAddress + "/home/participants",
            success: (data) => users.push(JSON.parse(data))
        });
        app.innerHTML = "<users-list :list='userList'></users-list>"
    } else if (userRequestedRoute === '/meetings') {
        $.ajax({
            type: "GET",
            url: serverAddress + "/home/meetings",
            success: (data) => users.push(JSON.parse(data))
        });
        app.innerHTML = "<meetings-list :list='meetingList'></meetings-list>"
    } else if (userRequestedRoute.startsWith('/todo-detail')) {
        const todoId = userRequestedRoute.substring('/todo-detail/'.length)
        app.innerHTML = "<detail></detail>"
    } else {
        app.innerHTML = "<notfound></notfound>"
    }
    application = new Vue({
      el: '#app',
      data: {
        userList: users,
        meetingList: meetings
      }
    })
}

window.onload = () => router()
window.onpopstate = () => router()

Vue.component('notfound', {
    template: `
    <p>404 - page not found</p>
    `,
    methods: {
        remove: function () {
            todos.splice(todos.indexOf(this.todo), 1)
        }
    }
})

Vue.component('infos', {
    template: `
    <section id="info" class="container">
        <div class="row">
            <h1>Info</h1>
        </div>
        <div class="row flex-column">
            <p>Vous êtes sur la page info de ce site.</p>
            <p>Elle pourrait contenir plein d'informations sur ce qu'est une todo list, ou sur ce TP...</p>
        </div>
    </section>
    `
})

Vue.component('detail', {
    template: `
    <section id="todo-detail" class="container">
        <div class="row">
            <h1>Détail d'une tâche</h1>
        </div>
        <div class="row flex-column">
            <div class="col-sm-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title"><span data-target='task-title'>Titre de la tâche</span></h5>
                        <h6 class="card-subtitle mb-2 text-muted">Créée par <span data-target='task-created-by'>USER</span> le <span data-target='task-created-on'>01/01/1970</span></h6>
                        <p class="card-text"><span data-target='task-description'>Description</span></p>
                        <button class="btn btn-success todo-done-button">Terminate</button>
                        <button class="btn btn-danger todo-not-done-button">Remark as todo</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `
})
