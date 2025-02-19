import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import { Link, useParams } from 'react-router-dom';

import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { Button } from 'react-daisyui';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { PhoneContext } from '../../../context/phone/PhoneContext';
import { phoneFieldMap } from '../../../types/type/optionsData/phoneFieldMap';

const PhoneDetailPage: React.FC = () => {
  const { id } = useParams();
  const { getPhoneById, phones } = useContext(PhoneContext);
  const [phone, setPhone] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null | undefined>(
    null
  );
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>('specs');

  //
  useLayoutEffect(() => {
    updateScrollButtons();
  }, [phone, phone?.thumbnail]);
  //
  const updateScrollButtons = () => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      setIsLeftVisible(scrollLeft > 0);
      setIsRightVisible(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += offset;
    }
  };

  useEffect(() => {
    // Scroll To Top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Fetch Data By Id
    if (id) {
      getPhoneById(id)
        .then(fetchedPhone => {
          if (fetchedPhone) {
            setPhone(fetchedPhone);
            setSelectedImage(fetchedPhone.img);
          }
        })
        .catch(error =>
          console.error('Lỗi khi lấy dữ liệu điện thoại:', error)
        );
    }

    if (phones.length > 0) updateScrollButtons();

    const handleResize = () => updateScrollButtons();
    const scrollContainer = scrollRef.current;

    window.addEventListener('resize', handleResize);
    scrollContainer?.addEventListener('scroll', updateScrollButtons);

    return () => {
      window.removeEventListener('resize', handleResize);
      scrollContainer?.removeEventListener('scroll', updateScrollButtons);
    };
  }, [phones, phone, id, getPhoneById]);
  //
  const handleThumbnailClick = (thumb: string, index: number) => {
    setSelectedImage(thumb);
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const thumbnailElement = scrollContainer.children[index] as HTMLElement;
      if (thumbnailElement) {
        const containerWidth = scrollContainer.offsetWidth;
        const elementOffsetLeft = thumbnailElement.offsetLeft;
        const elementWidth = thumbnailElement.offsetWidth;

        // Tính toán vị trí cần scroll sao cho ảnh nằm ở giữa
        const scrollPosition =
          elementOffsetLeft - (containerWidth - elementWidth) / 2;
        scrollContainer.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="iPhone" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow xl:px-20">
          <ul className="font-light">
            <li>
              <Link role="navigation" aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link role="navigation" aria-label="Thông tin sản phẩm" to="">
                Thông Tin Sản Phẩm
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-2 px-2 xl:px-[150px]">
          <div className="flex flex-col items-start justify-start gap-5 xl:flex-row">
            {/* IMG */}
            <div className="flex w-full flex-col gap-5">
              <div className="relative w-full">
                <div className="h-[500px] w-full overflow-hidden object-cover">
                  <img
                    loading="lazy"
                    src={selectedImage || phone?.img}
                    alt={phone?.name || 'Hình ảnh'}
                    className="absolute left-0 top-0 z-0 h-full w-full rounded-md object-cover blur-xl filter"
                  />
                  <Zoom>
                    <img
                      loading="lazy"
                      src={selectedImage || phone?.img}
                      alt={phone?.name || 'Hình ảnh'}
                      className="absolute left-0 top-0 z-10 h-full w-full rounded-md object-contain"
                    />
                  </Zoom>
                </div>
              </div>
              {/* Thumbnails */}
              <div className="relative rounded-md p-1">
                <div
                  ref={scrollRef}
                  className="flex w-full flex-row items-start justify-start gap-2 overflow-x-auto scroll-smooth scrollbar-hide xl:w-[550px]"
                >
                  {phone?.thumbnail && Array.isArray(phone?.thumbnail) ? (
                    phone?.thumbnail.map((thumb: string, index: number) => (
                      <img
                        loading="lazy"
                        key={index}
                        src={thumb}
                        alt="Ảnh thu nhỏ"
                        className="h-[70px] w-[70px] cursor-pointer rounded-md border object-cover"
                        onClick={() => handleThumbnailClick(thumb, index)}
                      />
                    ))
                  ) : (
                    <span>Không có ảnh thu nhỏ</span>
                  )}
                </div>
                {/* Navigation Button  */}
                <div
                  role="button"
                  className="absolute left-0 top-4 flex w-full items-center justify-between"
                >
                  <div className="relative w-full">
                    <button
                      aria-label="Cuộn sang trái"
                      onClick={() => scrollBy(-70)}
                      className={`absolute -left-1 z-[100] rounded-xl bg-black bg-opacity-20 py-2 text-white xl:-left-2 ${isLeftVisible ? '' : 'hidden'}`}
                    >
                      <MdArrowBackIosNew className="text-2xl" />
                    </button>
                    <button
                      aria-label="Cuộn sang phải"
                      onClick={() => scrollBy(70)}
                      className={`absolute -right-1 z-[100] rounded-xl bg-black bg-opacity-20 py-2 text-white xl:-right-2 ${isRightVisible ? '' : 'hidden'}`}
                    >
                      <MdArrowForwardIos className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="flex w-full flex-col gap-5">
              {/* Info */}
              <div className="flex h-full flex-col items-start justify-between gap-5 rounded-md border border-gray-50 bg-white p-2 leading-10 xl:h-[490px]">
                <div className="w-full">
                  <h1 className="text-xl font-semibold text-black">
                    Điện thoại {phone?.name}
                  </h1>
                  <p className="text-3xl font-semibold text-red-500">
                    <span>
                      {(phone?.price * 1000).toLocaleString('vi-VN')}₫
                    </span>
                    <del className="text-sm font-light text-gray-100">
                      {phone?.sale &&
                        (phone?.sale * 1000).toLocaleString('vi-VN')}
                      ₫
                    </del>
                  </p>
                  {phone?.color && (
                    <p className="space-x-1 text-gray-500">
                      <span>Màu sắc:</span>
                      <strong className="text-black">{phone?.color}</strong>
                    </p>
                  )}
                  {phone?.status && (
                    <p className="space-x-1 text-gray-500">
                      <span>Tình trạng:</span>
                      <strong className="text-black">{phone?.status}</strong>
                    </p>
                  )}
                  {phone?.des && (
                    <p className="text-lg text-blue-500">
                      <span>{phone?.des}</span>
                    </p>
                  )}
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-1">
                  <Link to="/thanh-toan">
                    <Button
                      size="sm"
                      className="w-[300px] rounded-md border-none bg-primary text-white hover:bg-primary hover:bg-opacity-60 xl:w-[400px]"
                    >
                      Mua ngay
                    </Button>
                  </Link>
                  <i className="w-full text-start text-sm font-light text-secondary">
                    *Nhấn "Mua ngay" để xác nhận sản phẩm bạn muốn mua!
                  </i>
                </div>
              </div>
              {/* Note */}
              <div className="h-[80px] w-full rounded-md border border-gray-50 bg-white p-2">
                <p className="text-center text-2xl font-light xl:text-3xl">
                  Hỗ trợ khách hàng:
                  <Link
                    role="navigation"
                    aria-label="Hotline"
                    to="tel:0983699993"
                  >
                    <span className="font-bold text-secondary">
                      &nbsp; 0983.699.993
                    </span>
                  </Link>
                </p>
                <i className="text-sm font-light text-secondary">
                  *Nhấn vào hotline để gọi ngay!
                </i>
              </div>
            </div>
          </div>
          {/* Tab */}
          <div className="w-full">
            <div className="mt-5 flex flex-row items-center justify-center rounded-md border-b-2 border-primary uppercase">
              <div
                className={`w-full cursor-pointer rounded-l-md py-2 text-center font-light transition-all duration-500 ease-in-out ${activeTab === 'specs' ? 'bg-primary font-semibold text-white' : 'bg-white text-primary'}`}
                onClick={() => setActiveTab('specs')}
              >
                <p>Thông số kĩ thuật</p>
              </div>
              <div
                className={`w-full cursor-pointer rounded-r-md py-2 text-center font-light transition-all duration-500 ease-in-out ${activeTab === 'details' ? 'bg-primary font-semibold text-white' : 'bg-white text-primary'}`}
                onClick={() => setActiveTab('details')}
              >
                <p>Thông tin sản phẩm</p>
              </div>
            </div>
            {/*  */}
            <div className="w-full">
              {/* Details */}
              {activeTab === 'specs' && (
                <div className="mt-5 divide-y-[1px] divide-primary divide-opacity-20 rounded-md border border-primary bg-white leading-10 text-black">
                  <h1 className="rounded-sm rounded-b-none bg-primary p-2 text-center text-lg font-light uppercase text-white">
                    Các thông số chi tiết
                  </h1>
                  {phoneFieldMap.map(group => (
                    <div key={group?.group}>
                      <details className="group transform divide-y-[1px] bg-primary bg-opacity-5">
                        <summary className="flex cursor-pointer items-center justify-between p-2">
                          <span className="font-semibold text-primary">
                            {group?.name}
                          </span>
                          <span className="transform text-primary transition-transform duration-300 ease-in-out group-open:rotate-180">
                            <IoIosArrowDropdownCircle className="text-2xl" />
                          </span>
                        </summary>
                        {group?.fields
                          .filter(
                            field =>
                              phone?.phone_catalog_id?.[group?.group]?.[
                                field?.field
                              ]
                          )
                          .map(field => {
                            const fieldValue =
                              phone?.phone_catalog_id?.[group?.group]?.[
                                field?.field
                              ];
                            return (
                              <div
                                className="flex w-full flex-row items-start justify-between rounded-md bg-white p-2"
                                key={field?.field}
                              >
                                <p>{field?.name}</p>
                                <p className="font-light italic text-gray-700">
                                  {Array.isArray(fieldValue) ? (
                                    <span>{fieldValue.join(',')}</span>
                                  ) : (
                                    fieldValue
                                  )}
                                </p>
                              </div>
                            );
                          })}
                      </details>
                    </div>
                  ))}
                </div>
              )}
              {/* Detailed description */}
              {activeTab === 'details' && (
                <p
                  className="mt-5"
                  dangerouslySetInnerHTML={{
                    __html: phone?.phone_catalog_id?.content
                  }}
                ></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDetailPage;
