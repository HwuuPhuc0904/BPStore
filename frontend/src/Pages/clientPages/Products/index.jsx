import React from "react";
import Topbar from "../Topbar";
import TopCategories from "../Topbar/topCategories";

export default function Products() {
  const categories = [
    {
      id: 1,
      name: "category1",
      slug: "category1"
    },
    {
      id: 2,
      name: "category2",
      slug: "category2"
    },
    {
      id: 3,
      name: "category3",
      slug: "category3"
    }
  ];


  return (
   
<div className="grid grid-cols-5 grid-rows-5 gap-4">
    <div className="col-span-5"><Topbar></Topbar></div>
    <div className="col-span-5 row-start-2"><TopCategories categories={categories}></TopCategories></div>
    <div className="col-span-2 row-span-3 row-start-3">3</div>
    <div className="col-span-3 row-span-3 col-start-3 row-start-3">4</div>
</div>
    
  );
}