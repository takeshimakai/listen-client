import { useEffect, useContext } from "react";

import UserContext from "../contexts/UserContext";

const UserThumbnail = () => {
  const { token } = useContext(UserContext);

  return (
    <div className='user-thumbnail'>
      Profile
    </div>
  )
}

export default UserThumbnail;