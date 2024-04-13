import React, { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
// import Logo from "../../assets/Logo.png";
import Logo from "../../assets/image.png";
import Darkmode from "./Darkmode";
import { Menu, DropdownMenu, ProfileMenu } from "../../index.ts";
// import axios from "axios";

const Navbar = () => {
  const user = null;
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center ">
          <div>
            <a href="/" className="front-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="" className="w-[50px] rounded-md" />
              Moda Mantra
            </a>
          </div>
          {/* sreach bar */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hiidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gay-300 px-2 py-1 focus:outline-none focus-border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
              />
              <CiSearch className="text-gray-500 group-hover:text-primary absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
            {/* order button  */}
            <button
              onClick={() => alert("Ordering not avaible yet")}
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block-hiidden transition-all duration-200">
                {/* Order */}
              </span>
              <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>
            {/* Drakmode swich */}
            <div>
              <Darkmode />
            </div>
            {/* user profile  */}
            <div>
              {user ? (
                <div className="group relative cursor-pointer">
                  <div className="flex mx-2">
                    <img
                      src={user?.image}
                      alt=""
                      className="w-10 rounded-full text-xl flex items-center gap-[2px] py-2"
                    />
                    <div className="text-xl flex items-center gap-[2px] py-2 mx-2">
                      {user?.name}
                      <span>
                        <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                      </span>
                    </div>
                    <div className="mt-14 absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow">
                      <ul>
                        {ProfileMenu.map((item) => (
                          <li key={item.id}>
                            <a
                              href={item.link}
                              className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                            >
                              {item.label}
                            </a>
                            <hr />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <div>
                    <a href="/login">Login</a>
                  </div>
                  <div>
                    <a href="/register">Register</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* lower Navbar */}
      <div className="flex justify-center">
        <ul className="sm:flex hiidden items-center gap-4">
          {Menu.map((item) => (
            <li key={item.id}>
              <a
                href={item.link}
                className="text-xl inline-block px-4 hover:text-primary duration-200"
              >
                {item.label}
              </a>
            </li>
          ))}
          {/* simple dropdown and links  */}
          <li className="group relative cursor-pointer">
            <a href="#" className="text-xl flex items-center gap-[2px] py-2">
              Trending Product
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow">
              <ul>
                {DropdownMenu.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                    >
                      {item.label}
                    </a>
                    <hr />
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
