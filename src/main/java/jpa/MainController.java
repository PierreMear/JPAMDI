package jpa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.Optional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import jpa.Participant;
import jpa.ParticipantRepository;

import jpa.Meeting;
import jpa.MeetingRepository;

@RestController    // This means that this class is a Controller
@RequestMapping(path="/home")
public class MainController {

	@GetMapping(path="/")
	public @ResponseBody String getHome() {
		// This returns a JSON or XML with the users
		return "Welcome !";
	}

	@Autowired
	private ParticipantRepository participantRepository;

	@PostMapping(path="/participants/add") // Map ONLY CREATE Requests
	public @ResponseBody String addNewParticipant (@RequestParam String name
			, @RequestParam String email) {
		// @ResponseBody means the returned String is the response, not a view name
		// @RequestParam means it is a parameter from the GET or POST request

		Participant p = new Participant();
		p.setName(name);
		p.setEmail(email);
		participantRepository.save(p);
		return "Saved";
	}

	@GetMapping(path="/participants")
	public @ResponseBody Iterable<Participant> getAllParticipant() {
		// This returns a JSON or XML with the users
		return participantRepository.findAll();
	}

	@DeleteMapping("/participants/{id}")
	public @ResponseBody String deleteParticipant(@PathVariable long id) {
		participantRepository.deleteById(id);
		return "Deleted";
	}

	@PutMapping("/participants/{id}")
	public @ResponseBody String updateParticipant(@PathVariable long id, @RequestParam(value="surname",required=false) String surname,
		@RequestParam(value="name",required=false) String name,@RequestParam(value="email",required=false) String email,@RequestParam(value="meeting",required=false) Long meeting) {

		Optional<Participant> participantOptional = participantRepository.findById(id);

		if (!participantOptional.isPresent())
			return "Participant not found";

		Participant p = participantRepository.findById(id).get();

		if(meeting != null){
			Optional<Meeting> meetingOptional = meetingRepository.findById(meeting);
			if(meetingOptional.isPresent())
				p.setMeeting(meetingRepository.findById(meeting).get());
		}

		if(surname != null)
			p.setSurname(surname);


		if(name != null)
			p.setName(name);


		if(email != null)
			p.setEmail(email);

			participantRepository.save(p);

		return "Updated";
	}

	@Autowired
	private MeetingRepository meetingRepository;

	@GetMapping(path="/meetings")
	public @ResponseBody Iterable<Meeting> getAllMeeting() {
		// This returns a JSON or XML with the users
		return meetingRepository.findAll();
	}

	@PostMapping(path="/meetings/add") // Map ONLY CREATE Requests
	public @ResponseBody String addNewMeeting (@RequestParam String name) {
		// @ResponseBody means the returned String is the response, not a view name
		// @RequestParam means it is a parameter from the GET or POST request

		Meeting m = new Meeting();
		m.setName(name);
		meetingRepository.save(m);
		return "Saved";
	}

	@DeleteMapping("/meetings/{id}")
	public void deleteMeeting(@PathVariable long id) {
		meetingRepository.deleteById(id);
	}

	@PutMapping("/meetings/{id}")
	public @ResponseBody String updateMeeting(@RequestBody Meeting meeting, @PathVariable long id) {

		Optional<Meeting> meetingOptional = meetingRepository.findById(id);

		if (!meetingOptional.isPresent())
			return "Meeting not found";

		meeting.setId(id);

		meetingRepository.save(meeting);

		return "Updated";
	}
}
