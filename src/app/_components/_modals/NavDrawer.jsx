import { usePathname } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

const NavDrawer = ({ isOpen, setIsLoggedIn }) => {
  let shown =
    "absolute sm:hidden flex flex-col w-3/4 h-4/6 p-5 z-20 bg-PrimaryBlue font-semibold drop-shadow-md rounded-br-lg text-white font-medium";
  let hidden = "hidden";

  const handleLogout = () => {
    Cookies.set("user", "0");
    setIsLoggedIn(false);
  };

  return (
    <div className={isOpen ? shown : hidden}>
      <Link className="hover:text-PrimaryGrey" href="/">
        Home
      </Link>
      <Link className="hover:text-PrimaryGrey" href="">
        About
      </Link>
      <Link className="hover:text-PrimaryGrey" href="">
        Services
      </Link>
      <Link className="hover:text-PrimaryGrey" href="">
        Contact
      </Link>
      <br></br>
      <Link className="hover:text-PrimaryGrey" href="Home">
        Dashboard
      </Link>
      <Link className="hover:text-PrimaryGrey" href="goals">
        My Goals
      </Link>
      <Link className="hover:text-PrimaryGrey" href="Diet">
        My Diet
      </Link>
      <Link className="hover:text-PrimaryGrey" href="cardio">
        My Cardio
      </Link>
      <br></br>
      <Link className="hover:text-red-500 hover:cursor-pointer" href="/">
        Logout
      </Link>
    </div>
  );
};

export default NavDrawer;
