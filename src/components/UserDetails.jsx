import { useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../context/UsersContext";
import styles from "./UserDetails.module.css";

//BUUUUUUUUGGGGGGGGGGGGGGGGG
//ideally context API or redux in order to manage global state of users , calling this API again produces wrong results , i realized this way too late !!!!

function UserDetails() {
  const { users } = useUsers();
  const params = useParams();
  const navigate = useNavigate();
  //console.log(params);
  const user = users.filter((user) => user.id.value === params.id);

  //console.log(users);
  if (user.length === 0) {
    return <p>User not found.</p>;
  }

  console.log(user);

  return (
    <div className={styles.userDetails}>
      <div className={styles.profileHeader}>
        <img
          className={styles.profilePicture}
          src={users[0].picture?.large}
          alt={`${users[0].name?.first} ${users[0].name?.last}'s Avatar`}
        />
        <div className={styles.userInfo}>
          <h2>
            {users[0].name?.title} {users[0].name?.first} {users[0].name?.last}
          </h2>
          <p className={styles.userLocation}>
            From: {users[0].location?.country}
          </p>
          <p>Age: {users[0].dob?.age}</p>
          <p>Phone: {users[0].phone}</p>
        </div>
      </div>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        &larr; Back
      </button>
    </div>
  );
}

export default UserDetails;
