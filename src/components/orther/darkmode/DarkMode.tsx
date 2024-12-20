import React, { useState, useEffect } from 'react';
import { Button } from 'react-daisyui';
import { IoCloudyNightSharp } from 'react-icons/io5';
import { MdLightMode } from 'react-icons/md';

const DarkMode: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Button
      size="md"
      onClick={toggleDarkMode}
      className="flex cursor-pointer flex-row items-center justify-center rounded-md border-none bg-white bg-opacity-20 text-black shadow-headerMenu dark:bg-white dark:bg-opacity-20 dark:text-white"
    >
      <div className="cursor-pointer rounded-md">
        {darkMode ? (
          <div className="text-xl text-orange-400">
            <MdLightMode />
          </div>
        ) : (
          <div className="text-xl text-black">
            <IoCloudyNightSharp />
          </div>
        )}
      </div>
    </Button>
  );
};

export default DarkMode;
