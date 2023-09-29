const Languages = ({ languages }) => {
  //console.log(props.languages)
  let languagesArray = [];
  for (const key of Object.keys(languages)) {
    const val = languages[key];
    //console.log(val)
    languagesArray = languagesArray.concat(val);
  }

  //console.log(languagesArray)

  return languagesArray.map((language) => <li key={language}>{language}</li>);
};

export default Languages;
