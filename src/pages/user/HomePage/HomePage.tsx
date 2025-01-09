import React, { useContext, useEffect, useState } from 'react';
import {
  TbDeviceMobileCog,
  TbDeviceMobileDollar,
  TbDeviceMobileSearch,
  TbDeviceMobileUp,
  TbTruckDelivery
} from 'react-icons/tb';
import {
  BannerDesktop,
  BannerTablet,
  BannerMobile
} from '../../../assets/images';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import PhoneFC from './PhoneFC';
import IPadFC from './IPadFC';
import WindowFC from './WindowFC';
import MacbookFC from './MacbookFC';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';
import { PostContext } from '../../../context/post/PostContext';
import { IoIosArrowDropdownCircle } from 'react-icons/io';

// Items Data
const items = [
  {
    icon: <TbDeviceMobileSearch />,
    text: (
      <>
        Đổi trả <br />
        Bao test 7 ngày.
      </>
    )
  },
  {
    icon: <TbDeviceMobileDollar />,
    text: (
      <>
        Hỗ trợ trả góp <br />
        qua thẻ tín dụng.
      </>
    )
  },
  {
    icon: <TbDeviceMobileUp />,
    text: (
      <>
        Thu cũ đổi mới <br />
        hỗ trợ giá lên đời.
      </>
    )
  },
  {
    icon: <TbDeviceMobileCog />,
    text: (
      <>
        Bảo hành
        <br /> 3 tháng/ 6 tháng/ 1 năm.
      </>
    )
  },
  {
    icon: <TbTruckDelivery />,
    text: (
      <>
        FreeShip nội thành HCM <br />
        và các tỉnh thành lân cận.
      </>
    )
  }
];

const HomePage: React.FC = () => {
  const { posts, getAllPosts } = useContext(PostContext);
  const [selectedPost, setSelectedPost] = useState<(typeof posts)[0] | null>(
    null
  );
  const navigate = useNavigate();
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  useEffect(() => {
    if (posts.length > 0 && !selectedPost) {
      setSelectedPost(posts[0]);
    }
  }, [posts, selectedPost]);

  const handlePostClick = (post: (typeof posts)[0]) => {
    const titleSlug = encodeURIComponent(
      post.title.toLowerCase().replace(/\s+/g, '-')
    );
    navigate(`/post-detail/${titleSlug}`);
  };
  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
      <div className="pt-[100px] xl:pt-0">
        {/* Banner */}
        <div className="relative">
          <div className="absolute bottom-0 left-2 top-[60%] md:bottom-4 md:left-[10%] md:top-[30%] lg:top-[30%]">
            <p className="bg-gradient-to-r from-primary to-white bg-clip-text text-[25px] font-black italic text-transparent xl:text-[40px]">
              Đổi Điện Thoại Cũ, <br /> Nhận Ngay Giá Tốt Nhất!
            </p>
            <p className="bg-gradient-to-r from-white to-white bg-clip-text text-[15px] font-thin text-transparent">
              up to 90%
            </p>
          </div>
          {/* Banner IMG */}
          <div>
            <img
              src={BannerDesktop}
              className="hidden w-full xl:block"
              alt="BannerDesktop"
            />
            <img
              src={BannerTablet}
              className="hidden w-full md:block xl:hidden"
              alt="BannerTablet"
            />
            <img
              src={BannerMobile}
              className="w-full md:hidden"
              alt="BannerMobile"
            />
          </div>
        </div>

        {/*  Mobile */}
        <div className="block md:hidden">
          <Swiper
            pagination={{ dynamicBullets: true, clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false // Vẫn giữ autoplay sau khi người dùng tương tác
            }}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true
            }}
            modules={[EffectCoverflow, Autoplay]}
            className="mySwiper"
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="text-md my-4 flex flex-col items-center gap-2 text-center font-semibold text-primary">
                  <div className="rounded-full bg-gradient-to-tr from-primary via-primary to-black p-4">
                    <div>
                      {React.cloneElement(item.icon, {
                        className: 'text-[100px] text-white'
                      })}
                    </div>
                  </div>
                  <div>
                    <p>{item.text}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Desktop */}
        <div className="mx-0 my-5 hidden flex-row items-start justify-between gap-2 rounded-2xl py-5 font-sub md:flex xl:mx-[100px]">
          <Swiper
            slidesPerView={4}
            pagination={{ dynamicBullets: true, clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {' '}
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  key={index}
                  className="flex w-full flex-col items-center justify-start gap-4 text-center md:text-xs xl:text-lg"
                >
                  <div className="rounded-full bg-gradient-to-tr from-primary via-primary to-black p-4 text-white">
                    <p>
                      {React.cloneElement(item.icon, {
                        className: 'text-[90px]'
                      })}
                    </p>
                  </div>
                  <div className="text-primary">
                    <p>{item.text}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="space-y-10 p-0 xl:px-[100px]">
          {/* Phone */}
          <PhoneFC />
          {/* Ipad */}
          <IPadFC />
          {/* Window */}
          <WindowFC />
          {/* MacBook */}
          <MacbookFC />
        </div>

        <div className="bg-post mt-10 py-5">
          <p className="mb-2 text-center text-2xl font-semibold uppercase text-primary">
            Bản tin mới nhất
          </p>
          <div className="grid grid-cols-2 gap-2 px-2 md:grid-cols-3 lg:grid-cols-4 xl:px-[100px]">
            {posts.slice(0, 4).map(post => (
              <div
                key={post._id}
                className="relative cursor-pointer rounded bg-white p-2 shadow-inner hover:shadow-lg"
                onClick={() => handlePostClick(post)}
              >
                <p className="absolute left-1 top-1 rounded-sm bg-primary px-2 text-[12px] text-white">
                  {post.catalog}
                </p>
                <img
                  src={post.imageUrl}
                  alt="Ảnh đại diện"
                  className="h-[200px] w-full rounded-sm border border-primary object-cover xl:h-[300px]"
                />
                <p className="line-clamp-2 text-[18px] font-bold text-primary">
                  {post.title}
                </p>
                <hr />
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="line-clamp-5 text-[14px] text-black xl:line-clamp-6"
                ></div>
                <p className="pt-2 text-[12px] text-primary">
                  {new Date(post.updatedAt).toLocaleDateString('vi-VN')}
                </p>
              </div>
            ))}
          </div>
          <Link to="/news">
            <p className="mt-2 flex w-full items-center justify-center gap-1 bg-black bg-opacity-50 text-lg font-light text-white">
              Xem Thêm
              <span>
                <IoIosArrowDropdownCircle />
              </span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
