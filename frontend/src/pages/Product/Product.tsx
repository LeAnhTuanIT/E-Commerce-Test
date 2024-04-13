import React from "react";
import TopProductCard from "../../components/TopProduct/TopProductCard";
import { TopProducts } from "../../index";

const Product = () => {
  return (
    <div className="mt-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
        {TopProducts.map((item) => (
          <TopProductCard key={item.id} prop={item} />
        ))}
      </div>
    </div>
  );
};

export default Product;
