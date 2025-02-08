import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import { AxiosResponse } from 'axios';
import { IMacbookCatalog } from '../../types/type/macbook-catalog/macbook-catalog';
import {
  getAllMacbookCatalogsApi,
  getMacbookCatalogByIdApi,
  createMacbookCatalogApi,
  updateMacbookCatalogApi,
  deleteMacbookCatalogApi
} from '../../axios/api/macbookCatalogApi';

interface MacbookCatalogContextType {
  macbookCatalogs: IMacbookCatalog[];
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllMacbookCatalog: () => void;
  getMacbookCatalogById: (_id: string) => Promise<IMacbookCatalog | undefined>;
  createMacbookCatalog: (
    macbookCatalogData: FormData
  ) => Promise<AxiosResponse<any>>;
  updateMacbookCatalog: (
    _id: string,
    macbookCatalogData: FormData
  ) => Promise<AxiosResponse<any>>;
  deleteMacbookCatalog: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: MacbookCatalogContextType = {
  macbookCatalogs: [],
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllMacbookCatalog: () => {},
  getMacbookCatalogById: async () => undefined,
  createMacbookCatalog: async () =>
    ({ data: { macbookCatalog: null } }) as AxiosResponse,
  updateMacbookCatalog: async () =>
    ({ data: { macbookCatalog: null } }) as AxiosResponse,
  deleteMacbookCatalog: async () =>
    ({ data: { deleted: true } }) as AxiosResponse
};

export const MacbookCatalogContext =
  createContext<MacbookCatalogContextType>(defaultContextValue);

export const MacbookCatalogProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [macbookCatalogs, setMacbookCatalog] = useState<IMacbookCatalog[]>([]);
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

  // Get All MacbookCatalog
  const getAllMacbookCatalog = useCallback(() => {
    fetchData(
      getAllMacbookCatalogsApi,
      data => setMacbookCatalog(data?.macbookCatalog || []),
      'getAll'
    );
  }, []);

  // Get MacbookCatalog By Id
  const getMacbookCatalogById = useCallback(
    async (id: string): Promise<IMacbookCatalog | undefined> => {
      const cachedMacbookCatalog = macbookCatalogs.find(wc => wc._id === id);
      if (cachedMacbookCatalog) return cachedMacbookCatalog;
      const response = await fetchData(
        () => getMacbookCatalogByIdApi(id),
        data => {
          if (data?.wc) {
            setMacbookCatalog(prevMacbookCatalog => [
              ...prevMacbookCatalog,
              data.wc
            ]);
          }
        },
        'getAll'
      );
      return response.data?.wc;
    },
    [macbookCatalogs]
  );

  // Create MacbookCatalog
  const createMacbookCatalog = useCallback(
    async (macbookCatalogData: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createMacbookCatalogApi(macbookCatalogData),
        data => {
          if (data?.wc) {
            setMacbookCatalog(prevMacbookCatalog => [
              ...prevMacbookCatalog,
              data?.wc
            ]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update MacbookCatalog
  const updateMacbookCatalog = useCallback(
    async (
      _id: string,
      macbookCatalogData: FormData
    ): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updateMacbookCatalogApi(_id, macbookCatalogData),
        data => {
          if (data?.macbookCatalogData) {
            setMacbookCatalog(prevMacbookCatalog =>
              prevMacbookCatalog.map(wc =>
                wc._id === _id ? data?.macbookCatalogData : wc
              )
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete MacbookCatalog
  const deleteMacbookCatalog = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deleteMacbookCatalogApi(id),
        () =>
          setMacbookCatalog(prevMacbookCatalog =>
            prevMacbookCatalog.filter(wc => wc._id !== id)
          ),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllMacbookCatalog();
  }, [getAllMacbookCatalog]);

  return (
    <MacbookCatalogContext.Provider
      value={{
        macbookCatalogs,
        loading,
        error,
        getAllMacbookCatalog,
        getMacbookCatalogById,
        createMacbookCatalog,
        updateMacbookCatalog,
        deleteMacbookCatalog
      }}
    >
      {children}
    </MacbookCatalogContext.Provider>
  );
};
