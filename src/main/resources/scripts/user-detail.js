Vue.component('user-detail', {
    props: ['user'],
    template: `
    <div class="row">
	<label for="name-to-edit">Name</label>
        <input type="text" class="form-control" id="name-to-edit" :value="user.name">
	<label for="mail-to-edit">Email</label>
	<input type="text" class="form-control" id="email-to-edit" :value="user.email">
	<label for="surname-to-edit">Surname</label>
	<input v-if="user.surname!=null" type="text" class="form-control" id="surname-to-edit" :value="user.surname">
	<input v-else type="text" class="form-control" id="surname-to-edit">
        <button @click="save" class="btn btn-primary">Save</button>
    </div>
    `,
    methods: {
        save: function () {
	    const name = $("#name-to-edit").val()
            const email = $("#email-to-edit").val()
	    const surname = $("#surname-to-edit").val()
	    $.ajax({
		    type: "PUT",
		    url: "/home/participants/" + this.user.id + "?name=" + name + "&email=" + email + "&surname=" + surname
	    });
        }
    }
})
