const Notification = ({ message, style }) => {
  if (message === null) {
    return null;
  }

  let messageStyle = null;
  if (style === "succMessageStyle") {
    messageStyle = {
      color: "green",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };
  } else if (style === "unsuccMessageStyle") {
    messageStyle = {
      color: "red",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };
  }

  return (
    <div style={messageStyle} className="notification">
      {message}
    </div>
  );
};

export default Notification;
