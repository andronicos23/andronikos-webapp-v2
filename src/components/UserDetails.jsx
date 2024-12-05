import { useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../context/UsersContext";

//BUUUUUUUUGGGGGGGGGGGGGGGGG
//ideally context API or redux in order to manage global state of users , calling this API again produces wrong results , i realized this way too late !!!!

function UserDetails() {
  const { users } = useUsers();
  const params = useParams();
  const navigate = useNavigate();
  //console.log(params);
  const user = users.filter((user) => user.id.value === params.id);

  //console.log(users);

  console.log(user);

  return (
    <>
      <div>
        <p>
          hello - {user[0].name?.title} {user[0].name?.first}{" "}
          {user[0].name?.last}
        </p>
        <img src={user[0].picture?.thumbnail} alt="Avatar"></img>
        <p>From : {user[0].location?.country}</p>
        <p>Age : {user[0].dob?.age}</p>
        <p>Phone : {user[0].phone}</p>
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
