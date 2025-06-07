import { createContext, useState, useEffect } from "react";

export const SelectedCustomerContext = createContext({
	selectedCustomer: { id: "", domain: "" },
	setSelectedCustomer: (customer: { id: string; domain: string }) => {
		console.log(customer);
	},
});

export const SelectedCustomerProvider = ({
	children,
}: {
	children: React.ReactNode | React.ReactNode[];
}) => {
	const [selectedCustomer, setSelectedCustomer] = useState({
		id: "",
		domain: "",
	});

	useEffect(() => {
		const id = localStorage.getItem("selectedCustomerId") || "";
		const domain = localStorage.getItem("selectedCustomerDomain") || "";
		setSelectedCustomer({ id, domain });
	}, []);

	useEffect(() => {
		if (selectedCustomer.id && selectedCustomer.domain) {
			localStorage.setItem("selectedCustomerId", selectedCustomer.id);
			localStorage.setItem(
				"selectedCustomerDomain",
				selectedCustomer.domain
			);
		}
	}, [selectedCustomer]);

	return (
		<SelectedCustomerContext.Provider
			value={{ selectedCustomer, setSelectedCustomer }}
		>
			{children}
		</SelectedCustomerContext.Provider>
	);
};
