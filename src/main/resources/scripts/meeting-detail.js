Vue.component('meeting-detail', {
    props: ['meeting','users','meetingusersid'],
    template: `
    <div class="row">
	<label for="name-to-edit">Name</label>
        <input type="text" class="form-control" id="name-to-edit" :value="meeting.name">
	<label for="meal-to-edit">Meal</label>
	<input v-if="meeting.meal" type="checkbox" class="form-control" id="meal-to-edit" checked>
	<input v-else type="checkbox" class="form-control" id="meal-to-edit">
	<label for="startday-to-edit">Start day</label>
        <input v-if="meeting.start != null" type="date" class="form-control" id="startday-to-edit" :value="meeting.start.substring(0,10)">
	<input v-else type="date" class="form-control" id="startday-to-edit">
	<label for="endday-to-edit">End date</label>
        <input v-if="meeting.end != null" type="date" class="form-control" id="endday-to-edit" :value="meeting.end.substring(0,10)">
	<input v-else type="date" class="form-control" id="endday-to-edit">
	<label for="users-to-edit">Participating users</label>
	<select id="users-to-edit" class="form-control" multiple>
		<user-selection-entry v-for="user in users" :user="user" :usertoselect="meetingusersid"></user-selection-entry>
	</select>
        <button @click="save" class="btn btn-primary">Save</button>
    </div>
    `,
    methods: {
        save: function () {
	    const name = $("#name-to-edit").val()
            const meal = $("#meal-to-edit").is(":checked")
	    const start = $("#startday-to-edit").val()
	    const end = $("#endday-to-edit").val()
	    const participants = $("#users-to-edit").val()
	    console.log(participants)
	    for(var i = 0; i < this.users.length ; i++){
		const id = this.users[i].id
		const meetingID = (participants.includes(""+id) ? this.meeting.id : "0")
		$.ajax({
		    type: "PUT",
		    url: "/home/participants/" + id + "?meeting=" + meetingID
		});
	    }
	    $.ajax({
		    type: "PUT",
		    url: "/home/meetings/" + this.meeting.id + "?name=" + name + "&meal=" + meal + "&start=" + start + "&end=" + end
	    });
        }
    }
})

Vue.component('user-selection-entry', {
    props: ['user','usertoselect'],
    template: `
    <option v-if="usertoselect.includes(user.id)" :value="user.id" selected>{{user.name}}</option>
    <option v-else :value="user.id">{{user.name}}</option>
    `
})
