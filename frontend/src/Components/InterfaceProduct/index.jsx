import React from "react";

export default function InterfaceProduct({name, src}) {
    return(
        <div className="bg-white w-70 h-28 mx-auto grid grid-cols-2 grid-rows-1 gap-0 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-slate-100">
            <div className="flex justify-center items-center">
                <text className="text-xl font-semibold">{name}</text>
                </div>
            <div className="flex justify-center items-center">
                <img src={src} className="w-22 h-20"></img>
            </div>
            
            

        </div>
    )
}