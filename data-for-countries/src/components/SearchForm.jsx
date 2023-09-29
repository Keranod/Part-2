const SearchForm = (props) => {
  return (
    <form>
      <div>
        find countries
        <input value={props.search} onChange={props.onChangeHandler} />
      </div>
    </form>
  );
};

export default SearchForm;
