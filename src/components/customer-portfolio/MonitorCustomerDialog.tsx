import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search, Check } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

// Add these imports for modal dialogs
import { Dialog as Modal, DialogContent as ModalContent, DialogHeader as ModalHeader, DialogTitle as ModalTitle, DialogFooter as ModalFooter } from "@/components/ui/dialog";

type Suggestion = {
    id: string;
    name: string;
    domain: string;
};

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    monitorSearch: string;
    setMonitorSearch: (val: string) => void;
};

// Fetch suggestions from Clearbit Autocomplete API
const fetchSuggestions = async (query: string): Promise<Suggestion[]> => {
    if (!query) return [];
    try {
        const res = await fetch(
            `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        return data.map((item: any) => ({
            id: item.domain,
            name: item.name,
            domain: item.domain,
        }));
    } catch (error) {
        return [];
    }
};

const MonitorCustomerDialog: React.FC<Props> = ({
    open,
    onOpenChange,
    monitorSearch,
    setMonitorSearch,
}) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<Suggestion | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [apiLoading, setApiLoading] = useState(false);

    // For error and success modals
    const [errorModal, setErrorModal] = useState<{ open: boolean; message: string }>({ open: false, message: "" });
    const [successModal, setSuccessModal] = useState<{ open: boolean; message: string }>({ open: false, message: "" });

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!monitorSearch) {
            setSuggestions([]);
            setShowDropdown(false);
            setSelected(null);
            return;
        }
        setLoading(true);
        const timeout = setTimeout(() => {
            fetchSuggestions(monitorSearch).then((res) => {
                setSuggestions(res);
                setShowDropdown(true);
                setLoading(false);
                // If user typed exactly a company/domain, auto-select
                const exact = res.find(
                    (s) =>
                        s.name.toLowerCase() === monitorSearch.toLowerCase() ||
                        s.domain.toLowerCase() === monitorSearch.toLowerCase()
                );
                setSelected(exact || null);
            });
        }, 300);
        return () => clearTimeout(timeout);
    }, [monitorSearch]);

    const handleSelect = (s: Suggestion) => {
        setSelected(s);
        setMonitorSearch(s.name);
        setShowDropdown(false);
    };

    const handleMonitor = async () => {
        if (!selected) return;
        setApiLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setApiLoading(false);
                setErrorModal({ open: true, message: "No token found. Please login again." });
                return;
            }
            const response = await fetch(
                "https://cyber.defendx.co.in/api/upguard/monitor-new-vendor",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        hostname: selected.domain,
                    }),
                }
            );
            const data = await response.json();
            if (!response.ok || data.success === false) {
                setErrorModal({ open: true, message: data.message || "Failed to monitor vendor." });
            } else {
                setSuccessModal({ open: true, message: `${selected.name} has been added to be monitored.` });
            }
        } catch (err) {
            setErrorModal({ open: true, message: "Network error. Please try again." });
        }
        setApiLoading(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMonitorSearch(e.target.value);
        setSelected(null);
        setShowDropdown(true);
    };

    const handleInputFocus = () => {
        if (suggestions.length > 0) setShowDropdown(true);
    };

    // Success modal OK handler
    const handleSuccessOk = () => {
        setSuccessModal({ open: false, message: "" });
        onOpenChange(false);
        setMonitorSearch("");
        setSelected(null);
        window.location.reload();
    };

    // Error modal OK handler
    const handleErrorOk = () => {
        setErrorModal({ open: false, message: "" });
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-xl w-full bg-white dark:bg-zinc-900 p-0 rounded-lg">
                    <DialogHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                        <DialogTitle>Monitor vendors</DialogTitle>
                    </DialogHeader>
                    <div className="px-6 pt-6 pb-2 flex flex-col gap-8">
                        <div className="w-full relative">
                            <div className="relative">
                                <input
                                    ref={inputRef}
                                    placeholder="Search..."
                                    value={monitorSearch}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    className="pl-10 w-full h-10 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label="Search for vendor"
                                    autoComplete="off"
                                />
                                <Search className="absolute left-3 top-2.5 w-5 h-5 text-blue-500" />
                            </div>
                            {showDropdown && suggestions.length > 0 && (
                                <ul className="absolute z-10 left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg max-h-56 overflow-auto">
                                    {suggestions.map((s) => (
                                        <li
                                            key={s.id}
                                            className={`flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-zinc-800 ${
                                                selected?.id === s.id
                                                    ? "bg-blue-100 dark:bg-zinc-800"
                                                    : ""
                                            }`}
                                            onClick={() => handleSelect(s)}
                                        >
                                            <span className="font-medium">{s.name}</span>
                                            <span className="ml-2 text-xs text-zinc-500">{s.domain}</span>
                                            {selected?.id === s.id && (
                                                <Check className="ml-auto w-4 h-4 text-blue-500" />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {showDropdown && !loading && suggestions.length === 0 && (
                                <div className="absolute z-10 left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg px-4 py-2 text-zinc-500 text-sm">
                                    No results found.
                                </div>
                            )}
                        </div>
                        {!monitorSearch && (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="rounded-full bg-blue-50 dark:bg-zinc-800 p-4 mb-4">
                                    <Search className="w-10 h-10 text-blue-400 dark:text-blue-300" />
                                </div>
                                <div className="text-center">
                                    <div className="font-medium text-zinc-700 dark:text-zinc-200 mb-1">
                                        Search for a vendor
                                    </div>
                                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                                        Enter a company's name or URL to start your search.
                                    </div>
                                </div>
                            </div>
                        )}
                        {monitorSearch && selected && (
                            <div className="flex flex-col items-center justify-center py-4">
                                <div className="text-center">
                                    <div className="font-medium text-zinc-700 dark:text-zinc-200 mb-1">
                                        Selected: {selected.name} ({selected.domain})
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter className="flex flex-row items-center justify-end gap-2 px-6 pb-6 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                        <Button variant="ghost" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button
                            disabled={!selected || apiLoading}
                            onClick={handleMonitor}
                        >
                            {apiLoading ? "Monitoring..." : "Monitor"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Error Modal */}
            <Modal open={errorModal.open} onOpenChange={handleErrorOk}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>Error</ModalTitle>
                    </ModalHeader>
                    <div className="px-6 py-4 text-red-600">{errorModal.message}</div>
                    <ModalFooter>
                        <Button onClick={handleErrorOk}>OK</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Success Modal */}
            <Modal open={successModal.open} onOpenChange={handleSuccessOk}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>Success</ModalTitle>
                    </ModalHeader>
                    <div className="px-6 py-4 text-green-600">{successModal.message}</div>
                    <ModalFooter>
                        <Button onClick={handleSuccessOk}>OK</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default MonitorCustomerDialog;