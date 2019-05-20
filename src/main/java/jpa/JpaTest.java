package jpa;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;
import javax.persistence.Persistence;
import java.util.ArrayList;
import java.util.List;

public class JpaTest {

	private EntityManager manager;

	public JpaTest(EntityManager manager){
		this.manager = manager;
	}

	private void createParticipants() {
		int numOfParticipants = manager .createQuery( "Select a From Participant a" ,
		Participant. class ).getResultList().size();
		if (numOfParticipants == 0) {
			Meeting meeting = new Meeting( "java" );
			manager.persist(meeting);
			manager.persist( new Participant("Gipsz", "Jakab", "jakab.gipsz@enterprise.com" ,meeting));
			manager.persist( new Participant("Nemo", "Captain", "captain.nemo@enterprise.com" ,meeting));
		}
	}

	private void listParticipants() {
		List<Participant> resultList = manager .createQuery( "Select a From Participant a" ,
		Participant. class ).getResultList();
		System. out .println( "num of participants:" + resultList.size());
		for (Participant next : resultList) {
			System. out .println( "next participant: " + next);
		}
	}

	public static void main(String[] args) {

		EntityManager manager = EntityManagerHelper.getEntityManager();
		JpaTest test = new JpaTest(manager);

		EntityTransaction tx = manager.getTransaction();
		tx.begin();


		try {
			test.createParticipants();
		} catch (Exception e) {
			e.printStackTrace();
		}
		tx.commit();

		test.listParticipants();

		manager.close();
		System.out.println("... done");

		EntityManagerHelper.closeEntityManagerFactory();
	}


}
