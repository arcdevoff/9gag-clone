"use client";
import useUser from "@/hooks/useUser";
import { setModal, setSidebar } from "@/redux/reducers/ui/slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Pencil, TextAlignJustify, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import ProfileWindow from "./ProfileWindow";
import Image from "next/image";

const Header = () => {
  const dispatch = useAppDispatch();
  const { user, logout } = useUser();
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const [isProfileWindowVisible, setIsProfileWindowVisible] = useState(false);
  const sidebarState = useAppSelector((state) => state.ui.sidebar);

  return (
    <div className="fixed top-0 left-0 right-0 z-500 bg-stone-950 py-3 px-4 border-b border-stone-800">
      <div className="flex justify-between container mx-auto px-0 sm:px-3 lg:px-25">
        <div className="flex">
          <button
            onBlur={() => dispatch(setSidebar({ isVisible: false }))}
            onClick={() =>
              dispatch(setSidebar({ isVisible: !sidebarState.isVisible }))
            }
            className="inline-block lg:hidden mr-3"
          >
            {sidebarState.isVisible ? <X /> : <TextAlignJustify />}
          </button>

          <Link className="text-3xl font-bold" href={"/"}>
            {process.env.NEXT_PUBLIC_APP_NAME}
          </Link>
        </div>

        <div className="flex gap-3 relative">
          <button
            onClick={() => {
              if (accessToken) {
                dispatch(
                  setModal({
                    modal: "postCreateModal",
                    modalState: { isOpen: true },
                  })
                );
              } else {
                dispatch(
                  setModal({
                    modal: "loginModal",
                    modalState: { isOpen: true },
                  })
                );
              }
            }}
            className="flex gap-2 items-center bg-stone-800 px-6 font-bold py-2 rounded-full hover:bg-stone-700 transition-colors"
          >
            <Pencil size={19} /> Create
          </button>

          {user?.username ? (
            <button
              onBlur={() => setIsProfileWindowVisible(false)}
              onClick={() => setIsProfileWindowVisible(!isProfileWindowVisible)}
            >
              <Image
                className="rounded-full border-1 border-stone-400"
                src={user?.avatar ? user.avatar : `/images/avatar.jpg`}
                width={39}
                height={39}
                alt="avatar"
              />
            </button>
          ) : (
            <button
              onClick={() =>
                dispatch(
                  setModal({
                    modal: "loginModal",
                    modalState: { isOpen: true },
                  })
                )
              }
              className="bg-blue-600 px-6 font-bold py-2 rounded-full  hover:bg-blue-500 transition-colors"
            >
              Log in
            </button>
          )}

          {isProfileWindowVisible && user?.username && (
            <ProfileWindow data={user} logout={logout} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
