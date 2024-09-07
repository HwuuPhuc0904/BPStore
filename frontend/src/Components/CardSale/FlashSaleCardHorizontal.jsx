import React from "react";

export default function FlashSaleCardHorizontal() {
    return (
        <div className=" w-[35%] p-6 flex shadow bg-slate-50 border-[1px] border-gray-950 rounded-lg">
            <img className="w-1/3 mr-6 rounded-lg" src="flashsale.jpg"/>
            <div>
                <h6 className="block mb-6 font-sans text-base uppercase font-semibold leading-relaxed tracking-normal text-red-500 font-bungee">20 : 06 : 07</h6>
                <h4 className="block mb-4 font-sans text-3xl font-semibold antialiased leading-relaxed tracking-normal text-blue-400 ">Đại hội giảm giá</h4>
                <p className="block mb-4 font-sans text-base antialiased font-normal leading-relaxed tracking-normal text-gray-500">đại tiệc giảm giá nhân dịp đầu năm mới mời anh em checking sản phẩm</p>
                <a className="inline-block" href="#">
                    <button className="flex item-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-red-500 uppercase aline-middle transition-all rounded-lg select-none hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        Xem ngay
                    </button>
                </a>
            </div>
        </div>
    )
}