import React, { useState } from 'react';
import { IoSettings } from 'react-icons/io5';
import Avatar from 'boring-avatars';
import { Button } from 'react-daisyui';
import { BiSolidUserRectangle } from 'react-icons/bi';
// import NavigationBtnAdmin from './NavigationBtnAdmin';

const NavbarAdmin: React.FC<{}> = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleAvatarClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="hidden w-full items-center justify-between xl:flex">
        {/* Search Input */}
        <div className="relative mr-4 flex items-center">
          {/* <Input
            className="min-w-[400px] bg-white text-black placeholder-black focus:outline-none"
            type="text"
            placeholder="Tìm Kiếm..."
          />
          <div className="absolute right-2 h-5 w-5 cursor-pointer text-black">
            <IoSearchOutline />
          </div> */}
        </div>

        <div className="flex h-full items-center">
          <nav>
            {/* <div className="mx-5 space-x-4">
              <NavigationBtnAdmin
                badgeNumber={1}
                Icons={<FaBell />}
                style=" bg-[#2D9CDB26] text-[#2D9CDB]"
                bg_span="bg-[#2D9CDB]"
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <NavigationBtnAdmin
                badgeNumber={2}
                Icons={<IoChatboxEllipses />}
                style=" bg-[#2D9CDB26] text-[#2D9CDB]"
                bg_span="bg-[#2D9CDB]"
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <NavigationBtnAdmin
                badgeNumber={3}
                Icons={<FaGift />}
                style=" bg-[#5E6C9326] text-[#5E6C93]"
                bg_span="bg-[#5E6C93]"
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <NavigationBtnAdmin
                badgeNumber={4}
                Icons={<FaGear />}
                style=" bg-[#FF5B5B26] text-[#FF5B5B]"
                bg_span="bg-[#FF5B5B]"
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </div> */}
          </nav>
          <div className="text-black dark:text-white">
            Hello,&nbsp;
            <span className="font-semibold text-red-500">Sếp</span>
          </div>
          <div className="ml-4 cursor-pointer" onClick={handleAvatarClick}>
            <Avatar />
            {dropdownVisible && (
              <div className="absolute right-6 mt-1 flex flex-col gap-[1px] bg-white font-light shadow">
                <Button
                  size="md"
                  className="text-md flex w-full items-center justify-start rounded-none border-b-[0.5px] border-b-gray-50"
                >
                  <div className="mr-2 text-base">
                    <BiSolidUserRectangle />
                  </div>
                  Profile
                </Button>
                <Button
                  size="md"
                  className="text-md flex w-full items-center justify-start rounded-none border-b-[0.5px] border-b-gray-50"
                >
                  <div className="mr-2 text-base">
                    <IoSettings />
                  </div>
                  Settings
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;
