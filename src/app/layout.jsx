"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronRight, FaComputerMouse, FaCartShopping } from "react-icons/fa6";
import { RiUserSettingsLine, RiRouterFill, RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import { MdMenuOpen, MdOutlineShoppingCartCheckout, MdStorage, MdComputer, MdOutlineDesktopWindows, MdMenu } from "react-icons/md";
import { HiSwitchVertical } from "react-icons/hi"
import { FcHeadset, FcVideoProjector } from "react-icons/fc"
import { PiComputerTowerFill } from "react-icons/pi"
import { BsKeyboardFill, BsFillRouterFill } from "react-icons/bs"
import { AiFillHome } from "react-icons/ai"
import { BiCategory, BiSolidServer } from "react-icons/bi"
import { NavLink } from "@mantine/core";
import { useState, useEffect } from "react";
import LoginPage from '@/src/components/Login';
import { Button, Toolbar, IconButton, Typography } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const router = useRouter();
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ user, setUser ] = useState(null);
  const [ token, setToken ] = useState("");
  const api = process.env.NEXT_PUBLIC_API_SERVER;

  useEffect(() => {
    if (window) {
      try {
        setToken(JSON.parse(sessionStorage.getItem("user_token")).key);
      } catch (error) {
        console.log(error);
      }
  }}, [isLoggedIn]);

  useEffect(() => {
    const fetchUserDetails = async() => {
      const res = await fetch(`${api}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${token}`,
        },
      });
      const data = await res.json();
      setUser(data[0]);
    }
      fetchUserDetails();
  }, [token]);

  useEffect(() => {
    if(user) {
      sessionStorage.setItem("user_details", JSON.stringify(user));
    }
  }, [user]);

  function handleLogout() {
    fetch(`${api}/auth/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      setToken(null);
      setUser(null);
      sessionStorage.clear();
      router.refresh();
    });
  }

  function handleIsLoggedIn(){
    setIsLoggedIn(isLoggedIn => !isLoggedIn);
    router.refresh();
  }
    
  
  return (
    <html lang="en">
      <head>
        <title>Mburus Tech</title>
      </head>
      <body className={inter.className}>
        <div className="sticky top-0 right-0 flex justify-between font-bold text-xl p-2 text-white min-h-fit h-12 bg-cyan-950 border-b-2 border-b-gray-800">
          <div className='ml-6'>Page Title</div>
          <Link href="/" className='flex ms-10 text-l'>Mburus Tech</Link>
          <Link className="flex mr-6"
          title='User profile'
          href={"/account"}
          >
            <RiUserSettingsLine size={28} color="white" title='Logged in user' />
            {user ? user.first_name : "Not Logged in"} 
          </Link>
        </div>
        {/* {user ?  */}
        <div > 
          <div className="flex flex-row ">
            {!navCollapsed ?
              <div className="navbar bg-black-950 w-96 h-screen overflow-y-auto sticky bottom-0 top-0 left-0 border-r-2 border-gray-800">               
                <div className="links-container flex flex-col justify-start py-2">
                <button
                onClick={() => setNavCollapsed(true)}
                className='flex justify-end mr-2'>
                  <RiMenuFoldFill size={28} color='white'/>
                </button>
                  <NavLink
                    label="Home Page"
                    icon={<AiFillHome size={28} color="white" />}
                    className="text-white text-lg hover:bg-gray-600"
                    variant="subtle"
                    component={Link}
                    href="/"
                  />
                  <NavLink
                    label="Categories"
                    icon={<BiCategory size={28} color="white" />}
                    className="text-white text-lg hover:bg-gray-600"
                    variant="subtle"
                    rightSection={<FaChevronRight size="0.8rem" stroke={1.5} />}
                    childrenOffset={20}
                  >
                    <NavLink
                      label="Desktops"
                      icon={<PiComputerTowerFill size={28} color="white" />}
                      className="text-white text-lg hover:bg-gray-600"
                      component={Link}
                      href="/categories/desktops"
                    />
                    <NavLink
                      label="Monitors"
                      icon={<MdOutlineDesktopWindows size={28} color="white" />}
                      className="text-white text-lg hover:bg-gray-600"
                      component={Link}
                      href="/categories/monitors"
                    />
                    <NavLink
                      label="Laptops"
                      icon={<MdComputer size={28} color="white" />}
                      className="text-white text-lg hover:bg-gray-600"
                      component={Link}
                      href="/categories/laptops"
                    />
                    <NavLink
                      label="Accessories"
                      icon={<BiCategory size={28} color="white" />}
                      className="text-white text-lg hover:bg-gray-600"
                      variant="subtle"
                      rightSection={<FaChevronRight size="0.8rem" stroke={1.5} />}
                      childrenOffset={20}
                    >
                      <NavLink
                      label="Mouse"
                      icon={<FaComputerMouse size={28} color="white" />}
                      className="text-white text-lg hover:bg-gray-600"
                      component={Link}
                      href="/categories/accessories/mouse"
                    />
                    <NavLink
                      label="Keyboards"
                      icon={<BsKeyboardFill size={28} color="white" />}
                      className="text-white text-lg hover:bg-gray-600"
                      component={Link}
                      href="/categories/accessories/keyboards"
                    />
                    <NavLink
                      label="Storage"
                      icon={<MdStorage size={28} color="white" />}
                      className="text-white text-lg hover:bg-gray-600"
                      component={Link}
                      href="/categories/accessories/storage"
                    />
                    <NavLink
                      label="Headsets"
                      icon={<FcHeadset size={28} color="white" />}
                      className="text-white text-lg hover:bg-gray-600"
                      component={Link}
                      href="/categories/accessories/headsets"
                    />
                    </NavLink>
                    <NavLink
                      label="Projectors"
                      icon={<FcVideoProjector size={28} color="white" />}
                      className="text-white text-lg hover:bg-gray-600"
                      component={Link}
                      href="/categories/projectors"
                    />
                    <NavLink
                      label="Networking"
                      icon={<BiSolidServer size={28} color="white" />}
                      className="text-white text-lg hover:bg-gray-600"
                      variant="subtle"
                      rightSection={<FaChevronRight size="0.8rem" stroke={1.5} />}
                      childrenOffset={20}
                    >
                      <NavLink
                      label="Servers"
                      icon={<BiSolidServer size={28} color="white" />}
                      className="text-white text-lg hover:bg-gray-600"
                      component={Link}
                      href="/categories/networking/servers"
                      />
                      <NavLink
                        label="Switches"
                        icon={<HiSwitchVertical size={28} color="white" />}
                        className="text-white text-lg hover:bg-gray-600"
                        component={Link}
                        href="/categories/networking/switches"
                      />
                      <NavLink
                      label="Routers"
                      icon={<BsFillRouterFill size={28} color="white" />}
                      className="text-white text-lg hover:bg-gray-600"
                      component={Link}
                      href="/categories/networking/servers"
                      />
                      <NavLink
                        label="Access Points"
                        icon={<RiRouterFill size={28} color="white" />}
                        className="text-white text-lg hover:bg-gray-600"
                        component={Link}
                        href="/categories/networking/switches"
                      />
                    </NavLink>
                  </NavLink>
                  <NavLink
                    label="Cart"
                    icon={<FaCartShopping size={28} color="white" />}
                    className="text-white text-lg hover:bg-gray-600"
                    variant="subtle"
                    component={Link}
                    href="/cart"
                  />
                  <NavLink
                    label="Checkout"
                    icon={<MdOutlineShoppingCartCheckout size={28} color="white" />}
                    className="text-white text-lg hover:bg-gray-600"
                    variant="subtle"
                    component={Link}
                    href="/checkout"
                  />
                </div>
                <div className='flex justify-center bottom-0'>
                  <Button
                  onClick={handleLogout}
                  className='bg-blue-600 text-white'
                  > Logout
                  </Button>
                </div>
              </div>
              : <div className="sticky left-0 bottom-0 top-0 w-7 border-r-2 border-r-gray-800 bg-black h-screen">
                  <button
                  onClick={() => setNavCollapsed(false)}>
                    <RiMenuUnfoldFill size={28} color='white'/>
                  </button>
                
              </div>
            }
            <div className="flex flex-col overflow-x-hidden w-full">
              <div>{children}</div> 
              
              </div>
          </div>
        </div>
         {/* : <LoginPage handleIsLoggedIn={handleIsLoggedIn}/>  */}
         {/* }  */}
      </body>
    </html>
  );
}
