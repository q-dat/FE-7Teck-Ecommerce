import React, { useContext, useState } from 'react';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { LoadingLocal } from '../../components/orther/loading';
import { Toastify } from '../../helper/Toastify';
import { isIErrorResponse } from '../../types/error/error';
import { Button, Table } from 'react-daisyui';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { RiAddBoxLine } from 'react-icons/ri';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import ModalCreatePhonePageAdmin from '../../components/admin/modalAdmin/ModalPhone/ModalCreatePhonePageAdmin';
import ModalDeletePhonePageAdmin from '../../components/admin/modalAdmin/ModalPhone/ModalDeletePhonePageAdmin';
import ModalEditPhonePageAdmin from '../../components/admin/modalAdmin/ModalPhone/ModalEditPhonePageAdmin';
import { PhoneContext } from '../../context/phone/PhoneContext';
import { IPhone } from '../../types/type/phone/phone';
import TimeAgo from '../../components/orther/timeAgo/TimeAgo';
import NavbarAdmin from '../../components/admin/responsiveUI/mobile/NavbarAdmin';
import Zoom from '../../lib/Zoom';

const PhoneManager: React.FC = () => {
  const { phones, loading, error, getAllPhones, deletePhone } =
    useContext(PhoneContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedPhoneId, setSelectedPhoneId] = useState<string | null>(null);

  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedPhoneId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedPhoneId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  const handleDeletePhone = async () => {
    if (selectedPhoneId) {
      try {
        await deletePhone(selectedPhoneId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá sản phẩm thành công', 201);
        getAllPhones();
      } catch (error) {
        const errorMessage = isIErrorResponse(error)
          ? error.data?.message
          : 'Xoá sản phẩm thất bại!';
        Toastify(`Lỗi: ${errorMessage}`, 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full pb-10 xl:pb-0">
      <NavbarAdmin Title_NavbarAdmin="Điện Thoại" />
      <div className="">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Danh Sách Điện Thoại"
          Btn_Create={
            <div className="flex flex-col items-start justify-center gap-2 md:flex-row md:items-end">
              <Button
                color="primary"
                onClick={openModalCreateAdmin}
                className="w-[100px] text-sm font-light text-white"
              >
                <RiAddBoxLine className="text-xl" color="white" />
                Thêm
              </Button>
            </div>
          }
        />
      </div>

      <TableListAdmin
        Title_TableListAdmin={`Danh Sách Điện Thoại(${phones.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Hình Ảnh</span>
            <span>Ảnh Thu Nhỏ</span>
            <span>Tên Sản Phẩm</span>
            <span>Giá</span>
            <span>Giá Giảm</span>
            <span>Tình Trạng</span>
            <span>Mô Tả</span>
            <span>Ghi Chú</span>
            <span>Ngày Tạo</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {phones && phones.length > 0 ? (
              phones.map((phone: IPhone, index: number) => (
                <Table.Row key={index}>
                  <span>#{index + 1}</span>
                  <span className="flex items-center justify-center">
                    <Zoom>
                      <img
                        loading="lazy"
                        src={phone?.img}
                        alt="Hình ảnh"
                        className="h-12 w-12 object-cover"
                      />
                    </Zoom>
                  </span>
                  <span className="flex flex-wrap items-center justify-center gap-2">
                    {phone?.thumbnail && Array.isArray(phone?.thumbnail) ? (
                      <>
                        {phone.thumbnail.slice(0, 1).map((thumb, index) => (
                          <img
                            loading="lazy"
                            key={index}
                            src={thumb}
                            alt="Ảnh thu nhỏ"
                            className="h-12 w-12 object-cover"
                          />
                        ))}
                        <span className="text-xs text-red-500">
                          (Ảnh thu nhỏ: {phone?.thumbnail?.length})
                        </span>
                      </>
                    ) : (
                      <span>Không có ảnh thu nhỏ</span>
                    )}
                  </span>
                  <span className="">
                    {phone?.name}
                    <hr />
                    <b>
                      {phone?.phone_catalog_id?.status === 0
                        ? 'New'
                        : phone?.phone_catalog_id?.status === 1
                          ? 'Đã sử dụng'
                          : phone?.phone_catalog_id?.status}
                    </b>
                  </span>
                  <span className="rounded-lg border border-red-500 bg-red-500 bg-opacity-20 p-2 font-semibold text-red-500">
                    {(phone.price * 1000).toLocaleString('vi-VN')}đ
                  </span>
                  <>
                    {phone?.sale === null ||
                    phone?.sale === 0 ||
                    phone?.sale === undefined ? (
                      <>Chưa có giá giảm!</>
                    ) : (
                      <span className="rounded-lg border border-red-500 bg-red-500 bg-opacity-20 p-2 font-semibold text-red-500">
                        {(phone?.sale * 1000).toLocaleString('vi-VN')}₫
                      </span>
                    )}
                  </>
                  <span className="line-clamp-3">
                    {phone?.status || 'Không có tình trạng!'}
                  </span>
                  <span className="line-clamp-3">
                    {phone?.des || 'Không có mô tả!'}
                  </span>
                  <mark className="line-clamp-3">
                    {phone?.note || 'Không có ghi chú!'}
                  </mark>
                  <span>
                    {/* {new Date(phone?.createdAt).toLocaleString('vi-VN')} */}
                    <TimeAgo date={phone?.createdAt} />
                  </span>
                  <span>
                    <details>
                      <summary className="inline cursor-pointer text-base text-warning">
                        <div className="flex items-center justify-center px-[55px] py-2">
                          <FaCircleInfo />
                        </div>
                      </summary>
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Button
                          color="success"
                          onClick={() => openModalEditAdmin(phone?._id ?? '')}
                          className="w-full max-w-[140px] text-sm font-light text-white"
                        >
                          <FaPenToSquare />
                          Cập Nhật
                        </Button>
                        <Button
                          onClick={() => openModalDeleteAdmin(phone?._id ?? '')}
                          className="w-full max-w-[140px] bg-red-600 text-sm font-light text-white"
                        >
                          <MdDelete />
                          Xoá
                        </Button>
                      </div>
                    </details>
                  </span>
                </Table.Row>
              ))
            ) : (
              <tr>
                <td colSpan={10}>Không có sản phẩm điện thoại nào!</td>
              </tr>
            )}
          </Table.Body>
        }
      />
      <ModalCreatePhonePageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeletePhonePageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeletePhone}
      />
      <ModalEditPhonePageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        phoneId={selectedPhoneId ?? ''}
      />
    </div>
  );
};

export default PhoneManager;
