import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//BUUUUUUUUGGGGGGGGGGGGGGGGG
//ideally context API or redux in order to manage global state of users , calling this API again produces wrong results , i realized this way too late !!!!

function UserDetails() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const params = useParams();
  console.log(params);
  useEffect(function () {
    async function fetchUser() {
      try {
        const res = await fetch(`https://randomuser.me/api/?id=${params.id}`);

        if (!res.ok) throw new Error("Opps ! something went wrong");

        const data = await res.json();
        console.log(data);

        if (data.Response === "False")
          throw new Error("Opps ! users not found");

        setUser(data.results[0]);
      } catch (err) {
        throw new Error("user not found");
      }
    }
    fetchUser();
  }, []);

  return (
    <>
      <div>
        <p>
          hello - {user?.name?.title} {user?.name?.first} {user?.name?.last}
        </p>
        <img src={user.picture?.thumbnail} alt="Avatar"></img>
        <p>From : {user.location?.country}</p>
        <p>Age : {user.dob?.age}</p>
        <p>Phone : {user.phone}</p>
      </div>
      <button
        type={"back"}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Back
      </button>
    </>
  );
}

export default UserDetails;
