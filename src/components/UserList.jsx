import { useEffect, useState } from "react";
import UserCards from "./UserCards";

function UserList() {
  const [users, setUsers] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedID, setSelectedID] = useState(null);

  // function handleSelectedUser(id) {
  //   id === selectedID ? setSelectedID(null) : setSelectedID(id);
  // }

  useEffect(function () {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(`https://randomuser.me/api/?results=20`);

        if (!res.ok) throw new Error("Opps ! something went wrong");

        const data = await res.json();
        console.log(data);

        if (data.Response === "False")
          throw new Error("Opps ! users not found");

        setUsers(data.results);
        setUsersList(data.results);
        let nationalities = new Map();
        data.results.forEach((u) => {
          nationalities.set(u.nat, u.nat);
        });
        console.log(nationalities);
        setNationalities(Array.from(nationalities.keys()));
      } catch (err) {
        // console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const setNationality = (nationality) => {
    console.log(nationality);
    setUsersList(
      nationality ? users.filter((u) => u.nat === nationality) : users
    );
  };

  return (
    <Main>
      <Search setNationality={setNationality} nationalities={nationalities} />
      {isLoading && <Loader />}
      {!isLoading && !error && <UserCards users={usersList} />}
      {error && <ErrorMessage message={error} />}
    </Main>
  );
}

function Search({ setNationality, nationalities }) {
  return (
    <>
      <label> Filter by Nationality: </label>

      <select
        name="gender"
        id="gender-select"
        onChange={(event) => setNationality(event.target.value)}
      >
        <option value="">--All--</option>
        {nationalities.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </>
  );
}

function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}

function Loader() {
  return <p className="loader">Loading ....</p>;
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

export default UserList;
