import React from "react";

const Categories = ({ handleMealSelection, handleShowAllBowls }) => {
  return (
    <>
      <div className="w-full mx-auto flex justify-between md:justify-center bg-zinc-900 text-zinc-50 md:text-2xl md:gap-4">
        <div className="max-w-[1100px]">
          <button
            onClick={handleShowAllBowls}
            className="px-3 py-2 md:py-4 focus:text-amber-400">
            All
          </button>
          <button
            value="Breakfast"
            onClick={handleMealSelection}
            className="px-3 py-2 md:py-4 focus:text-amber-400">
            Breakfast
          </button>
          <button
            value="Lunch"
            onClick={handleMealSelection}
            className="px-3 py-2 md:py-4 focus:text-amber-400">
            Lunch
          </button>
          <button
            value="Dinner"
            onClick={handleMealSelection}
            className="px-3 py-2 md:py-4 focus:text-amber-400">
            Dinner
          </button>
          <button
            value="Dessert"
            onClick={handleMealSelection}
            className="px-3 py-2 md:py-4 focus:text-amber-400">
            Dessert
          </button>
        </div>
      </div>
    </>
  );
};

export default Categories;
