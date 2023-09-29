import Person from "./Person";

const Persons = (props) => {
  //console.log(props.deletePersonOf);
  //console.log(props.personsArray)
  return props.personsArray.map((person) => (
    <Person
      key={person.id}
      person={person}
      deletePerson={() => props.deletePersonOf(person.id)}
    />
  ));
};

export default Persons;
