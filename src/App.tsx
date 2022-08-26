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
      <Autocomplete
        items={harryPotterCharacters}
        getItemValue={(character) => character.name}
      />
      <Autocomplete />
    </>
  );
};

export default App;
