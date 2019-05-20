package jpa;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.UniqueConstraint;
import javax.persistence.Column;
import javax.persistence.Table;
import javax.persistence.JoinColumn;

@Entity
@org.hibernate.annotations.Entity(dynamicUpdate = true)
//@Table(name = "Participant", uniqueConstraints = {@UniqueConstraint(columnNames = "EMAIL")})
public class Participant implements java.io.Serializable {

  //@Column(name = "NAME", unique = false, nullable = true, length = 100)
  private String name;

  //@Column(name = "SURNAME", unique = false, nullable = true, length = 100)
  private String surname;


  @Id
  //@Column(name = "EMAIL", unique = true, nullable = false)
  private String email;

  @ManyToOne
  private Meeting meeting;

  public Participant(){

  }

  public Participant(String name, String surname, String email, Meeting meeting) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.meeting = meeting;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getName() {
    return name ;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getSurname() {
    return surname;
  }

  public void setSurname(String surname) {
    this.surname = surname;
  }



  //@ManyToOne
  public Meeting getMeeting() {
    return meeting;
  }

  public void setMeeting(Meeting meeting) {
    this.meeting = meeting;
  }

  @Override
  public String toString() {
    return "Participant [name=" + name + ", surname=" + surname + ", email=" + email + ", meeting=" + meeting .getName() + "]";
  }
}
