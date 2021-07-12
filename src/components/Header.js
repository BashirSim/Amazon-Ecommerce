import React from "react";
import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

// We're using "Image" from nextJs b/c it optimizes the image
// by compressing it and it uses webe format. You must whitelist
// the domains that are you using the images from by creating a new file
// called next.config.js

const Header = ({ country }) => {
  const [session] = useSession();
  // console.log(session);
  const router = useRouter();
  const items = useSelector(selectItems);
  // console.log(country);
  // console.log(location.country_flag);

  return (
    <header>
      {/* Top Nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        <div className="hidden sm:flex text-white  items-center text-xs mr-6 whitespace-nowrap link">
          <LocationMarkerIcon className="h-5" />
          <div className="ml-2">
            <p>Deliver to</p>
            <p className="font-extrabold md:text-sm">{country?.country_name}</p>
          </div>
        </div>

        {/* Search */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/* Right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <Image
            className="hidden sm:flex"
            width={30}
            height={20}
            src={country.location.country_flag}
          />
          {/* We have created a custom class for the link at ../styles/global.css file */}
          <div onClick={!session ? signIn : signOut} className="link  ">
            <p className>
              {session ? `Hello, ${session.user.name}` : "Sign In"}{" "}
            </p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>

          <div onClick={() => router.push("/orders")} className="link ">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div
            onClick={() => router.push("/checkout")}
            className="relative link flex items-center "
          >
            <span className="absolute top-0 right-0 md:right-5 h-4 w-4 bg-yellow-400 text-center rounded-full font-bold text-black">
              {items.length}
            </span>

            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Today's Deals</p>
        <p className="link">Customer Services</p>
        <p className="link hidden lg:inline-flex">Gift Cards</p>
        <p className="link hidden lg:inline-flex">Sell</p>
        <p className="link hidden lg:inline-flex">Help</p>
        <p className="link hidden lg:inline-flex">Fashion</p>
        <p className="link hidden lg:inline-flex">Home</p>
        <p className="link hidden lg:inline-flex">Books</p>
        <p className="link hidden lg:inline-flex">Perfumes</p>
        <p className="link hidden lg:inline-flex">Mobile Phones</p>
        <p className="link hidden lg:inline-flex">Supermarket</p>
        <p className="link hidden lg:inline-flex">Coupons</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
      </div>
    </header>
  );
};

export default Header;
