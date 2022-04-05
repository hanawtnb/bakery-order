import React, { useEffect } from "react";
import { useRouter } from "next/router";
import TodaysMenu from "src/components/template";
import { NextPage } from "next";

const Menu: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("signIn");
  }, [router]);
  return (
    <>
      <div>Menu</div>
      <TodaysMenu />
    </>
  );
};

export default Menu;
