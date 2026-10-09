import React from "react";
import Image from "next/image";


const Headerpage = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="grid grid-cols-3 items-center px-6 py-4">
      <div></div>

      
      <div className="flex items-center justify-center gap-3">
        <Image src="/news.png" alt="news" width={50} height={50} />
        <div>
          <h2 className="text-3xl font-bold text-red-700">News Orbit</h2>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>

      
      <div className="flex items-center justify-end gap-3">
        <button className="btn btn-ghost">সাইন ইন</button>
        <button className="btn bg-red-700 text-white">সাইন আপ</button>
          </div>

    </header>
  );
};

export default Headerpage;