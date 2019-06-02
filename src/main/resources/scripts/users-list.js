Vue.component('users-list', {
    props: ['list'],
    template: `
    <section id="users" class="container">
		<div class="row">
			<h1>Users list :</h1>
		</div>
		<div class="row" id="users-list">
			<table class="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Surname</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					<user v-for="user in list" v-bind:user="user"></user>
				</tbody>
			</table>
		</div>
		<div class="row flex-column">
			<h2>Add a new user</h2>
			<form>
				<div class="form-group col-sm-6">
					<label for="user-to-add">Name</label>
					<input type="text" class="form-control" id="user-to-add" placeholder="User's name">
					<label for="email-to-add">Email</label>
					<input type="text" class="form-control" id="email-to-add" placeholder="User's email">
				</div>
				<button id="add-user-button" type="submit" class="btn btn-primary" @click="add">Add</button>
			</form>
		</div>
	</section>
    `,
    methods: {
        add: function () {
            const name = $("#user-to-add").val()
            const email = $("#email-to-add").val()
			$.ajax({
				type: "POST",
				url: "/home/participants/add?name=" + name + "&email=" + email,
				success: function(data){
				    showUserList()
				}
			});
        }
    }
})

Vue.component('user', {
    props: ['user'],
    template: `
    <tr>
        <td>{{user.name}}</td>
        <td>{{user.email}}</td>
        <td v-if="user.surname==null"></td>
        <td v-else>{{user.surname}}</td>
        <td><a :href="'#/users/'+user.id">Edit</a></td>
        <td><button class="btn btn-danger" @click="remove">Delete</button></td>
    </tr>
    `,
    methods: {
        remove: function () {
        	$.ajax({
			type: "DELETE",
			url: "/home/participants/" + this.user.id,
			success: () => showUserList()
		});
        }
    }
})
