import styles from "./UserCards.module.css";

import { useNavigate } from "react-router-dom";

function UserCards({ users }) {
  //   const [showUserDetails, setShowUserDetails] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {users?.map((user, i) => (
        <div
          className={styles.card}
          key={i}
          onClick={() => navigate(`/user-details/${user.id.value}`)}
        >
          <img src={user.picture?.thumbnail} alt="Avatar"></img>
          <div>
            <h4>
              <b>
                {user.name.first} {user.name.last}
              </b>
            </h4>
            <p>{new Date(user.dob.date).toLocaleDateString()}</p>
            <p>{user.nat}</p>
            <p>{user.id.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserCards;
