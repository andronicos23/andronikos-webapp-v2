import { createContext, useState, useEffect, useContext } from "react";

const UsersContext = createContext();

function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1); // Current page
  const seed = "abc"; // Seed for reproducibility
  const resultsPerPage = 10;

  useEffect(
    function () {
      async function fetchUsers() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `https://randomuser.me/api/?page=${page}&results=${resultsPerPage}&seed=${seed}`
          );

          if (!res.ok) throw new Error("Opps ! something went wrong");

          const data = await res.json();
          console.log(data);

          if (data.Response === "False")
            throw new Error("Opps ! users not found");

          setUsers(data.results);
          setUsersList(data.results);
          setTotalPages(Math.ceil(1000 / resultsPerPage));
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
    },
    [page]
  );

  return (
    <UsersContext.Provider
      value={{
        users,
        usersList,
        nationalities,
        error,
        isLoading,
        setUsersList,
        totalPages,
        page,
        setPage,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

function useUsers() {
  const context = useContext(UsersContext);
  if (context === undefined) throw new Error("contect outside of scope");
  return context;
}

export { useUsers, UsersProvider };
