import React, { useEffect, useContext, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import Select from 'react-select';
import LabelForm from '../../LabelForm';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { optionsTabletData } from '../../../../types/type/optionsData/optionsTabletData';
import { TabletCatalogContext } from '../../../../context/tablet-catalog/TabletCatalogContext';
import { ITabletCatalog } from '../../../../types/type/tablet-catalog/tablet-catalog';

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link', 'image', 'video'],
    [{ align: [] }],
    ['clean'],
    [{ indent: '-1' }, { indent: '+1' }],
    ['blockquote'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }]
  ]
};
interface ModalEditAdminProps {
  isOpen: boolean;
  onClose: () => void;
  tabletCatalogId: string;
}

const ModalEditTabletCatalogPageAdmin: React.FC<ModalEditAdminProps> = ({
  isOpen,
  onClose,
  tabletCatalogId
}) => {
  const { loading, getAllTabletCatalogs, tabletCatalogs, updateTabletCatalog } =
    useContext(TabletCatalogContext);
  const isLoading = loading.update;
  const { control, register, handleSubmit, reset, setValue, watch } =
    useForm<ITabletCatalog>();
  const [existingImg, setExistingImg] = useState<string | undefined>('');
  const [editorValue, setEditorValue] = useState<string>('');

  useEffect(() => {
    const tabletData = tabletCatalogs.find(
      tabletCatalog => tabletCatalog._id === tabletCatalogId
    );
    if (tabletData) {
      setValue('t_cat_name', tabletData.t_cat_name);
      setValue('t_cat_img', tabletData.t_cat_img);
      setValue('t_cat_price', tabletData.t_cat_price);
      setValue('t_cat_status', tabletData.t_cat_status);
      setValue('t_cat_content', tabletData.t_cat_content || '');
      setEditorValue(tabletData.t_cat_content || '');
      setValue('createdAt', tabletData.createdAt);

      // Lưu lại đường dẫn ảnh hiện tại
      setExistingImg(tabletData.t_cat_img);

     // Các trường con trong `t_cat_display`
      setValue('t_cat_display.t_cat_screen_technology', tabletData.t_cat_display.t_cat_screen_technology);
      setValue('t_cat_display.t_cat_resolution', tabletData.t_cat_display.t_cat_resolution);
      setValue('t_cat_display.t_cat_screen_size', tabletData.t_cat_display.t_cat_screen_size);

      // Các trường con trong `t_cat_operating_system_and_cpu`
      setValue('t_cat_operating_system_and_cpu.t_cat_operating_system', tabletData.t_cat_operating_system_and_cpu.t_cat_operating_system);
      setValue('t_cat_operating_system_and_cpu.t_cat_cpu_chip', tabletData.t_cat_operating_system_and_cpu.t_cat_cpu_chip);
      setValue('t_cat_operating_system_and_cpu.t_cat_cpu_speed', tabletData.t_cat_operating_system_and_cpu.t_cat_cpu_speed);
      setValue('t_cat_operating_system_and_cpu.t_cat_gpu', tabletData.t_cat_operating_system_and_cpu.t_cat_gpu);

      // Các trường con trong `t_cat_memory_and_storage`
      setValue('t_cat_memory_and_storage.t_cat_ram', tabletData.t_cat_memory_and_storage.t_cat_ram);
      setValue('t_cat_memory_and_storage.t_cat_storage_capacity', tabletData.t_cat_memory_and_storage.t_cat_storage_capacity);
      setValue('t_cat_memory_and_storage.t_cat_available_storage', tabletData.t_cat_memory_and_storage.t_cat_available_storage);

      // Các trường con trong `t_cat_rear_camera`
      setValue('t_cat_rear_camera.t_cat_resolution', tabletData.t_cat_rear_camera.t_cat_resolution);
      setValue('t_cat_rear_camera.t_cat_video_recording', tabletData.t_cat_rear_camera.t_cat_video_recording);
      setValue('t_cat_rear_camera.t_cat_features', tabletData.t_cat_rear_camera.t_cat_features);

      // Các trường con trong `t_cat_front_camera`
      setValue('t_cat_front_camera.t_cat_resolution', tabletData.t_cat_front_camera.t_cat_resolution);
      setValue('t_cat_front_camera.t_cat_features', tabletData.t_cat_front_camera.t_cat_features);

      // Các trường con trong `t_cat_connectivity`
      setValue('t_cat_connectivity.t_cat_mobile_network', tabletData.t_cat_connectivity.t_cat_mobile_network);
      setValue('t_cat_connectivity.t_cat_sim', tabletData.t_cat_connectivity.t_cat_sim);
      setValue('t_cat_connectivity.t_cat_calls', tabletData.t_cat_connectivity.t_cat_calls);
      setValue('t_cat_connectivity.t_cat_wifi', tabletData.t_cat_connectivity.t_cat_wifi);
      setValue('t_cat_connectivity.t_cat_gps', tabletData.t_cat_connectivity.t_cat_gps);
      setValue('t_cat_connectivity.t_cat_bluetooth', tabletData.t_cat_connectivity.t_cat_bluetooth);
      setValue('t_cat_connectivity.t_cat_charging_port', tabletData.t_cat_connectivity.t_cat_charging_port);
      setValue('t_cat_connectivity.t_cat_headphone_jack', tabletData.t_cat_connectivity.t_cat_headphone_jack);

      // Các trường con trong `t_cat_features`
      setValue('t_cat_features.t_cat_special_features', tabletData.t_cat_features.t_cat_special_features);

      // Các trường con trong `t_cat_battery_and_charging`
      setValue('t_cat_battery_and_charging.t_cat_battery_capacity', tabletData.t_cat_battery_and_charging.t_cat_battery_capacity);
      setValue('t_cat_battery_and_charging.t_cat_battery_type', tabletData.t_cat_battery_and_charging.t_cat_battery_type);
      setValue('t_cat_battery_and_charging.t_cat_battery_technology', tabletData.t_cat_battery_and_charging.t_cat_battery_technology);
      setValue('t_cat_battery_and_charging.t_cat_max_charging_support', tabletData.t_cat_battery_and_charging.t_cat_max_charging_support);
      setValue('t_cat_battery_and_charging.t_cat_included_charger', tabletData.t_cat_battery_and_charging.t_cat_included_charger);

      // Các trường con trong `t_cat_general_information`
      setValue('t_cat_general_information.t_cat_material', tabletData.t_cat_general_information.t_cat_material);
      setValue('t_cat_general_information.t_cat_dimensions_and_weight', tabletData.t_cat_general_information.t_cat_dimensions_and_weight);
      setValue('t_cat_general_information.t_cat_launch_date', tabletData.t_cat_general_information.t_cat_launch_date);
      setValue('t_cat_general_information.t_cat_brand', tabletData.t_cat_general_information.t_cat_brand);

    }
  }, [tabletCatalogs, tabletCatalogId, setValue]);
  const onSubmit: SubmitHandler<ITabletCatalog> = async formData => {
    const data = new FormData();

    data.append('t_cat_name', formData.t_cat_name);
    data.append('t_cat_price', formData.t_cat_price.toString());
    data.append('t_cat_status', formData.t_cat_status.toString());
    data.append('t_cat_content', formData.t_cat_content || '');

    const imgFile = watch('t_cat_img');
    if (imgFile && imgFile[0]) {
      data.append('t_cat_img', imgFile[0]);
    } else {
      if (existingImg) {
        data.append('t_cat_img', existingImg);
      }
    }

    // Convert nested fields to JSON string
    data.append('t_cat_display', JSON.stringify(formData.t_cat_display || {}));
    data.append(
      't_cat_operating_system_and_cpu',
      JSON.stringify(formData.t_cat_operating_system_and_cpu || {})
    );
    data.append(
      't_cat_memory_and_storage',
      JSON.stringify(formData.t_cat_memory_and_storage || {})
    );
    data.append(
      't_cat_rear_camera',
      JSON.stringify(formData.t_cat_rear_camera || {})
    );
    data.append(
      't_cat_front_camera',
      JSON.stringify(formData.t_cat_front_camera || {})
    );
    data.append(
      't_cat_connectivity',
      JSON.stringify(formData.t_cat_connectivity || {})
    );
    data.append(
      't_cat_features',
      JSON.stringify(formData.t_cat_features || {})
    );
    data.append(
      't_cat_battery_and_charging',
      JSON.stringify(formData.t_cat_battery_and_charging || {})
    );
    data.append(
      't_cat_general_information',
      JSON.stringify(formData.t_cat_general_information || {})
    );
    try {
      await updateTabletCatalog(tabletCatalogId, data);
      reset();
      getAllTabletCatalogs();
      Toastify('Danh mục đã được cập nhật!', 200);
      onClose();
    } catch (err) {
      Toastify(`Lỗi: ${err}`, 500);
      console.error(err);
    }
  };

  if (!isOpen) return null;

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        onClick={handleOverlayClick}
        className="modal-overlay fixed inset-0 z-50 flex w-full cursor-pointer items-center justify-center bg-black bg-opacity-40"
      >
        <div className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:w-1/2">
          <p className="font-bold text-black dark:text-white">
            Cập nhật danh mục
          </p>
          <div className="h-[500px] w-full overflow-y-auto scrollbar-hide 2xl:h-[700px]">
            {/* Các trường cơ bản */}
            <div className="mt-5">
              <LabelForm title={'Tên danh mục sản phẩm*'} />
              <InputModal
                type="text"
                {...register('t_cat_name')}
                placeholder="Nhập tên danh mục sản phẩm"
              />
              <LabelForm title={'Giá*'} />
              <InputModal
                type="number"
                {...register('t_cat_price')}
                placeholder="Nhập giá (Hệ số x1000: 1triệu = 1000)"
              />
              <LabelForm title={'Trạng thái*'} />
              <InputModal
                type="number"
                {...register('t_cat_status')}
                placeholder="Chọn: 0(Mới) / 1(Cũ)"
              />
              <LabelForm title={'Hình ảnh*'} />
              <InputModal
                type="file"
                {...register('t_cat_img')}
                placeholder="Chèn hình ảnh"
              />
            </div>
            {/* Màn hình*/}
            <div className="">
              <LabelForm title={'Công nghệ màn hình'} />
              <InputModal
                type="text"
                {...register('t_cat_display.t_cat_screen_technology')}
                placeholder="Nhập công nghệ màn hình"
              />
              <LabelForm title={'Độ phân giải'} />
              <InputModal
                type="text"
                {...register('t_cat_display.t_cat_resolution')}
                placeholder="Nhập độ phân giải"
              />
              <LabelForm title={'Màn hình rộng'} />
              <InputModal
                type="text"
                {...register('t_cat_display.t_cat_screen_size')}
                placeholder="Nhập màn hình rộng"
              />
              {/* Hệ điều hành & CPU */}
              <LabelForm title={'Hệ điều hành'} />
              <InputModal
                type="text"
                {...register(
                  't_cat_operating_system_and_cpu.t_cat_operating_system'
                )}
                placeholder="Nhập hệ điều hành"
              />
              <LabelForm title={'Chip xử lý (CPU)'} />
              <InputModal
                type="text"
                {...register('t_cat_operating_system_and_cpu.t_cat_cpu_chip')}
                placeholder="Nhập chip xử lý (CPU)"
              />
              <LabelForm title={'Tốc độ CPU'} />
              <InputModal
                type="text"
                {...register('t_cat_operating_system_and_cpu.t_cat_cpu_speed')}
                placeholder="Nhập tốc độ CPU"
              />
              <LabelForm title={'Chip đồ hoạ (GPU)'} />
              <InputModal
                type="text"
                {...register('t_cat_operating_system_and_cpu.t_cat_gpu')}
                placeholder="Nhập chip đồ hoạ (GPU)"
              />
              {/*  Bộ nhớ & Lưu trữ */}
              <LabelForm title={'RAM'} />
              <InputModal
                type="text"
                {...register('t_cat_memory_and_storage.t_cat_ram')}
                placeholder="Nhập RAM"
              />
              <LabelForm title={'Dung lượng lưu trữ'} />
              <InputModal
                type="text"
                {...register('t_cat_memory_and_storage.t_cat_storage_capacity')}
                placeholder="Nhập dung lượng lưu trữ"
              />
              <LabelForm title={'Dung lượng còn lại'} />
              <InputModal
                type="text"
                {...register(
                  't_cat_memory_and_storage.t_cat_available_storage'
                )}
                placeholder="Nhập dung lượng còn lại"
              />

              {/* Camera sau */}
              <div className="">
                <LabelForm title={'Độ phân giải'} />
                <InputModal
                  type="text"
                  {...register('t_cat_rear_camera.t_cat_resolution')}
                  placeholder="Nhập độ phân giải"
                />
                <div className="my-2">
                  <LabelForm title={'Quay phim'} />
                  <Select
                    isMulti
                    options={optionsTabletData.t_cat_video_recording}
                    onChange={selected =>
                      setValue(
                        't_cat_rear_camera.t_cat_video_recording',
                        selected.map(option => option.value)
                      )
                    }
                  />
                </div>
                <div className="my-2">
                  <LabelForm title={'Tính năng'} />
                  <Select
                    isMulti
                    options={optionsTabletData.t_cat_features}
                    onChange={selected =>
                      setValue(
                        't_cat_rear_camera.t_cat_features',
                        selected.map(option => option.value)
                      )
                    }
                  />
                </div>
                {/* Camera trước */}
                <LabelForm title={'Độ phân giải'} />
                <InputModal
                  type="text"
                  {...register('t_cat_front_camera.t_cat_resolution')}
                  placeholder="Nhập độ phân giải"
                />
                <div className="my-2">
                  <LabelForm title={'Tính năng'} />
                  <Select
                    isMulti
                    options={optionsTabletData.t_cat_features}
                    onChange={selected =>
                      setValue(
                        't_cat_front_camera.t_cat_features',
                        selected.map(option => option.value)
                      )
                    }
                  />
                </div>
              </div>
              {/* Kết nối */}
              <LabelForm title={'Mạng di động'} />
              <InputModal
                type="text"
                {...register('t_cat_connectivity.t_cat_mobile_network')}
                placeholder="Nhập mạng di động"
              />
              <LabelForm title={'SIM'} />
              <InputModal
                type="text"
                {...register('t_cat_connectivity.t_cat_sim')}
                placeholder="Nhập SIM"
              />
              <LabelForm title={'Thực hiện cuộc gọi'} />
              <InputModal
                type="text"
                {...register('t_cat_connectivity.t_cat_calls')}
                placeholder="Nhập thực hiện cuộc gọi"
              />
              <div className="my-2">
                <LabelForm title={'Wifi'} />
                <Select
                  isMulti
                  options={optionsTabletData.t_cat_wifi}
                  onChange={selected =>
                    setValue(
                      't_cat_connectivity.t_cat_wifi',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>
              <div className="my-2">
                <LabelForm title={'GPS'} />
                <Select
                  isMulti
                  options={optionsTabletData.t_cat_gps}
                  onChange={selected =>
                    setValue(
                      't_cat_connectivity.t_cat_gps',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>
              <LabelForm title={'Bluetooth'} />
              <InputModal
                type="text"
                {...register('t_cat_connectivity.t_cat_bluetooth')}
                placeholder="Nhập Bluetooth"
              />
              <LabelForm title={'Cổng kết nối/sạc'} />
              <InputModal
                type="text"
                {...register('t_cat_connectivity.t_cat_charging_port')}
                placeholder="Nhập cổng kết nối/sạc"
              />
              <LabelForm title={'Jack tai nghe'} />
              <InputModal
                type="text"
                {...register('t_cat_connectivity.t_cat_headphone_jack')}
                placeholder="Nhập Jack tai nghe"
              />
              {/* Tiện ích */}
              <LabelForm title={'Tính năng đặc biệt'} />
              <InputModal
                type="text"
                {...register('t_cat_features.t_cat_special_features')}
                placeholder="Nhập tính năng đặc biệt"
              />
              {/* Pin & Sạc */}
              <LabelForm title={'Dung lượng pin'} />
              <InputModal
                type="text"
                {...register(
                  't_cat_battery_and_charging.t_cat_battery_capacity'
                )}
                placeholder="Nhập Dung lượng pin"
              />
              <LabelForm title={'Loại pin'} />
              <InputModal
                type="text"
                {...register('t_cat_battery_and_charging.t_cat_battery_type')}
                placeholder="Nhập loại pin"
              />
              <div className="my-2">
                <LabelForm title={'Công nghệ pin'} />
                <Select
                  isMulti
                  options={optionsTabletData.t_cat_battery_technology}
                  onChange={selected =>
                    setValue(
                      't_cat_battery_and_charging.t_cat_battery_technology',
                      selected.map(option => option.value)
                    )
                  }
                />
              </div>
              <LabelForm title={'Hỗ trợ sạc tối đa'} />
              <InputModal
                type="text"
                {...register(
                  't_cat_battery_and_charging.t_cat_max_charging_support'
                )}
                placeholder="Nhập hỗ trợ sạc tối đa"
              />
            </div>
            <div className="">
              <LabelForm title={'Sạc kèm theo máy'} />
              <InputModal
                type="text"
                {...register(
                  't_cat_battery_and_charging.t_cat_included_charger'
                )}
                placeholder="Nhập sạc kèm theo máy"
              />
              {/* Thông tin chung */}

              <LabelForm title={' Chất liệu'} />
              <InputModal
                type="text"
                {...register('t_cat_general_information.t_cat_material')}
                placeholder="Nhập  chất liệu"
              />
              <LabelForm title={'Kích thước và khối lượng'} />
              <InputModal
                type="text"
                {...register(
                  't_cat_general_information.t_cat_dimensions_and_weight'
                )}
                placeholder="Nhập kích thước và khối lượng"
              />
              <LabelForm title={'Thời điểm ra mắt'} />
              <InputModal
                type="text"
                {...register('t_cat_general_information.t_cat_launch_date')}
                placeholder="Nhập thời điểm ra mắt"
              />
              <LabelForm title={'Hãng'} />
              <InputModal
                type="text"
                {...register('t_cat_general_information.t_cat_brand')}
                placeholder="Nhập hãng"
              />
            </div>
            <div className="flex w-full flex-col items-start justify-center">
              <LabelForm title={'Nội dung'} />
              <Controller
                name="t_cat_content"
                control={control}
                defaultValue={editorValue}
                render={({ field }) => (
                  <ReactQuill
                    className="w-full bg-white text-black"
                    value={field.value || ''}
                    onChange={value => field.onChange(value)}
                    theme="snow"
                    modules={modules}
                    placeholder="Nội dung mô tả..."
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-5 space-x-5 text-center">
            <Button
              onClick={onClose}
              className="border-gray-50 text-black dark:text-white"
            >
              Hủy
            </Button>
            <Button
              disabled={isLoading}
              color="primary"
              type="submit"
              className="text-white"
            >
              {isLoading ? 'Đang cập nhật...' : 'Xác nhận'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEditTabletCatalogPageAdmin;
