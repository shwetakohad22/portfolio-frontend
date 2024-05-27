import React, { useState } from "react";
import logo from "../../assets/logo.jpeg";
import { navLinksdata } from "../../constants";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full h-24 sticky top-0 z-50 bg-bodyColor mx-auto flex justify-between items-center font-titleFont border-b-[1px] border-b-gray-600 px-4 md:px-8 lg:px-16">
      <div>
        <img className="w-[60px] h-[60px] rounded-full" src={logo} alt="Logo" />
      </div>
      <div className="hidden md:flex items-center gap-10">
        <ul className="flex items-center gap-6 md:gap-10">
          {navLinksdata.map(({ _id, title, link }) => (
            <li
              className="text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300"
              key={_id}
            >
              <Link
                activeClass="active"
                to={link}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:hidden">
        <button
          id="menu-button"
          onClick={handleMenuToggle}
          className="text-gray-400 hover:text-designColor focus:outline-none"
          aria-label="Open Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-24 left-0 w-full bg-bodyColor px-4 md:px-8 lg:px-16 md:hidden">
          <ul className="flex flex-col items-center gap-6 md:gap-10">
            {navLinksdata.map(({ _id, title, link }) => (
              <li
                className="text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300"
                key={_id}
              >
                <Link
                  activeClass="active"
                  to={link}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
