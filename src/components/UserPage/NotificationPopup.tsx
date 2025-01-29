import React, { useEffect, useState } from 'react';
import { Hero } from 'react-daisyui';
import { MdCancel } from 'react-icons/md';
import { Popup } from '../../assets/images';

const NotificationPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('popupShown')) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    sessionStorage.setItem('popupShown', 'true');
  };
  return (
    <div>
      {isVisible && (
        <div>
          <section
            className="fixed left-0 top-0 z-50 h-full w-full cursor-pointer bg-black bg-opacity-60"
            onClick={closePopup}
          ></section>
          <div className="fixed left-1/2 top-1/2 z-50 w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-lg xl:w-[500px]">
            <Hero>
              <Hero.Content className="m-0 p-0">
                <div className="relative w-full">
                  <div
                    className="absolute right-1 top-1 flex flex-col items-end justify-center"
                    onClick={closePopup}
                  >
                    <MdCancel className="cursor-pointer rounded-full bg-white text-2xl text-black xl:text-3xl" />
                  </div>
                  <img
                    className="h-full w-full rounded-lg object-cover"
                    src={Popup}
                    alt="Greeting"
                  />
                </div>
              </Hero.Content>
            </Hero>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;
