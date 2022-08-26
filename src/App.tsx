import React, { useEffect, useState } from "react";

import harryPotterStudents from "./harryPotterStudents.json";

import Autocomplete from "./components/Autocomplete";

type HarryPotterStudent = {
  name: string;
};

const App = () => {
  const [harryPotterCharacters, setHarryPotterCharacters] = useState<
    Array<HarryPotterStudent>
  >([]);
  useEffect(() => {
    const fetchHarryPotterCharacters = async () => {
      try {
        const response = await fetch(
          "http://hp-api.herokuapp.com/api/characters/students"
        );

        const data = await response.json();

        setHarryPotterCharacters(
          data.map((ch: HarryPotterStudent) => ({ name: ch.name }))
        );
      } catch (e) {
        setHarryPotterCharacters(
          harryPotterStudents.map((students: HarryPotterStudent) => ({
            name: students.name,
          }))
        );
      }
    };

    fetchHarryPotterCharacters();
  }, []);
  return (
    <>
      <h1>Select your favorite Harry Potter student:</h1>
      <Autocomplete
        items={harryPotterCharacters}
        getItemValue={(character) => character.name}
        noMatchesLabel="Sadly we haven't found students with that name :'("
      />
    </>
  );
};

export default App;
