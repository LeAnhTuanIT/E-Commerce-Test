import React from "react";
import { FaStar } from "react-icons/fa";

const TopProductCard = ({ ...prop }) => {
  return (
    <div
      data-aos="zoom-in"
      className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-high max-w-[300px]"
    >
      {/* image section */}
      <div className="h-[100px]">
        <img
          src={prop.prop.img}
          alt=""
          className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
        />
      </div>
      {/* detail section  */}
      <div className="p-4 text-center">
        {/* star rating */}
        <div className="w-full flex justify-center items-center gap-1">
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
        </div>
        <h1 className="tetx-xl font-bold">{prop.prop.title}</h1>
        <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
          {prop.prop.description}
        </p>
        <button className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default TopProductCard;
