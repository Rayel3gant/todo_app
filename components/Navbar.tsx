import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return <div className="w-11/12 lg:w-3/4 mx-auto flex justify-between items-center my-2 border rounded-full px-4 py-4 lg:px-6 lg:py-4">
    <Link href="/">
        <div className="uppercase text-black font-bold ">Todo Bot</div>
    </Link>
  </div>;
};
