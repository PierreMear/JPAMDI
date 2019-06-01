Vue.component('meetings-list', {
    props: ['list'],
    template: `
    <section id="meetings" class="container">
		<div class="row">
			<h1>Meetings list :</h1>
		</div>
		<div class="row" id="meetings-list">
			<table class="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Start date</th>
						<th>End date</th>
						<th>Meal</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					<meeting v-for="meeting in list" v-bind:meeting="meeting"></meeting>
				</tbody>
			</table>
		</div>
		<div class="row flex-column">
			<h2>Add a new meeting</h2>
			<form>
				<div class="form-group col-sm-6">
					<label for="meeting-to-add">Name</label>
					<input type="text" class="form-control" id="meeting-to-add" placeholder="meeting's name">
				</div>
				<button id="add-meeting-button" type="submit" class="btn btn-primary" @click="add">Add</button>
			</form>
		</div>
	</section>
    `,
    methods: {
        add: function () {
            const name = $("#meeting-to-add").val()
            $.ajax({
				type: "POST",
				url: serverAddress + "/home/meeting/add?name=" + name,
				success: (data) => meetings.push(JSON.parse(data))
			});
        }
    }
})

Vue.component('meeting', {
    // The todo-item component now accepts a
    // "prop", which is like a custom attribute.
    // This prop is called todo.
    props: ['meeting'],
    template: `
    <tr>
        <td>{{meeting.name}}</td>
        <td v-if="meeting.start==null"></td>
        <td>{{meeting.start}}</td>
        <td v-if="meeting.end==null"></td>
        <td>{{meeting.end}}</td>
        <td v-if="meeting.meal==null"></td>
        <td v-else>{{meeting.meal}}</td>
        <td><a href="#/meetings/{{meeting.id}}">Edit</a></td>
        <td><button class="btn btn-danger" @click="remove">Delete</button></td>
    </tr>
    `,
    methods: {
        remove: function () {
        	const index = meetings.indexOf(this.meeting)
        	$.ajax({
				type: "DELETE",
				url: serverAddress + "/home/participants/" + meetings[index].id,
				success: () => meetings.splice(index, 1)
			});
        }
    }
})