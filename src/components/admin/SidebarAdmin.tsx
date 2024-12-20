import React, { useState, useEffect, useContext } from 'react';
import { Button, Menu } from 'react-daisyui';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';
import DarkModeToggle from '../orther/darkmode/DarkMode';
import { Logo } from '../../assets/images';
import { PhoneContext } from '../../context/phone/PhoneContext';
import { FaList, FaWindows } from 'react-icons/fa6';
import { BsApple } from 'react-icons/bs';
import { PostContext } from '../../context/post/PostContext';
import { BsFilePost } from 'react-icons/bs';
import { AiOutlineMenuFold } from "react-icons/ai";

const SidebarAdmin: React.FC<{}> = () => {
  const { phones } = useContext(PhoneContext);
  const { posts } = useContext(PostContext);
  const [activeItem, setActiveItem] = useState('Dashboard');

  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      icon: FaHome,
      link: '/admin'
    },
    {
      name: 'Danh Mục Sản Phẩm',
      icon: FaList,
      link: '/admin/product-catalog',
      toastify: phones.length
    },
    {
      name: 'Điện Thoại',
      icon: FaMobileAlt,
      link: '/admin/phone-manager',
      toastify: phones.length
    },
    {
      name: 'Ipad',
      icon: FaTabletAlt,
      link: '/admin/ipad-manager',
      toastify: phones.length
    },
    {
      name: 'Window',
      icon: FaWindows,
      link: '/admin/window-manager',
      toastify: phones.length
    },
    {
      name: 'Macbook',
      icon: BsApple,
      link: '/admin/macbook-manager',
      toastify: phones.length
    },
    {
      name: 'Danh mục bài viết',
      icon: AiOutlineMenuFold,
      link: '/admin/post-catalog',
      toastify: posts.length
    },
    {
      name: 'Quản lý bài viết',
      icon: BsFilePost,
      link: '/admin/post-manager',
      toastify: posts.length
    }
  ];

  useEffect(() => {
    const pathname = location.pathname;
    const foundItem = menuItems.find(item => pathname === item.link);
    if (foundItem) {
      setActiveItem(foundItem.name);
    }
  }, [location.pathname, menuItems]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-10 bg-white dark:bg-gray-800 xl:fixed xl:h-full xl:w-64 xl:shadow-lg">
      <div className="w-full">
        {/*  */}
        <div className="mt-8 flex w-full items-center justify-between p-2">
          <Link to="/">
            <div className="flex items-center gap-2">
              <img
                width={60}
                height={60}
                src={Logo}
                className="rounded-full shadow-headerMenu shadow-primary dark:hidden"
                alt="7Teck ."
              />
              <img
                width={60}
                height={60}
                src={Logo}
                className="hidden rounded-xl dark:block"
                alt="7Teck ."
              />
              <div className="">
                <p className="text-base font-bold text-primary dark:text-white">
                  7Teck
                </p>
                <p className="text-[.8rem] font-light dark:text-white">
                  Product Management
                </p>
              </div>
            </div>
          </Link>
          <div className="">
            <DarkModeToggle />
          </div>
        </div>
        {/*  */}
        <div className="relative flex w-full flex-col justify-between bg-white dark:bg-gray-800 dark:text-white">
          <div className="mb-2 mt-5 h-[250px] overflow-y-scroll scrollbar-hide md:h-[400px]">
            <Menu className="flex-grow">
              {menuItems.map(item => {
                const Icon = item.icon;
                return (
                  <Menu.Item key={item.name} className="relative">
                    <NavLink
                      to={item.link}
                      className={`btn flex w-full items-center justify-start border-none shadow-white dark:bg-gray-800 dark:shadow-none ${
                        item.name === activeItem
                          ? 'bg-base-200 font-bold text-primary dark:bg-white'
                          : 'bg-transparent bg-white font-light text-black dark:text-white'
                      } relative pl-4`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          {item.name === activeItem && (
                            <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
                          )}
                          <Icon
                            className={
                              item.name === activeItem
                                ? 'mr-2 h-5 w-5 text-primary'
                                : 'mr-2 h-5 w-5'
                            }
                          />
                          <div className="flex items-center justify-between gap-2">
                            <div className="">
                              <p>{item.name}</p>
                            </div>
                          </div>
                        </div>
                        <div className="">
                          {item.toastify ? (
                            <div className="flex w-[22px] justify-center rounded-md bg-green-500 py-1">
                              <p className="text-[.8rem] font-light text-white">
                                {item.toastify > 99 ? '99+' : item.toastify}
                              </p>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </NavLink>
                  </Menu.Item>
                );
              })}
            </Menu>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="flex flex-col items-center">
        <Link to="/admin/product-catalog">
          <div className="rounded-lg bg-primary p-4 text-center text-white">
            <p className="w-40 text-center text-xs">
              Chọn nút bên dưới để thêm sản phẩm!
            </p>
            <Button className="my-4 rounded-lg bg-white text-primary hover:bg-white">
              +Thêm Danh Mục
            </Button>
          </div>
        </Link>
        <div className="py-4 text-xs text-black dark:text-white">
          <p className="font-bold">Quản trị 7Teck </p>
          <p className="font-light">© 2024 đã đăng ký bản quyền</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
