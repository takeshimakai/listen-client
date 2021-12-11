import { useContext } from "react";

import UserContext from "../../contexts/UserContext";

import decodeToken from "../../utils/decodeToken";

import MobileMenu from "./MobileMenu";

const Nav = () => {
  const { token } = useContext(UserContext);
  const { username } = decodeToken(token);

  return (
    <div className='flex justify-between py-2 px-4'>
      <h1 id='logo' className='logo-sm z-10'>listen</h1>
      <MobileMenu />
      <p
        id='user-icon'
        className='hidden sm:block h-8 w-8 bg-white hover:bg-gray-200 font-medium flex items-center justify-center rounded-full cursor-pointer'
      >
        {username[0].toUpperCase()}
      </p>
    </div>
  )
}

export default Nav;