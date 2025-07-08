import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SidebarLayout from "@/layouts/sidebar-layout";
import {
    Globe,
    ShieldCheck,
    MoreVertical,
    Filter,
    Download,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import PageHeader from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import DrawerSheet from "@/components/DrawerSheet";
import ExportDialog from "@/components/ExportDialog";

const customer = {
    name: localStorage.getItem("customerDomain"),
    domain: localStorage.getItem("customerDomain"),
    industry: "Asphalt Products Manufacturing",
    rating: 794,
    ratingGrade: "B",
    ratingMax: 950,
    employees: 29200,
    headquarters: "Ahmedabad, GJ",
};

const API_URL = "https://cyber.defendx.co.in/api/upguard/risk-profile";

async function fetchRiskProfile(hostname: string, token: string) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ hostname }),
    });
    const data = await response.json();
    if (data.success && data.data && data.data.risks) {
        return data.data.risks;
    }
    return [];
}

export default function RiskProfile() {
    const [riskData, setRiskData] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [search, setSearch] = React.useState("");

    // Drawer state
    const [openControlActionDrawer, openControlActionDrawerSet] = React.useState(false);
    const [selectedControlAction, selectedControlActionSet] = React.useState<any>(null);

    // Filter sidebar state
    const [openFilterSidebar, setOpenFilterSidebar] = React.useState(false);

    // Export dialog state
    const [openExportDialog, setOpenExportDialog] = React.useState(false);
    const [exportFormat, setExportFormat] = React.useState<"pdf" | "excel">("pdf");
    const [exportFrequency, setExportFrequency] = React.useState<"once" | "recurring">("once");
    const [exportDelivery, setExportDelivery] = React.useState<"email" | "save">("email");

    React.useEffect(() => {
        async function loadRiskProfile() {
            setLoading(true);
            setError(null);
            try {
                const hostname = localStorage.getItem("customerDomain") || "";
                const token = localStorage.getItem("token") || "";
                const risks = await fetchRiskProfile(hostname, token);
                setRiskData(risks);
            } catch (e) {
                setError("Failed to load risk profile.");
            }
            setLoading(false);
        }
        loadRiskProfile();
    }, []);

    const columns = [
        {
            header: "Severity",
            accessorKey: "severity",
            cell: ({ row }: { row: any }) => (
                <Badge
                    variant={
                        row.original.severity?.toLowerCase() === "critical"
                            ? "destructive"
                            : row.original.severity?.toLowerCase() === "high"
                            ? "default"
                            : "outline"
                    }
                >
                    {row.original.severity}
                </Badge>
            ),
        },
        {
            header: "Finding",
            accessorKey: "finding",
        },
        {
            header: "Category",
            accessorKey: "category",
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: () => <Badge variant="destructive">Open</Badge>,
        },
        {
            id: "actions",
            enableHiding: false,
            header: "Actions",
            cell: ({ row }: { row: any }) => (
                <Button
                    onClick={() => {
                        selectedControlActionSet(row.original);
                        openControlActionDrawerSet(true);
                    }}
                >
                    Review
                </Button>
            ),
        },
    ];

    // Filter data by search (case-insensitive, checks finding, category, severity)
    const filteredData = riskData.filter((item) =>
        [item.finding, item.category, item.severity]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <SidebarLayout
            breadcrumbs={[
                {
                    label: "Risk Profile",
                    href: "/risk-profile",
                },
            ]}
        >
            <div className="space-y-4">
                <CustomerHeader
                    onOpenFilterSidebar={() => setOpenFilterSidebar(true)}
                    onOpenExportDialog={() => setOpenExportDialog(true)}
                />
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-green-600" /> Risk Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex items-center">
                            <input
                                type="text"
                                placeholder="Search findings, category, severity..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="border rounded px-3 py-2 w-full max-w-md"
                            />
                        </div>
                        {loading && <div>Loading...</div>}
                        {error && <div className="text-red-500">{error}</div>}
                        {/* Show all data, no pagination */}
                        <DataTable columns={columns} data={filteredData} pagination={true} />
                    </CardContent>
                </Card>
            </div>

            {/* Review Drawer */}
            <DrawerSheet
                open={openControlActionDrawer}
                onOpenChange={openControlActionDrawerSet}
                className="w-[400px] sm:min-w-[500px]"
                headerWithAction={{
                    title: selectedControlAction?.finding ?? "Review",
                    action: (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        Address this risk
                                    </DropdownMenuItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            Add to Risk Profile
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem>
                                                    Add to Risk Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    More...
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                    <DropdownMenuItem>
                                        Waive this risk
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ),
                }}
            >
                {selectedControlAction && (
                    <div
                        className="space-y-2 p-4"
                        style={{
                            maxHeight: "70vh",
                            overflowY: "auto",
                        }}
                    >
                        <div>
                            <strong>Finding:</strong> {selectedControlAction.finding}
                        </div>
                        <div>
                            <strong>Category:</strong> {selectedControlAction.category}
                        </div>
                        <div>
                            <strong>Severity:</strong> {selectedControlAction.severity}
                        </div>
                        <div>
                            <strong>Description:</strong> {selectedControlAction.description}
                        </div>
                        <div>
                            <strong>Risk:</strong> {selectedControlAction.risk}
                        </div>
                        <div>
                            <strong>Remediation:</strong> {selectedControlAction.remediation}
                        </div>
                        <div>
                            <strong>First Detected:</strong>{" "}
                            {selectedControlAction.firstDetected &&
                                new Date(selectedControlAction.firstDetected).toLocaleString()}
                        </div>
                        <div>
                            <strong>Hostnames:</strong>{" "}
                            {selectedControlAction.hostnames?.join(", ")}
                        </div>
                        <div>
                            <strong>Hostname Count:</strong> {selectedControlAction.hostnameCount}
                        </div>
                        <div>
                            <strong>Risk Type:</strong> {selectedControlAction.riskType}
                        </div>
                        <div>
                            <strong>Risk Subtype:</strong> {selectedControlAction.riskSubtype}
                        </div>
                    </div>
                )}
            </DrawerSheet>

            {/* Filter Sidebar */}
            <DrawerSheet
                open={openFilterSidebar}
                onOpenChange={setOpenFilterSidebar}
                className="w-[350px] sm:min-w-[400px]"
                side="right"
                title="Filter by"
            >
                {/* ...your filter UI here... */}
            </DrawerSheet>

            {/* Export Dialog */}
            <ExportDialog
                open={openExportDialog}
                onOpenChange={setOpenExportDialog}
                exportFormat={exportFormat}
                setExportFormat={setExportFormat}
                exportFrequency={exportFrequency}
                setExportFrequency={setExportFrequency}
                exportDelivery={exportDelivery}
                setExportDelivery={setExportDelivery}
            />
        </SidebarLayout>
    );
}

