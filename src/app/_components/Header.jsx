import Cookies from "js-cookie";

const handleLogout = () => {
  Cookies.set("user", "0");
};

export default function Header() {
  const isLoggedIn =
    Cookies.get("user") !== "0" && Cookies.get("user") !== null;

  if (!isLoggedIn) {
    return (
      <>
        <header className="bg-PrimaryBlue shadow-2xl bg-opacity-75 py-2 shadow-md text-white font-semibold px-4 flex justify-between items-center">
          <h1 className="text-lg">Fit Fusion</h1>
          <nav className="flex items-center">
            <a href="/" className="ml-4">
              Home
            </a>
            <a href="/about" className="ml-4">
              About
            </a>
            <a href="/services" className="ml-4">
              Services
            </a>
            <a href="/contact" className="ml-4">
              Contact
            </a>
            <img
              src="/images/logo1.png"
              alt="{image}"
              className="ml-4 w-10 h-10"
            />
          </nav>
        </header>
      </>
    );
  } else {
    return (
      <>
        <header className="bg-PrimaryBlue shadow-2xl bg-opacity-75 py-2 shadow-md text-white font-semibold px-4 flex justify-between items-center">
          <h1 className="text-lg">Fit Fusion</h1>
          <nav className="flex items-center">
            <a href="/" className="ml-4">
              Home
            </a>
            <a href="/about" className="ml-4">
              About
            </a>
            <a href="/services" className="ml-4">
              Services
            </a>
            <a href="/contact" className="ml-4">
              Contact
            </a>
            <a href="/" className="ml-4" onClick={handleLogout}>
              Logout
            </a>
            <img
              src="/images/logo1.png"
              alt="{image}"
              className="ml-4 w-10 h-10"
            />
          </nav>
        </header>
      </>
    );
  }
}
