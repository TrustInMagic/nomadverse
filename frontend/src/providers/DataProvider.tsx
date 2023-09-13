import React, { ReactNode } from 'react';
// http
import httpClient from '@/api/http-client';
// types
import { CategoryInterface, ChronicleInterface } from '../../../types/models';
// -------------------------------------------------- //

type DataContextType = {
  chronicles: ChronicleInterface[];
  categories: CategoryInterface[];
  isLoading: boolean;
};

const DataContext = React.createContext<DataContextType>({
  chronicles: [],
  categories: [],
  isLoading: true,
});

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

  React.useEffect(() => {
    (async () => {
      const data = await httpClient.get('');
      const { chronicles, categories } = data;
      setIsLoading(false);

      setChronicles(chronicles);
      setCategories(categories);
    })();
  }, []);

  return (
    <DataContext.Provider value={{ chronicles, categories, isLoading }}>
      {children}
    </DataContext.Provider>
  );
}

export { useDataContext, DataProvider };
