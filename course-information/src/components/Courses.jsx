const Header = (props) => {
  console.log(props);
  const { course } = props;
  return <h2>{course.name}</h2>;
};

const Content = (props) => {
  console.log(props);

  const { parts } = props;
  const total = parts.reduce((acc, part) => {
    return acc + part.exercises;
  }, 0);

  return (
    <div>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <p>
        <b>total of {total} exercises</b>
      </p>
    </div>
  );
};

const Course = (props) => {
  console.log(props);
  const { course } = props;
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
    </div>
  );
};

const Courses = (props) => {
  console.log(props);
  const { courses } = props;
  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default Courses;
