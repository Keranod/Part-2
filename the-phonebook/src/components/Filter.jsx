const Filter = (props) => {
  return (
    <form>
      <div>
        filter shown with:{" "}
        <input value={props.Search} onChange={props.onChangeHandler} />
      </div>
    </form>
  );
};

export default Filter;
