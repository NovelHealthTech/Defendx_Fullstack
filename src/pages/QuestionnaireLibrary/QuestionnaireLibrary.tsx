import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Copy, Edit2, MoreVertical, Info } from "lucide-react";
import SidebarLayout from "@/layouts/sidebar-layout";
import PageHeader from "@/components/PageHeader";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ImportQuestionnaireDialog from "@/components/questionnaires/ImportQuestionnaireDialog";
import { useNavigate } from "react-router";

const TABS = [
    { label: "Show all", value: "all" },
];

export default function QuestionnaireLibrary() {
    const [tab, setTab] = useState("all");
    const [search, setSearch] = useState("");
    const [enabled, setEnabled] = useState<{ [id: number]: boolean }>({});
    const [showDescription, setShowDescription] = useState(true);
    const [importDialogOpen, setImportDialogOpen] = useState(false);
    const [questionnaires, setQuestionnaires] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestionnaires = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("token");
                const response = await axios.post(
                    "https://cyber.defendx.co.in/api/upguard/question-types",
                    {},
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = response.data.data || [];
                // Map API data to your table structure
                const mapped = data.map((q: any) => ({
                    id: q.questionnaire_type_id,
                    name: q.questionnaire_type_name,
                    type: "Default",
                    status: "Published",
                    enabled: true,
                    description: `The "${q.questionnaire_type_name}" questionnaire is designed to assess your organization's policies, controls, and practices in accordance with the "${q.questionnaire_type_name}" framework or standard..`,
                 
                }));
                setQuestionnaires(mapped);
                setEnabled(
                    Object.fromEntries(mapped.map((q: any) => [q.id, q.enabled]))
                );
            } catch (err) {
                setError("Failed to fetch questionnaires.");
            } finally {
                setLoading(false);
            }
        };
        fetchQuestionnaires();
    }, []);

    const filtered = questionnaires.filter((q) => {
        if (tab === "default" && q.type !== "Default") return false;
        if (tab === "custom" && q.type !== "Custom") return false;
        if (
            search &&
            !q.name.toLowerCase().includes(search.toLowerCase()) &&
            !q.description.toLowerCase().includes(search.toLowerCase())
        )
            return false;
        return true;
    });

    return (
        <SidebarLayout
            breadcrumbs={[
                {
                    label: "Questionnaire Library",
                    href: "/questionnaire-library",
                },
            ]}
        >
            <PageHeader
                title="Questionnaire Library"
                info={
                    showDescription
                        ? `The Questionnaire Library allows you to manage the types of questionnaires in your account. Enabling a questionnaire in the library will make it available to send to customers via the Send Questionnaire screen. You can also create custom questionnaires to suit your specific needs.`
                        : undefined
                }
                actions={
                    <div className="flex gap-2 items-center">
                      
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
            {showDescription && (
                <div className="text-xs text-blue-700 dark:text-blue-400 mb-2">
                    <a href="#" className="underline">
                        Learn more about pre-built security questionnaires
                    </a>{" "}
                    &nbsp; &rarr; &nbsp;
                   
                </div>
            )}
            <div className="rounded-xl border bg-card p-4 flex flex-col gap-2 w-full overflow-x-auto">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <Tabs value={tab} onValueChange={setTab} className="">
                        <TabsList>
                            {TABS.map((t) => (
                                <TabsTrigger key={t.value} value={t.value}>
                                    {t.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                    <Input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-56 h-8"
                    />
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="py-8 text-center">Loading...</div>
                    ) : error ? (
                        <div className="py-8 text-center text-red-600">{error}</div>
                    ) : (
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="text-muted-foreground border-b">
                                    <th className="text-left py-2 px-4 font-normal">
                                        Enabled
                                    </th>
                                    <th className="text-left py-2 px-4 font-normal">
                                        Name
                                    </th>
                                    <th className="text-left py-2 px-4 font-normal">
                                        Status
                                    </th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((q) => (
                                    <tr
                                        key={q.id}
                                        className="border-b last:border-0"
                                    >
                                        <td className="py-2 px-4">
                                            <Switch
                                                checked={enabled[q.id]}
                                                onCheckedChange={() =>
                                                    setEnabled((prev) => ({
                                                        ...prev,
                                                        [q.id]: !prev[q.id],
                                                    }))
                                                }
                                                aria-label="Enable questionnaire"
                                            />
                                        </td>
                                        <td className="py-2 px-4 min-w-[220px]">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-foreground leading-tight">
                                                        {q.name}
                                                    </span>
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs px-2 py-0.5"
                                                    >
                                                        {q.type}
                                                    </Badge>
                                                </div>
                                                {q.description && (
                                                    <span className="text-xs text-muted-foreground leading-tight">
                                                        {q.description}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-2 px-4">
                                            <Badge
                                                variant="outline"
                                                className={
                                                    q.status === "Published"
                                                        ? "border-blue-500 text-blue-600"
                                                        : "border-green-500 text-green-600"
                                                }
                                            >
                                                {q.status}
                                            </Badge>
                                        </td>
                                        
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="text-center py-8 text-muted-foreground"
                                        >
                                            No questionnaires found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Import Questionnaire Dialog */}
            <ImportQuestionnaireDialog
                open={importDialogOpen}
                onOpenChange={setImportDialogOpen}
            />
        </SidebarLayout>
    );
}