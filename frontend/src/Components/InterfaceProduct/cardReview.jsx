import React from "react";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export default function CardReview({ name, src, bg_color }) {
  return (
    <div className={`flex h-[250px] w-[440px] ${bg_color} p-4 shadow-lg`}>
      <div className="flex-1">
        <h3 className="text-left text-5xl font-extrabold font-aston whitespace-pre-line">
          {name}
        </h3>
        <p className="text-left mt-5 text-teal-300 font-extrabold">Khám phá ngay <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon></p>
      </div>
      <div className="flex-2 ">
      <img src={src} alt="" className="w-[144px] h-[256px] items-end " />
      </div>
    </div>
  );
}
