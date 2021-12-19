import { useEffect, useState } from "react";

import MobileMenu from "./MobileMenu";
import Menu from "./Menu";

const Nav = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 640);

    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  });

  return (
    <div className='z-10 fixed w-full h-12 flex items-center justify-between py-2 px-4 bg-gray-50'>
      <h1 id='logo' className='logo-sm z-10'>listen</h1>
      {isMobile ? <MobileMenu /> : <Menu />}
    </div>
  )
}

export default Nav;