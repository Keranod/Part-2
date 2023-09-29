import Languages from "./Languages";

const Country = ({ country }) => {
  const countryFlagUrl = country.flags.svg;
  //console.log(countryFlagUrl);
  //console.log(country.languages)
  return (
    <div>
      <h1>{country.name.common}</h1>
      capital {country.capital} <br />
      area {country.area} <br />
      <h4>languages:</h4>
      <ul>
        <Languages languages={country.languages} />
      </ul>
      <img src={countryFlagUrl} width="150" />
      <h3>Weather in {country.capital}</h3>
    </div>
  );
};

export default Country;
