import { useState, useEffect } from "react";
import axios from "axios";
import personsService from "./services/persons";

import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

//manually compares keys of objects (for now only names) and returns true or false
function comparePersonObjects(person1, person2) {
  if (person1.name !== person2.name) {
    return false;
  }

  return true;
}

//checks against array of person objects and returns true if person already exists in the array, otherwise false
function checkIfPersonExists(person1, persons) {
  const result = persons.find((person2) =>
    comparePersonObjects(person1, person2)
  );

  if (result === undefined) {
    return false;
  }

  return true;
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [succMessage, setNewSuccMessage] = useState(null);
  const [unsuccMessage, setNewUnsuccMessage] = useState(null);

  useEffect(() => {
    // console.log("effect");
    // axios.get("http://localhost:3001/persons").then((response) => {
    //   console.log("promise fulfilled");
    //   setPersons(response.data);

    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  //console.log("render", persons.length, "persons");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const personExists = checkIfPersonExists(personObject, persons);

    if (personExists === true) {
      //alert(`${newName} is already added to phonebook`);
      if (
        window.confirm(
          `${personObject.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const index = persons.findIndex(
          (person) => person.name === personObject.name
        );
        const id = persons[index].id;

        personObject.id = id;

        personsService
          .update(id, personObject)
          .then(() => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : personObject
              )
            );
          })
          .catch(() => {
            setNewUnsuccMessage(
              `Information of ${personObject.name} has already been removed from the server`
            );
            personsService.getAll().then((fetchPersons) => {
              setPersons(fetchPersons);
            });
            setTimeout(() => {
              setNewUnsuccMessage(null);
            }, 5000);
          });
      }
    } else {
      personsService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });

      //that key error id when adding was showing because I was calling set person twice
      //setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
      setNewSuccMessage(`Added ${personObject.name}`);
      setTimeout(() => {
        setNewSuccMessage(null);
      }, 5000);
    }
  };

  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setNewSearch(event.target.value);
  };

  const deletePersonOf = (id) => {
    //console.log(id);
    const index = persons.findIndex((person) => person.id === id);
    //const personToDelete = persons.find((p) => p.id === id);
    //console.log(personToDelete.name);

    if (window.confirm(`Delete ${persons[index].name} ?`)) {
      console.log(`found index to delete :${index}`);
      personsService.deletePerson(id).then(() => {
        const tempPersons = [...persons];
        tempPersons.splice(index, 1);
        setPersons(tempPersons);
        //console.log(persons);
      });
    }
  };

  const personsToShow =
    newSearch === ""
      ? persons
      : persons.filter((person) =>
          person.name
            .toLocaleLowerCase()
            .includes(newSearch.toLocaleLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={succMessage} style="succMessageStyle" />
      <Notification message={unsuccMessage} style="unsuccMessageStyle" />
      <Filter Search={newSearch} onChangeHandler={handleSearchChange} />
      <h2>add new</h2>
      <PersonForm
        submit={addPerson}
        name={newName}
        number={newNumber}
        onChangePersonHandler={handlePersonChange}
        onChangeNumberHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsArray={personsToShow} deletePersonOf={deletePersonOf} />
      <ul></ul>
    </div>
  );
};

export default App;
