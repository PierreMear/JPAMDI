Vue.component('meeting-detail', {
    props: ['meeting'],
    template: `
    <div class="row">
        <input type="text" class="form-control" id="name-to-edit" :value="user.name">
	<input type="text" class="form-control" id="email-to-edit" :value="user.email">
	<input v-if="user.surname!=null" type="text" class="form-control" id="surname-to-edit" :value="user.surname">
	<input v-else type="text" class="form-control" id="surname-to-edit">
        <button @click="save">Save</button>
    </div>
    `,
    methods: {
        remove: function () {
	    const name = $("#name-to-edit").val()
            const email = $("#email-to-edit").val()
	    const surname = $("#surname-to-edit").val()
	    $.ajax({
		    type: "PUT",
		    url: "/home/meetings/" + this.user.id + "?name=" + name + "&email=" + email + "&surname=" + surname
	    });
        }
    }
})
