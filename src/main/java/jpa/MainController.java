package jpa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jpa.Participant;
import jpa.ParticipantRepository;

import jpa.Meeting;
import jpa.MeetingRepository;

@Controller    // This means that this class is a Controller
@RequestMapping(path="/home")
public class MainController {

	@Autowired
	private ParticipantRepository participantRepository;

	@GetMapping(path="/add") // Map ONLY CREATE Requests
	public @ResponseBody String addNewParticipant (@RequestParam String name
			, @RequestParam String email) {
		// @ResponseBody means the returned String is the response, not a view name
		// @RequestParam means it is a parameter from the GET or POST request

		Participant p = new Participant();
		p.setName(name);
		p.setEmail(email);
		//ParticipantRepository.save(p);
		return "Saved";
	}

	@GetMapping(path="/all")
	public @ResponseBody Iterable<Participant> getAllParticipant() {
		// This returns a JSON or XML with the users
		return participantRepository.findAll();
	}
}
