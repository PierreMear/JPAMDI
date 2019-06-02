var application = null;

var users = []
var meetings = []

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
        showUserList()
    } else if (userRequestedRoute === '/meetings') {
        showMeetingList()
    } else if (userRequestedRoute.startsWith('/user-detail')) {
        const userId = parseInt(userRequestedRoute.substring('/todo-detail/'.length))
        let u = null
        for(var i; i < users.length; i++){
            if(users[i].id == userId){ u = users[i] }
        }
        if(u == null){
            app.innerHTML = "<notfound></notfound>"
        }else{
            app.innerHTML = "<user-detail :user="u"></user-detail>"
        }
    } else {
        app.innerHTML = "<notfound></notfound>"
    }
}

function showUserList(){
    $.ajax({
        type: "GET",
        url: "/home/participants",
        success: function(data){
            users = data
            app.innerHTML = "<users-list :list='userList'></users-list>"
            application = new Vue({ el: '#app', data: { userList: users, meetingList: meetings}})
        }
    });
}

function showMeetingList(){
    $.ajax({
        type: "GET",
        url: "/home/meetings",
        success: function(data){
            meetings = data
            app.innerHTML = "<meetings-list :list='meetingList'></meetings-list>"
            application = new Vue({ el: '#app', data: { userList: users, meetingList: meetings}})
        }
    });
    
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
