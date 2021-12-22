import { Link } from "react-router-dom";

const Card = ({ title, users }) => {
  return (
    <div>
      <h3>{title}</h3>
      {users.map(user => (
        <Link
          to={`/users/${user._id}`}
          key={user._id}
        >
          {user.profile.username}
        </Link>
      ))}
    </div>
  )
}

export default Card;