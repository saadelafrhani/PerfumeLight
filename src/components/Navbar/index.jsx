import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    if (value) {
      navigate(`/${value}`);
      setMenuOpen(false); // Close menu after selection
    }
  };

  return (
    <header className="w-full px-5 sm:px-10 lg:px-40 h-20 flex items-center justify-between bg-opacity-30 backdrop-blur-md z-50">
      {/* Logo */}
      <div className="flex justify-center items-center">
        <Link to="/">
          <img
            src="/name.png"
            alt="logo"
            className="w-[150px] sm:w-[200px] md:w-[250px] -mt-1"
          />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul
          className={`fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center space-y-6 text-xl transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"
            } sm:static sm:flex sm:flex-row sm:space-y-0 sm:space-x-6 sm:h-auto sm:w-auto sm:bg-transparent sm:translate-x-0`}
        >
          <li>
            <Link to="/admin" onClick={() => setMenuOpen(false)}>
              <span className="text-white font-semibold hover:text-custom-pink">
                News
              </span>
            </Link>
          </li>
      

          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              <span className="text-white font-semibold hover:text-custom-pink">
                About
              </span>
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              <span className="text-white font-semibold hover:text-custom-pink">
                Products
              </span>
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              <span className="text-white font-semibold hover:text-custom-pink">
                Contact
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hamburger Menu */}
      <button
        className="sm:hidden z-50 flex flex-col justify-center items-center"
        aria-label="Toggle Menu"
        onClick={toggleMenu}
      >
        <span
          className={`h-0.5 w-7 mb-1.5 bg-white transform transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
        ></span>
        <span
          className={`h-0.5 w-7 mb-1.5 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""
            }`}
        ></span>
        <span
          className={`h-0.5 w-7 mb-1.5 bg-white transform transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
        ></span>
      </button>
    </header>
  );
};

export default Navbar;
