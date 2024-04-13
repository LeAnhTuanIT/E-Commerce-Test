import React from "react";
import { Products } from "../../index.ts";
import ProductCard from "./ProductCard.tsx";

const Product = () => {
  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* header section  */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Selling Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            asperiores modi Sit asperiores modi
          </p>
        </div>
        {/* body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {Products.map((item) => (
              <ProductCard key={item.id} prop={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
