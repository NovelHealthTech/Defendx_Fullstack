import React, { createContext, useState, useEffect } from "react";

interface SelectedCustomer {
  id: string;
  domain: string;
  email: string;
}

interface SelectedCustomerContextType {
  selectedCustomer: SelectedCustomer;
  setSelectedCustomer: (customer: SelectedCustomer) => void;
}

export const SelectedCustomerContext = createContext<SelectedCustomerContextType>({
  selectedCustomer: { id: "", domain: "", email: "" },
  setSelectedCustomer: () => { },
});

interface SelectedCustomerProviderProps {
  children: React.ReactNode;
}

export const SelectedCustomerProvider: React.FC<SelectedCustomerProviderProps> = ({ children }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<SelectedCustomer>({ id: "", domain: "", email: "" });

  useEffect(() => {
    const id = localStorage.getItem("selectedCustomerId") || "";
    const domain = localStorage.getItem("selectedCustomerDomain") || "";
    const email = localStorage.getItem("email") || "";
    setSelectedCustomer({ id, domain, email });
  }, []);

  useEffect(() => {
    if (selectedCustomer.id && selectedCustomer.domain) {
      localStorage.setItem("selectedCustomerId", selectedCustomer.id);
      localStorage.setItem("selectedCustomerDomain", selectedCustomer.domain);
    }
    if (selectedCustomer.email) {
      localStorage.setItem("email", selectedCustomer.email);
    }
  }, [selectedCustomer]);

  return (
    <SelectedCustomerContext.Provider value={{ selectedCustomer, setSelectedCustomer }}>
      {children}
    </SelectedCustomerContext.Provider>
  );
};
