import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
  useMemo
} from 'react';
import { AxiosResponse } from 'axios';
import {
  getAllPhonesApi,
  createPhoneApi,
  updatePhoneApi,
  deletePhoneApi,
  getPhoneByIdApi
} from '../../axios/api/phoneApi';
import { IPhone } from '../../types/type/phone/phone';

interface PhoneContextType {
  phones: IPhone[];
  countPhone: number;
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllPhones: () => void;
  getPhoneById: (_id: string) => Promise<IPhone | undefined>;
  createPhone: (phoneData: FormData) => Promise<AxiosResponse<any>>;
  updatePhone: (
    _id: string,
    phoneData: FormData
  ) => Promise<AxiosResponse<any>>;
  updatePhoneView: (_id: string) => Promise<void>;
  deletePhone: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: PhoneContextType = {
  phones: [],
  countPhone: 0,
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllPhones: () => {},
  getPhoneById: async () => undefined,
  createPhone: async () => ({ data: { phone: null } }) as AxiosResponse,
  updatePhone: async () => ({ data: { phone: null } }) as AxiosResponse,
  updatePhoneView: async () => Promise.resolve(),
  deletePhone: async () => ({ data: { deleted: true } }) as AxiosResponse
};

export const PhoneContext =
  createContext<PhoneContextType>(defaultContextValue);

export const PhoneProvider = ({ children }: { children: ReactNode }) => {
  const [phones, setPhones] = useState<IPhone[]>([]);
  const [countPhone, setCountPhone] = useState<number>(0);
  const [loading, setLoading] = useState({
    getAll: false,
    create: false,
    update: false,
    delete: false
  });
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || 'Lỗi cục bộ!');
  };

  const fetchData = async (
    apiCall: () => Promise<AxiosResponse<any>>,
    onSuccess: (data: any) => void,
    requestType: keyof typeof loading // 'getAll', 'create', 'update', 'delete'
  ): Promise<AxiosResponse<any>> => {
    setLoading(prev => ({ ...prev, [requestType]: true }));
    setError(null);
    try {
      const response = await apiCall();
      onSuccess(response.data);
      return response;
    } catch (err: any) {
      handleError(err);
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, [requestType]: false }));
    }
  };

  // Get All Phones
  const getAllPhones = useCallback(() => {
    fetchData(
      getAllPhonesApi,
      data => {
        setPhones(data?.phones || []);
        setCountPhone(data?.count || 0);
      },
      'getAll'
    );
  }, []);

  // Get Phone By Id
  const getPhoneById = useCallback(
    async (id: string): Promise<IPhone | undefined> => {
      const cachedPhone = phones.find(p => p._id === id);
      if (cachedPhone) return cachedPhone;
      const response = await fetchData(
        () => getPhoneByIdApi(id),
        data => {
          if (data?.p) {
            setPhones(prevPhones => [...prevPhones, data.p]);
          }
        },
        'getAll'
      );
      return response.data?.p;
    },
    [phones]
  );

  // Create Phone
  const createPhone = useCallback(
    async (phoneData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createPhoneApi(phoneData),
        data => {
          if (data?.phoneData) {
            setPhones(prevPhones => [...prevPhones, data?.phoneData]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update Phone
  const updatePhone = useCallback(
    async (_id: string, phoneData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updatePhoneApi(_id, phoneData),
        data => {
          if (data?.phoneData) {
            setPhones(prevPhones =>
              prevPhones.map(p => (p._id === _id ? data?.phoneData : p))
            );
          }
        },
        'update'
      );
    },
    []
  );
  
  // updatePhoneView
  const updatePhoneView = useCallback(
    async (_id: string) => {
      try {
        // Tìm sản phẩm trong danh sách
        const phone = phones.find(p => p._id === _id);
        if (!phone) return;

        // Cập nhật nhanh trong UI để tránh delay
        setPhones(prevPhones =>
          prevPhones.map(p =>
            p._id === _id ? { ...p, view: (p.view ?? 0) + 1 } : p
          )
        );

        // Gọi API cập nhật view trên server
        const updatedData = new FormData();
        updatedData.append('view', String((phone.view ?? 0) + 1));

        const response = await updatePhoneApi(_id, updatedData);

        // Nếu API thành công, cập nhật lại state với dữ liệu từ server
        if (response.data?.phone) {
          setPhones(prevPhones =>
            prevPhones.map(p => (p._id === _id ? response.data.phone : p))
          );
        }
      } catch (error) {
        console.error('Lỗi khi cập nhật view:', error);

        // Rollback nếu API thất bại
        setPhones(prevPhones =>
          prevPhones.map(p =>
            p._id === _id ? { ...p, view: (p.view ?? 0) - 1 } : p
          )
        );
      }
    },
    [phones]
  );

  // Delete Phone
  const deletePhone = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deletePhoneApi(id),
        () => setPhones(prevPhones => prevPhones.filter(p => p._id !== id)),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllPhones();
  }, [getAllPhones]);

  const value = useMemo(
    () => ({
      phones,
      countPhone,
      loading,
      error,
      getAllPhones,
      getPhoneById,
      createPhone,
      updatePhone,
      updatePhoneView,
      deletePhone
    }),
    [phones, countPhone, loading, error]
  );
  return (
    <PhoneContext.Provider value={value}>{children}</PhoneContext.Provider>
  );
};
