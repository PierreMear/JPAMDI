package jpa;

import org.springframework.data.repository.CrudRepository;

import jpa.Meeting;

// This will be AUTO IMPLEMENTED by Spring into a Bean
// CRUD refers Create, Read, Update, Delete
public interface MeetingRepository extends CrudRepository<Meeting, Integer> {

}
