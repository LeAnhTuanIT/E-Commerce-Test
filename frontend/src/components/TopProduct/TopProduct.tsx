import React from "react";

import { TopProducts } from "../../index.ts";
import TopProductCard from "./TopProductCard.tsx";

const TopProduct = () => {
  return (
    <div>
      <div className="container">
        {/* Header Section */}
        <div className="text-left mb-24">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Rated Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Best Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            aspernatur quos, assumenda enim pariatur voluptatem! Sequi tempora
            modi sed asperiores, magnam illo aut, soluta enim incidunt
            perferendis non dolores in!
          </p>
        </div>
        {/* Body Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
          {TopProducts.map((item) => (
            <TopProductCard key={item.id} prop={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProduct;
