import React, { ReactNode } from 'react';
// http
import httpClient from '@/api/http-client';
// types
import { CategoryInterface, ChronicleInterface } from '../../types/models';
// -------------------------------------------------- //

type DataContextType = {
  chronicles: ChronicleInterface[];
  categories: CategoryInterface[];
  isLoading: boolean;
  fetchData: () => void;
};

const DataContext = React.createContext<null | DataContextType>(null);

const useDataContext = () => {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within an DataProvider');
  }

  return context;
};

function DataProvider({ children }: { children: ReactNode }) {
  const [chronicles, setChronicles] = React.useState<[] | ChronicleInterface[]>(
    []
  );
  const [categories, setCategories] = React.useState<[] | CategoryInterface[]>(
    []
  );
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = React.useCallback(async () => {
    const data = await httpClient.get('');
    const { chronicles, categories } = data;
    setIsLoading(false);

    setChronicles(chronicles);
    setCategories(categories);
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DataContext.Provider
      value={{ chronicles, categories, isLoading, fetchData }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { useDataContext, DataProvider };
