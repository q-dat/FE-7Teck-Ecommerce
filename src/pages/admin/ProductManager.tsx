import React, { useState, useEffect, useContext } from 'react';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { RiAddBoxLine } from 'react-icons/ri';
import { Button, Table } from 'react-daisyui';
import { MdDelete } from 'react-icons/md';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { isIErrorResponse } from '../../types/error/error';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import { ProductContext } from '../../context/ProductContext';
import ModalCreateProductPageAdmin from '../../components/admin/Modal/ModalProduct/ModalCreateProductPageAdmin';
import { IProduct } from '../../types/type/product/product';
import ModalDeleteProductPageAdmin from '../../components/admin/Modal/ModalProduct/ModalDeleteProductPageAdmin';
import ModalEditProductPageAdmin from '../../components/admin/Modal/ModalProduct/ModalEditProductPageAdmin';

const ProductManager: React.FC = () => {
  const { loading, products, deleteProduct, getAllProducts, error } =
    useContext(ProductContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedProductId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedProductId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const handleDeleteProduct = async () => {
    if (selectedProductId) {
      try {
        await deleteProduct(selectedProductId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá độ tuổi thành công', 201);
        getAllProducts();
      } catch {
        const errorMessProduct = isIErrorResponse(error)
          ? error.data?.message
          : 'Xoá độ tuổi thất bại!';
        Toastify(`Lỗi: ${errorMessProduct}`, 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Độ Tuổi" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Độ Tuổi"
          Btn_Create={
            <div className="flex flex-col items-start justify-center gap-2 md:flex-row md:items-end">
              <Button
                color="success"
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
        Title_TableListAdmin={`Danh Sách Độ Tuổi (${products.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Tên Sản Phẩm</span>
            <span>Danh Mục</span>
            <span>Hình Ảnh</span>
            <span>Thumbnail</span>
            <span>Giá</span>
            <span>Số Lượng</span>
            <span>Trạng Thái</span>
            <span>Mô Tả</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {products.map((product: IProduct, index: number) => (
              <Table.Row key={index}>
                <span>#{index + 1}</span>
                <span>{product.name}</span>
                <span>{product.product_catalog_id}</span>
                <span>
                  <img
                    src={product.img}
                    alt="Product Image"
                    className="h-10 w-10"
                  />
                </span>
                <span>
                  {product.thumbnail && (
                    <img
                      src={product.thumbnail}
                      alt="Thumbnail"
                      className="h-10 w-10"
                    />
                  )}
                </span>
                <span>
                  {(product.price * 1000).toLocaleString('vi-VN')} VND
                </span>
                <span>{product.quantity ?? 'N/A'}</span>
                <span>{product.status}</span>
                <span>{product.des || 'Không có mô tả!'}</span>
                <span>
                  <details>
                    <summary className="inline cursor-pointer text-base text-warning">
                      <div className="flex items-center justify-center px-[55px] py-2">
                        <FaCircleInfo />
                      </div>
                    </summary>
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Button
                        color="success"
                        onClick={() => openModalEditAdmin(product._id ?? '')}
                        className="w-full max-w-[140px] text-sm font-light text-white"
                      >
                        <FaPenToSquare />
                        Cập Nhật
                      </Button>
                      <Button
                        onClick={() => openModalDeleteAdmin(product._id ?? '')}
                        className="w-full max-w-[140px] bg-red-600 text-sm font-light text-white"
                      >
                        <MdDelete />
                        Xoá
                      </Button>
                    </div>
                  </details>
                </span>
              </Table.Row>
            ))}
          </Table.Body>
        }
      />
      <ModalCreateProductPageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeleteProductPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeleteProduct}
      />
      <ModalEditProductPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        ProductId={selectedProductId ?? ''}
      />
    </div>
  );
};

export default ProductManager;
