import React from "react";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ ...prop }) => {
  return (
    <div
      key={prop.prop.id}
      className="space-y-3"
      data-aos="fade-up"
      data-aos-delay={prop.prop.aosDelay}
    >
      <img
        src={prop.prop.img}
        alt=""
        className="h-[220px] w-[150px] object-cover rounded-md"
      />
      <div>
        <h3 className="font-semibold">{prop.prop.title}</h3>
        <p className="text-sm text-gray-600">{prop.prop.color}</p>
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-400" />
          <span>{prop.prop.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
