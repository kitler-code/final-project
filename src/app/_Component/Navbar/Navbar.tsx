"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { data, status } = useSession();
  const pathName: string = usePathname();
  console.log(pathName);

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
      <div className="flex items-center gap-4">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href={"/"}>
                <Image
                  src={"/images/freshcart-logo.svg"}
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* ✅ Only show protected links if user is authenticated */}
          {MenuItems.filter(
            (item) =>
              !item.protected || (item.protected && status === "authenticated")
          ).map((item) => (
            <NavigationMenuItem key={item.path}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={item.path}>{item.content}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </div>

      <div className="flex items-center gap-4">
        <NavigationMenuList>
          {status === "authenticated" ? (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <span className="bg-green-400 p-3 rounded-2xl">
                    Hello {data?.user?.name}
                  </span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <span
                    onClick={logout}
                    className="cursor-pointer bg-red-500 p-3 rounded"
                  >
                    Logout
                  </span>
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
      </div>
    </NavigationMenu>
  );
}
