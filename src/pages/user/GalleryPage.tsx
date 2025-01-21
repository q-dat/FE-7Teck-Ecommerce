import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { GalleryContext } from '../../context/gallery/GalleryContext';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Pagination from '../../components/UserPage/Pagination';

const GalleryPage: React.FC = () => {
  const { gallerys } = useContext(GalleryContext);
  const [currentPage, setCurrentPage] = useState(1);

  // Panigation
  const itemsPerPage = 12;

  const totalPages = Math.ceil(gallerys.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGallerys = gallerys.slice(indexOfFirstItem, indexOfLastItem);

  // Cuộn lên top khi currentPage thay đổi
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Hành Trình" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow dark:text-white xl:px-20">
          <ul className="font-light">
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="">Dấu Ấn Khách Hàng</Link>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="py-5 text-center text-[30px] font-bold text-primary">
          Hành Trình Dấu Ấn Của Khách Hàng
        </div>
        <div className="grid grid-flow-row grid-cols-2 gap-2 px-2 md:grid-cols-3 xl:grid-cols-6 xl:px-20">
          {currentGallerys.map(gallery => (
            <Zoom>
              <div className="w-full">
                <img
                  src={`${gallery.gallery}`}
                  className="h-full w-full rounded-md object-cover shadow"
                />
              </div>
            </Zoom>
          ))}
        </div>
        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      </div>
    </div>
  );
};

export default GalleryPage;

