export default function Header({ user, setUser }) {
  let image = "";
  if (!user) {
    image = "./assets/3135715.png";
  } else {
    image = "./assets/mansmiling.jpg";
  }
  function setLogin() {
    user ? setUser(false) : setUser(true);
  }

  return (
    <header className="header">
      <h1>Saidit</h1>
      <button onClick={setLogin}>
        <img src={image} />
      </button>
    </header>
  );
}
