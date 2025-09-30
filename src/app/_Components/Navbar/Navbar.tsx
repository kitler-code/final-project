"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";

export function Navbar() {
  const { data, status } = useSession();

  const MenuItems: { path: string; content: string; protected: boolean }[] = [
    { path: "/products", content: "Products", protected: false },
    { path: "/category", content: "Category", protected: false },
    { path: "/brands", content: "Brands", protected: false },
    { path: "/cart", content: "Cart", protected: true },
    { path: "/wishlist", content: "Wishlist", protected: false },
    { path: "/allorders", content: "Orders", protected: true },
  ];

  const MenuAuthItems: { path: string; content: string }[] = [
    { path: "/login", content: "Login" },
    { path: "/register", content: "Register" },
  ];

  function logout() {
    signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <NavigationMenu
      viewport={false}
      className="max-w-full justify-between shadow-2xl p-5"
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={"/"}>
              <Image
                src={"/images/freshcart-logo.svg"}
                alt="fresh mart"
                width={100}
                height={100}
              />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {MenuItems.map((item) => (
          <NavigationMenuItem key={item.path}>
            {item.protected && status === "authenticated" && (
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={item.path}>{item.content}</Link>
              </NavigationMenuLink>
            )}
            {!item.protected && (
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={item.path}>{item.content}</Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>

      <NavigationMenuList>
        {status === "authenticated" ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <span className="px-4 py-2 bg-green-500 text-white rounded-md">
                  Hello, {data?.user?.name}
                </span>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Logout
                </button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            {MenuAuthItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={item.path}>{item.content}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