// Reusable Section Components
function CustomerHeader({
    onOpenFilterSidebar,
    onOpenExportDialog,
}: {
    onOpenFilterSidebar: () => void;
    onOpenExportDialog: () => void;
}) {
    return (
        <>
            <PageHeader
                title={
                    <div className=" -col items-center justify-start">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarFallback>
                                    {customer.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-md flex items-center gap-2">
                                    {customer.name}
                                    <Link
                                        to={"#"}
                                        className="text-xs flex items-center gap-1 hover:underline text-blue-500"
                                    >
                                        <Globe className="w-3 h-3" />{" "}
                                        {customer.domain}
                                    </Link>
                                </CardTitle>
                            </div>
                        </div>
                    </div>
                }
                actions={null}
            />
            <PageHeader
                title="Risk Profile"
                info="Your customer's risk profile helps you instantly to understand their security posture. Monitor your customer's risk profile to ensure they are compliant with your security policies, drill into their risk profile to understand their security posture and take action to improve their security posture."
                actions={
                    <>
                        <Button variant="outline" onClick={onOpenFilterSidebar}>
                            Apply Filter <Filter className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" onClick={onOpenExportDialog}>
                            Export <Download className="w-4 h-4" />
                        </Button>
                    </>
                }
            />
        </>
    );
}