import UserCards from "./UserCards";
import { useUsers } from "../context/UsersContext";
import { useEffect, useState } from "react";

function UserList() {
  const {
    users,
    nationalities,
    error,
    isLoading,

    totalPages,
    page,
    setPage,
  } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users, page]);

  const setNationality = (nationality) => {
    console.log(nationality);
    setFilteredUsers(
      nationality ? users.filter((u) => u.nat === nationality) : users
    );
  };

  return (
    <Main>
      <Search setNationality={setNationality} nationalities={nationalities} />
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <UserCards users={filteredUsers} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </Main>
  );
}

function Pagination({ currentPage, totalPages, setPage }) {
  return (
    <div className="pagination">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
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
