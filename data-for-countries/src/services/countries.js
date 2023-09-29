import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";
const allCountriesUrl = `${baseUrl}api/all`;
const countryUrl = (commonName) => {
  return `${baseUrl}name/${commonName}`;
};

const getAll = () => {
  const request = axios.get(allCountriesUrl);
  return request.then((response) => response.data);
};

export default {
  getAll,
};
