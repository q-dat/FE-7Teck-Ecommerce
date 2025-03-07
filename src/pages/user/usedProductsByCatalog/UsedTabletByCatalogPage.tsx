import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { Sale } from '../../../assets/image-represent';
import { Button } from 'react-daisyui';
import { FaRegEye } from 'react-icons/fa';
import { Placeholder } from 'semantic-ui-react';
import { TabletContext } from '../../../context/tablet/TabletContext';

const UsedTabletByCatalogPage = () => {
  const { tablets, updateTabletView } = useContext(TabletContext);
  const [loading, setLoading] = useState(true);
  const { catalog } = useParams();
  const slugify = (text: string) => {
    return text
      .toString()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  const filteredPhones = tablets.filter(
    tablet => slugify(tablet?.tablet_name) === catalog
  );
  useEffect(() => {
    if (tablets.length > 0) {
      setLoading(false);
    }
    // Scroll To Top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [tablets, filteredPhones]);

  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Điện Thoại" />
      <div className="py-[60px] xl:pt-0">
        <div className="xl:px-desktop-padding breadcrumbs px-[10px] py-2 text-sm text-black shadow">
          <ul className="font-light">
            <li>
              <Link role="navigation" aria-label="Trang chủ" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link role="navigation" aria-label="Điện thoại" to="">
                Danh mục iPhone
              </Link>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="xl:px-desktop-padding space-y-10 px-2">
          <div className="mt-5 w-full">
            <div className="grid grid-flow-row grid-cols-2 items-start gap-[10px] md:grid-cols-4 xl:grid-cols-6">
              {loading ? (
                Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="w-[195px] p-2">
                    <Placeholder>
                      <Placeholder.Image square />
                      <Placeholder.Line />
                      <Placeholder.Line length="full" />
                      <Placeholder.Line length="full" />
                    </Placeholder>
                  </div>
                ))
              ) : filteredPhones.length > 0 ? (
                filteredPhones.map(tablet => {
                  const tabletUrl = slugify(tablet.tablet_name);
                  return (
                    <section
                      onClick={() => updateTabletView(tablet._id)}
                      key={tablet?._id}
                      className="group relative flex h-full flex-col justify-between rounded-md border border-white text-black"
                    >
                      <Link
                        role="navigation"
                        aria-label="Chi tiết sản phẩm"
                        className="flex h-full w-full items-center justify-center rounded-md rounded-b-none bg-white"
                        to={`/tablet-da-qua-su-dung/${tabletUrl}/${tablet?._id}`}
                      >
                        <div className="relative h-[200px] w-full overflow-hidden">
                          <img
                            alt="Hình ảnh"
                            loading="lazy"
                            className="absolute left-0 top-0 z-0 h-full w-full rounded-[5px] rounded-b-none object-cover blur-sm filter"
                            src={tablet?.tablet_img}
                          />
                          <img
                            alt="Hình ảnh"
                            loading="lazy"
                            className="absolute left-0 top-0 z-10 h-full w-full rounded-[5px] rounded-b-none object-contain transition-transform duration-1000 ease-in-out hover:scale-110"
                            src={tablet?.tablet_img}
                          />
                        </div>
                      </Link>
                      {/*  */}
                      <div className="flex flex-col items-start justify-center gap-1 p-1">
                        <Link
                          to={`/itablet-da-qua-su-dung/${tabletUrl}/${tablet?._id}`}
                        >
                          <div className="flex w-[50px] items-center justify-start gap-1 rounded-sm p-[2px] text-center text-[12px] text-black">
                            <FaRegEye />
                            <p>{tablet.tablet_view}</p>
                          </div>
                          <p className="xl:group-hover:text-secondary">
                            Điện Thoại {tablet?.tablet_name}
                          </p>
                          <p className="text-red-700">
                            {(tablet?.tablet_price * 1000).toLocaleString(
                              'vi-VN'
                            )}
                            ₫ &nbsp;
                            <del className="text-xs font-light text-gray-400">
                              {tablet?.tablet_sale &&
                                (tablet?.tablet_sale * 1000).toLocaleString(
                                  'vi-VN'
                                )}
                              ₫
                            </del>
                          </p>
                        </Link>
                        <Link
                          role="navigation"
                          aria-label="Mua ngay"
                          to="/thanh-toan"
                          className="z-50 w-full"
                        >
                          <Button
                            size="xs"
                            className="w-full rounded-md border-none bg-primary bg-opacity-10 text-primary hover:bg-primary hover:bg-opacity-20"
                          >
                            Mua Ngay
                          </Button>
                        </Link>
                      </div>
                      {/*  */}
                      {tablet?.tablet_status && (
                        <div className="absolute -left-[3px] top-0 z-20">
                          <img alt="" loading="lazy" width={60} src={Sale} />
                          <p className="absolute top-[1px] w-full pl-1 text-xs text-white">
                            {tablet?.tablet_status}
                          </p>
                        </div>
                      )}
                    </section>
                  );
                })
              ) : (
                <div className="col-span-full text-center text-2xl">
                  Rất tiếc. Không tìm thấy sản phẩm nào!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsedTabletByCatalogPage;
