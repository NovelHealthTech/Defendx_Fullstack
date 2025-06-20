import { useNavigate } from "react-router";
import SidebarLayout from "@/layouts/sidebar-layout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
    Info,
    Filter,
    FileDown,
    Send,
    CalendarDays,
    ShieldCheck,
    AlertTriangle,
} from "lucide-react";
import ExportDialog from "@/components/ExportDialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

interface Questionnaire {
    id: number;
    name: string;
    status: string;
    sent_at: string;
    returned_at: string;
    archived: boolean;
    in_remediation: boolean;
}

export default function SecurityQuestionnaires() {
    const navigate = useNavigate();
    const [tab, setTab] = useState("active");
    const [showDescription, setShowDescription] = useState(true);
    const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hostname] = useState(localStorage.getItem("customerDomain"));

    const statusOptions = [
        "Not Sent",
        "Autofilled",
        "Reviewing Autofill",
        "Cancelled",
        "Sent",
        "Awaiting Review",
        "In Review",
        "Completed",
        "Draft",
        "Shared",
        "returned",
    ];

    const handleStatusChange = (status: string, checked: boolean) => {
        setSelectedStatuses((prev) =>
            checked ? [...prev, status] : prev.filter((s) => s !== status)
        );
    };

    useEffect(() => {
        const fetchQuestionnaires = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    "https://cyber.defendx.co.in/api/upguard/get-vendor-questionnaires",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ hostname }),
                    }
                );
                const data = await response.json();
                setQuestionnaires(data.data?.questionnaires || []);
            } catch (err) {
                setError("Failed to fetch questionnaires.");
            } finally {
                setLoading(false);
            }
        };
        fetchQuestionnaires();
    }, [hostname]);

    const filteredQuestionnaires = questionnaires.filter((q) =>
        selectedStatuses.length > 0
            ? selectedStatuses.includes(q.status)
            : true
    );

    return (
        <SidebarLayout
            breadcrumbs={[
                {
                    label: "Security Questionnaires",
                    href: "/security-questionnaires",
                },
            ]}
        >
            <PageHeader
                title="Security Questionnaires"
                info={
                    showDescription
                        ? "Security questionnaires are designed to help you identify potential weaknesses in customers that aren't accessible through automated scanning. You can send a pre-built security questionnaire based on a variety of security standards to any of your monitored customers and we'll automatically score it and highlight any identified risks."
                        : undefined
                }
                actions={
                    <div className="flex gap-2 items-center">
                        <Button
                            variant="outline"
                            onClick={() => setIsFilterSidebarOpen(true)}
                        >
                            <Filter className="w-4 h-4 mr-1" />
                            Apply filters
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setIsExportDialogOpen(true)}
                        >
                            <FileDown className="w-4 h-4 mr-1" />
                            Export
                        </Button>
                        <Button
                            onClick={() =>
                                navigate("/security-questionnaires/create")
                            }
                        >
                            <Send className="w-4 h-4 mr-1" />
                            Send questionnaire
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            aria-label="Toggle description"
                            onClick={() => setShowDescription((v) => !v)}
                        >
                            <Info className="w-5 h-5" />
                        </Button>
                    </div>
                }
            />

            {/* Export Dialog */}
            <ExportDialog
                open={isExportDialogOpen}
                onOpenChange={setIsExportDialogOpen}
                exportFormat={"pdf"}
                setExportFormat={() => {}}
                exportFrequency={"once"}
                setExportFrequency={() => {}}
                exportDelivery={"save"}
                setExportDelivery={() => {}}
            />

            {/* Filter Sidebar Sheet */}
            <Sheet
                open={isFilterSidebarOpen}
                onOpenChange={setIsFilterSidebarOpen}
            >
                <SheetContent side="right" className="max-w-sm w-full p-6">
                    <div className="flex flex-col h-full">
                        <h2 className="text-lg font-semibold mb-4">
                            Filter by
                        </h2>
                        <Accordion
                            type="single"
                            collapsible
                            defaultValue="status"
                        >
                            <AccordionItem value="status">
                                <AccordionTrigger>
                                    Questionnaire status
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col gap-2">
                                        {statusOptions.map((status) => (
                                            <label
                                                key={status}
                                                className="flex items-center gap-2 text-sm"
                                            >
                                                <Checkbox
                                                    checked={selectedStatuses.includes(
                                                        status
                                                    )}
                                                    onCheckedChange={(
                                                        checked
                                                    ) =>
                                                        handleStatusChange(
                                                            status,
                                                            !!checked
                                                        )
                                                    }
                                                />
                                                {status}
                                            </label>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <div className="mt-auto flex gap-2 pt-6">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setSelectedStatuses([])}
                            >
                                Reset
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={() => setIsFilterSidebarOpen(false)}
                            >
                                Apply
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <div className="rounded-xl border bg-card p-4 flex flex-col gap-2 w-full overflow-x-auto mt-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex gap-2">
                        <Button
                            variant={tab === "active" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTab("active")}
                        >
                            Active ({filteredQuestionnaires.length})
                        </Button>
                        <Button
                            variant={tab === "archived" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTab("archived")}
                        >
                            Archived (0)
                        </Button>
                    </div>
                    <input
                        className="input input-sm w-64 border rounded px-2 py-1 dark:bg-zinc-900"
                        placeholder="Search questionnaires"
                        // Add search logic if needed
                    />
                </div>
                {tab === "active" &&
                    (loading ? (
                        <div className="py-8 text-center">Loading...</div>
                    ) : error ? (
                        <div className="py-8 text-center text-red-600">
                            {error}
                        </div>
                    ) : filteredQuestionnaires.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                            <div className="text-4xl mb-2">📄</div>
                            <div className="font-medium mb-1">
                                You have no active questionnaires
                            </div>
                            <div className="text-xs mb-4">
                                You haven't sent any questionnaires to this
                                customer yet, or all questionnaires have been
                                archived or cancelled.
                            </div>
                            <Button
                                onClick={() =>
                                    navigate("/security-questionnaires/create")
                                }
                            >
                                Send questionnaire
                            </Button>
                        </div>
                    ) : (
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="text-muted-foreground border-b">
                                    <th className="text-left py-2 px-4 font-normal">
                                        <ShieldCheck className="inline w-4 h-4 mr-1" />
                                        Name
                                    </th>
                                    <th className="text-left py-2 px-4 font-normal">
                                        <CalendarDays className="inline w-4 h-4 mr-1" />
                                        Sent At
                                    </th>
                                    <th className="text-left py-2 px-4 font-normal">
                                        <CalendarDays className="inline w-4 h-4 mr-1" />
                                        Returned At
                                    </th>
                                    <th className="text-left py-2 px-4 font-normal">
                                        <AlertTriangle className="inline w-4 h-4 mr-1" />
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredQuestionnaires.map((q) => (
                                    <tr
                                        key={q.id}
                                        className="border-b last:border-0 cursor-pointer hover:bg-muted/50"
                                        onClick={() =>
                                            navigate(
                                                `/security-questionnaires/${q.id}/edit`
                                            )
                                        }
                                    >
                                        <td className="py-2 px-4">{q.name}</td>
                                        <td className="py-2 px-4">
                                            {q.sent_at
                                                ? new Date(q.sent_at).toLocaleString()
                                                : "-"}
                                        </td>
                                        <td className="py-2 px-4">
                                            {q.returned_at
                                                ? new Date(q.returned_at).toLocaleString()
                                                : "-"}
                                        </td>
                                        <td className="py-2 px-4">
                                            {q.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ))}
                {tab === "archived" && (
                    <div className="text-center text-muted-foreground py-16">
                        No archived questionnaires.
                    </div>
                )}
            </div>
        </SidebarLayout>
    );
}