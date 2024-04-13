import React from "react";

const TestimonialCard = ({ ...prop }) => {
  return (
    <div className="my-6">
      <div
        key={prop.prop.id}
        className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative"
      >
        <div className="mb-4">
          <img src={prop.prop.img} alt="" className="rounded-full w-20 h-20" />
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="space-y-3">
            <p className="text-xs text-gray-500">{prop.prop.text}</p>
            <h1 className="text-xl font-bold text-black/80 dark:text-light">
              {prop.prop.name}
            </h1>
          </div>
        </div>
        <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
          ,,
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
