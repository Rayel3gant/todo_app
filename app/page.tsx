import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="w-full h-[clac(100vh-6rem)]  overflow-hiden flex justify-between items-center ">
      <Image
        src={"/todo.jpg"}
        alt="todo"
        height={500}
        width={600}
        className="hidden md:block md:w-[55%] h-[calc(100vh-6rem)]"
      />

      <div className="w-11/12 mx-auto md:w-[40%] flex flex-col items-center justify-center gap-y-5 border-2 rounded-md shadow-sm h-fit  py-12 ">
        
        <div>

        </div>
        
        <div className="flex items-center gap-x-4">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>

          <Button asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
