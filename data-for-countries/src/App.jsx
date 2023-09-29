import { useState, useEffect } from "react";
import countriesService from "./services/countries";

import SearchForm from "./components/SearchForm";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [newSearch, setNewSearch] = useState("");
  const [showCountry, setShowCountry] = useState("");

  useEffect(() => {
    countriesService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  //console.log(countries);

  if (!countries) {
    return null;
  }

  const handleSearchChange = (event) => {
    //event.preventDefault();
    //console.log(event.target.value);
    setNewSearch(event.target.value);
    setShowCountry("");
  };

  const showCountryHandler = (countryName) => {
    //event.preventDefault();
    //console.log(index);
    //console.log(countryName)
    setShowCountry(countryName);
  };
  //console.log(showCountry);

  const countriesToShow =
    showCountry !== ""
      ? countries.filter((country) =>
          country.name.common
            .toLocaleLowerCase()
            .includes(showCountry.toLocaleLowerCase())
        )
      : newSearch === ""
      ? countries
      : countries.filter((country) =>
          country.name.common
            .toLocaleLowerCase()
            .includes(newSearch.toLocaleLowerCase())
        );

  return (
    <div>
      <SearchForm search={newSearch} onChangeHandler={handleSearchChange} />
      <Countries
        countries={countriesToShow}
        showCountryHandler={showCountryHandler}
        showCountry={showCountry}
      />
    </div>
  );
};

export default App;
