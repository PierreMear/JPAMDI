package jpa;

import org.springframework.data.repository.CrudRepository;
import jpa.Participant;

// This will be AUTO IMPLEMENTED by Spring into a Bean
// CRUD refers Create, Read, Update, Delete
public interface ParticipantRepository extends CrudRepository<Participant, Long> {

}
