import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

export default function TopCategories({ categories }) {


  return (
    <div className="navbot bg-cusgray z-30 w-full px-1 md:px-0">
      <div className=" mx-auto md:flex place-items-center max-w-6xl">
        <div className="category overflow-x-auto flex flex-wrap place-items-center py-2">
          <Link key="all" href={`/shop`}>
            <button
              className="bg-gray-100 text-cusblack py-2.5 px-6 rounded-3xl text-xs mr-3 mb-2 md:mb-0"
            >
              All items
            </button>
          </Link>
          {categories.map((cat, idx) => (
            <Link key={cat.slug}>
              <button
                className="py-2.5 px-6 rounded-3xl text-xs mr-3 mb-2 md:mb-0 bg-white text-cusblack" 
              >
                {cat.name}
              </button>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );

}