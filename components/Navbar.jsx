"use client";
import styled from "styled-components"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Navbar = () => {
  const {data:session}=useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const settingProvider = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    settingProvider();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="PromptOps Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PromptOps</p>
      </Link>

      {/* Destop Navigation */}

      <div className="sm:flex hidden">
        {session?.user ? (
          <>
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>
              <button className="outline_btn" onClick={signOut}>
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  className="rounded-full"
                  width={37}
                  height={37}
                  alt="profile"
                />
              </Link>
            </div>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="outline_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile navigation */}

      <div className="sm:hidden">
        {session?.user ? (
        <Profile>
        <div className="flex">
            <Image
              src={session?.user.image}
              className="rounded-full"
              width={37}
              height={37}
              alt="profile"
              onClick={() => {
                setToggleDropdown(prev=>!prev);
              }}
            />

            <Menu>
              <div className="absolute flex flex-col  justify-center items-center space-y-2 mt-10  right-3 top-5 pr-4 ">
                <Link href="/profile" className="dropdown_link"
                >
                  My Profile
                </Link>
                <Link href="/create-prompt" className="dropdown_link "
                >
                  Create Post
                </Link>
                <button className="outline_btn" onClick={signOut}>
                Sign Out
              </button>
              </div>
            </Menu>
     
          </div>
          </Profile>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="outline_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};
const Menu=styled.div`
opacity:0;
`
const Profile=styled.div`
opacity:1;
&:hover{
   ${Menu}{
    opacity:1;
    
   }
    }
 }
}

`
export default Navbar;
