import Country from "./Country";

const Countries = (props) => {
  const amountOfCountries = props.countries.length;
  
  if (amountOfCountries > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (amountOfCountries > 1) {
    return props.countries.map((country) => (
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={() => props.showCountryHandler(country.name.common)}>
          show
        </button>
      </div>
    ));
  } else if (amountOfCountries === 1) {
    return <Country country={props.countries[0]} />;
  }
};

export default Countries;
