package jpa;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Calendar;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.OneToMany;
import javax.persistence.UniqueConstraint;

@Entity
@org.hibernate.annotations.Entity(dynamicUpdate = true)
//@Table(name = "Meeting", uniqueConstraints = {@UniqueConstraint(columnNames = "ID")})
public class Meeting implements java.io.Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  //@Column(name = "ID", unique = true, nullable = false)
  private Long id;

  //@Column(name = "NAME", unique = false, nullable = true, length = 100)
  private String name;

  //@Column(name = "MEAL", unique = false, nullable = true, length = 100)
  private Boolean meal;

  //@OneToMany(targetEntity=Participant.class, mappedBy="Meeting", fetch = FetchType.EAGER)
  @OneToMany(targetEntity=Participant.class, mappedBy="meeting", fetch = FetchType.EAGER)
  private List<Participant> participants = new ArrayList<Participant>();

  @Temporal(TemporalType.DATE)
  private Calendar start;

  @Temporal(TemporalType.DATE)
  private Calendar end;

  public Meeting(){

  }

  public Meeting(String name){
    this.name = name;
  }

  public Meeting(String name, Boolean meal, Calendar start, Calendar end) {
    this.name = name;
    this.meal = meal;
    this.start = start;
    this.end = end;
  }


  public Long getId() {
    return id ;
  }

  public void setId(Long id) {
    this . id = id;
  }

  public String getName() {
    return name ;
  }

  public void setName(String name) {
    this . name = name;
  }

  public Boolean getMeal(){
    return meal;
  }

  public void setMeal(Boolean meal){
    this.meal = meal;
  }

  public Calendar getStart(){
    return start;
  }

  public void setStart(Calendar start){
    this.start = start;
  }

  public Calendar getEnd(){
    return end;
  }

  public void setEnd(Calendar end){
    this.end = end;
  }

  @Override
  public String toString() {
    return "Meeting [name=" + name + /*", debut=" + start + ", end=" + end +*/ ", meeting=" + this.getName() + "]";
  }


  public List<Participant> getParticipants() {
    return participants ;
  }

  public void setParticipants(List<Participant> participants) {
    this.participants = participants;
  }
}
