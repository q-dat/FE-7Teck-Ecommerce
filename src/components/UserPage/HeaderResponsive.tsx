import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Button, Drawer, Input, Menu } from 'react-daisyui';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaChevronDown, FaMagic } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { Logo } from '../../assets/images';
import { RiPagesLine } from 'react-icons/ri';
import { SlClose } from 'react-icons/sl';
import { IoSearch } from 'react-icons/io5';
// import { IoSettingsSharp } from 'react-icons/io5';

interface HeaderResponsiveProps {
  Title_NavbarMobile: ReactNode;
}
interface MenuItem {
  name: string;
  icon?: IconType;
  link: string;
  submenu?: { name: string; link: string; icon?: IconType }[];
}

const HeaderResponsive: React.FC<HeaderResponsiveProps> = ({
  Title_NavbarMobile
}) => {
  // const [leftVisible, setLeftVisible] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [rightVisible, setRightVisible] = useState(false);

  // Naviga Active
  const [activeItem, setActiveItem] = useState('Trang Chủ');
  const location = useLocation();
  //
  const [showMenu, setShowMenu] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const menuItems: MenuItem[] = [
    {
      name: 'Trang Chủ',
      icon: FaHome,
      link: '/'
    },
    {
      name: 'iPhone',
      link: '/phone-list'
    },
    {
      name: 'iPad',
      link: '/ipad-list'
    },
    {
      name: 'Window',
      link: '/window-list'
    },
    {
      name: 'Macbook',
      link: '/macbook-list'
    },
    {
      name: 'Bảng Giá Thu Mua',
      link: '/price-list'
    },
    {
      name: 'Tin tức',
      link: '',
      submenu: [
        {
          name: 'Bản tin nổi bật',
          icon: RiPagesLine,
          link: '/news'
        },
        {
          name: 'Thủ thuật - Mẹo',
          icon: FaMagic,
          link: '/tips-and-tricks'
        }
      ]
    },
    {
      name: 'Album',
      link: '/album'
    },
    {
      name: 'Liên Hệ',
      link: '/contact'
    }
  ];
  //
  useEffect(() => {
    const pathname = location.pathname;
    const foundItem = menuItems.find(
      item =>
        item.link === pathname ||
        item.submenu?.some(sub => sub.link === pathname)
    );
    if (foundItem) {
      setActiveItem(foundItem.name);
    }
  }, [location.pathname, menuItems]);
  //
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleMenuClick = (name: string) => {
    setOpenSubmenu(prev => (prev === name ? null : name));
  };

  // const toggleLeftVisible = useCallback(() => {
  //   setLeftVisible(visible => !visible);
  // }, []);

  const toggleRightVisible = useCallback(() => {
    setRightVisible(visible => !visible);
  }, []);

  return (
    <div className="fixed z-[99999] block w-full bg-gradient-to-b from-white to-primary xl:hidden">
      {/* Menu 1 */}
      <div
        className={`flex h-[40px] w-full transform flex-row items-center justify-between border-b bg-primary px-2 text-white transition-transform duration-300 ease-in-out ${showMenu ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="flex w-full flex-row items-center justify-center gap-1">
          <IoSearch className="animate-bounce text-xl" />
          <Input
            className="text-md w-full border-none bg-transparent pl-1 placeholder-white shadow-none focus:placeholder-black focus:outline-none"
            placeholder="Bạn muốn tìm gì..."
          ></Input>
        </div>
        {/*  */}
      </div>

      <div
        className={`fixed h-[60px] w-full bg-gradient-to-r from-primary via-primary to-primary px-2 transition-all delay-200 duration-300 ease-in-out ${showMenu ? 'top-[40px]' : 'top-0'}`}
      >
        <div className="flex flex-row items-center justify-between">
          {/* <div className="z-50">
            <Drawer
              open={leftVisible}
              onClickOverlay={toggleLeftVisible}
              side={
                <Menu className="fixed h-full w-[280px] bg-white ">
                  {/* LOGO */}
          {/* <div className="flex items-center justify-center">
                    <img
                      className="mb-5 rounded-full object-cover"
                      width={120}
                      loading="lazy"
                      src={Logo}
                      alt="LOGO"
                    />
                  </div>
                  <div className="w-full space-y-5">
                    <div className="flex flex-row items-center justify-between rounded-md bg-gray-700 bg-opacity-20 p-2">
                      <p className="text-lg font-light text-black ">
                        Giao Diện
                      </p>
                    </div>
                  </div>
                </Menu>
              }
            > */}
          {/*  */}
          {/*  */}
          {/* <div
                onClick={toggleLeftVisible}
                className="flex flex-row items-center justify-center gap-2 py-4 text-2xl text-black  xl:hidden"
              >
                <div className="rounded-md p-1 text-[20px] text-white">
                  <IoSettingsSharp />
                </div>
              </div>
            </Drawer>
          </div> */}
          {/* Title */}
          {/*  */}
          {/*  */}
          <Link to="/">
            <FaHome className="text-2xl text-white" />
          </Link>
          <p className="font-bold uppercase text-white">{Title_NavbarMobile}</p>
          {/* RightVisible */}
          <div className="z-50">
            <Drawer
              open={rightVisible}
              onClickOverlay={toggleRightVisible}
              side={
                <Menu className="fixed h-full w-[280px] bg-white">
                  {/* LOGO */}
                  <div>
                    <img
                      className="rounded-full border object-cover"
                      width={120}
                      loading="lazy"
                      src={Logo}
                      alt="LOGO"
                    />
                  </div>
                  {/* Menu */}
                  {menuItems.map(item => {
                    const Icon = item.icon;
                    return (
                      <div key={item.name} className="relative">
                        <Menu.Item
                          className="group relative"
                          onClick={() =>
                            item.submenu && handleMenuClick(item.name)
                          }
                        >
                          <NavLink
                            to={item.link}
                            className={`btn relative mt-2 flex w-full flex-row items-center justify-between rounded-none border-none pl-4 pr-3 ${
                              item.name === activeItem
                                ? 'bg-primary bg-opacity-30 text-sm font-bold text-primary'
                                : 'border-none bg-primary bg-opacity-10 text-sm font-light text-black shadow-headerMenu'
                            } `}
                          >
                            <>
                              {item.name === activeItem && (
                                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-primary" />
                              )}
                              {Icon && (
                                <div
                                  className={
                                    item.name === activeItem
                                      ? 'h-5 w-5 text-2xl text-primary'
                                      : 'h-5 w-5'
                                  }
                                >
                                  <Icon />
                                </div>
                              )}
                              <span className={Icon ? '' : ''}>
                                {item.name}
                              </span>
                              {item.submenu && (
                                <div
                                  className={`ml-2 h-4 w-4 ${openSubmenu === item.name ? 'rotate-180' : ''}`}
                                >
                                  <FaChevronDown />
                                </div>
                              )}
                            </>
                          </NavLink>
                        </Menu.Item>
                        {/* SubMenu */}
                        {item.submenu && openSubmenu === item.name && (
                          <div className="relative w-full transform space-y-2 rounded-sm bg-white p-1 shadow-md transition-transform duration-300 ease-in-out">
                            {item.submenu.map((subItem, index) => (
                              <Link
                                key={index}
                                to={subItem.link}
                                className="block"
                              >
                                <Button
                                  size="sm"
                                  className="flex w-full flex-row items-center justify-start rounded-sm border-none bg-primary text-sm uppercase text-white shadow-headerMenu"
                                >
                                  {subItem.icon && <subItem.icon />}
                                  {subItem.name}
                                </Button>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </Menu>
              }
            >
              {/*  */}
              {/*  */}
              <div
                onClick={toggleRightVisible}
                className="flex flex-row items-center justify-center gap-2 py-4 text-2xl xl:hidden"
              >
                <div
                  className={`transform rounded-md text-[25px] text-white transition-transform duration-300 ease-in-out ${
                    rightVisible ? 'rotate-180 animate-ping' : 'rotate-0'
                  }`}
                >
                  {rightVisible ? <SlClose /> : <RxHamburgerMenu />}
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
      {/* Input Search */}
      {/* <div className="relative flex items-center">
        <Input
          className="w-full text-black focus:outline-none"
          type="text"
        />
        <div className="absolute right-2 h-5 w-5 cursor-pointer text-gray-50">
          <IoSearchOutline />
        </div>
      </div> */}
    </div>
  );
};

export default HeaderResponsive;
