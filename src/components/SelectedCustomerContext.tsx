import React, { createContext, useState, useEffect } from "react";

export const SelectedCustomerContext = createContext({
  selectedCustomer: { id: "", domain: "" },
  setSelectedCustomer: () => {},
});

export const SelectedCustomerProvider = ({ children }) => {
  const [selectedCustomer, setSelectedCustomer] = useState({ id: "", domain: "" });

  useEffect(() => {
    const id = localStorage.getItem("selectedCustomerId") || "";
    const domain = localStorage.getItem("selectedCustomerDomain") || "";
    setSelectedCustomer({ id, domain });
  }, []);

  useEffect(() => {
    if (selectedCustomer.id && selectedCustomer.domain) {
      localStorage.setItem("selectedCustomerId", selectedCustomer.id);
      localStorage.setItem("selectedCustomerDomain", selectedCustomer.domain);
    }
  }, [selectedCustomer]);

  return (
    <SelectedCustomerContext.Provider value={{ selectedCustomer, setSelectedCustomer }}>
      {children}
    </SelectedCustomerContext.Provider>
  );
};
