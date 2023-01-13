import { createContext, useContext, useState, type ReactNode } from 'react';

type CompanyContextType = {
  companyId?: number;
  setCompanyData: (id?: number) => void;
};

const CompanyContext = createContext<CompanyContextType>({
  companyId: undefined,
  setCompanyData: id => console.log(id),
});

export const CompanyContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [companyId, setCompanyId] = useState<number | undefined>(undefined);

  const setCompanyData = (id?: number) => setCompanyId(id);

  const value = { companyId, setCompanyData };

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
};

export const useCompanyData = () => useContext(CompanyContext);
