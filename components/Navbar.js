"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/images/logo.svg";
import { getProviders, signIn,signOut,useSession } from "next-auth/react";
import { useEffect, useState } from "react";
const Navbar = () => {
  const {data:session}=useSession()
  const [providers , setProviders]=useState(null)

  useEffect(()=>{
    const setUpProviders = async() =>{
      const response=await getProviders()
      setProviders(response)
    }
    setUpProviders()
  },[])


  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image src={Logo} alt="logo" className="w-8 h-8 object-contain" />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* desktop */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button onClick={()=>signOut()} type="button" className="outline_btn">
              Sing Out
            </button>
            <Link href={`/profile`}>
              <Image
                 src={session?.user?.image}
                 alt="profile_picture"
                 className="rounded-full object-contain shadow-sm"
                 width={40}
                 height={40}
              />
            </Link>
          </div>
        ) : (
          <>
          {providers && Object.values(providers).map((provider)=>(
            <button type="button" key={provider.id} onClick={()=>signIn("github",provider.id)} className="black_btn">
              Sign In
            </button>
              ))}
          </>
        )}
      </div>

      {/* mobile */}
      <div className="sm:hidden">
        {session?.user ? (
          <div className=" relative inline-block group">
            <span>
              <Image
                src={session?.user?.image}
                alt="profile_picture"
                className="w-10 rounded-full object-contain shadow-sm ring-2 ring-gray-500"
                width={40}
                height={40}
              />
            </span>
            <div className="hidden absolute bg-white border z-10 group-hover:block  right-0  rounded-md shadow-sm">
              <ul className="dropdown">
                <li className="dropdown_link">My Profile</li>
                <li className="dropdown_link">Create Prompt</li>
                <li><button onClick={()=>signOut()} className="black_btn">Sign Out</button></li>
              </ul>
              
            </div>
          </div>
        ) : (
          <>
            <button type="button" onClick={()=>signIn()} className="black_btn">
              Sign In
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
