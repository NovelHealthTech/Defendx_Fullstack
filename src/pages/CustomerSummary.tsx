import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar
} from "recharts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SidebarLayout from "@/layouts/sidebar-layout";
import {
    Building2,
    Globe,
    ShieldCheck,
    Star,
    Users,
    MapPin,
    FileCheck2,
    FileWarning,
    FolderKanban,
    ListChecks,
    FileText,
    AlertTriangle,
    CheckCircle2,
    PieChart as PieChartIcon,
    Info
} from "lucide-react";

// Helper to get grade
function getGrade(score: number) {
    if (score >= 800) return "A";
    if (score >= 650) return "B";
    if (score >= 500) return "C";
    return "D";
}

export default function CustomerSummary() {
    const [customer, setCustomer] = useState<any>(null);
    const [riskBreakdown, setRiskBreakdown] = useState([
        { label: "Critical", value: 0, color: "#dc2626" },
        { label: "High", value: 0, color: "#f59e42" },
        { label: "Medium", value: 0, color: "#fbbf24" },
        { label: "Low", value: 0, color: "#22c55e" },
    ]);
    const [pieData, setPieData] = useState([
        { name: "IP/Domain Reputation", value: 0, color: "#22c55e" },
        { name: "Encryption", value: 0, color: "#fbbf24" },
        { name: "Vulnerability Management", value: 0, color: "#22c55e" },
        { name: "Attack Surface", value: 0, color: "#22c55e" },
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const customerId = localStorage.getItem("customerId");
            if (!token || !customerId) {
                setLoading(false);
                return;
            }
            try {
                const res = await fetch(
                    "https://cyber.defendx.co.in/api/upguard/customer-summary",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ customer_id: Number(customerId) }),
                    }
                );
                const json = await res.json();
                if (json.success && json.data) {
                    const data = json.data;
                    setCustomer({
                        ...data,
                        name: String(data.name ?? ""),
                        domain: String(data.primary_hostname ?? ""),
                        industry: String(data.industry_sector ?? "-"),
                        rating: Number(data.score ?? 0),
                        ratingGrade: getGrade(Number(data.score ?? 0)),
                        ratingMax: 950,
                        employees: "-",
                        headquarters: "-",
                        contractEndDate: String(data.attributes?.["Contract end date"] ?? "-"),
                        internalOwner: String(data.attributes?.["Internal owner"] ?? "-"),
                        domain_count_active: Number(data.domain_count_active ?? 0),
                    });
                    setRiskBreakdown([
                        { label: "Critical", value: Number(data.overall_risk_counts.critical ?? 0), color: "#dc2626" },
                        { label: "High", value: Number(data.overall_risk_counts.high ?? 0), color: "#f59e42" },
                        { label: "Medium", value: Number(data.overall_risk_counts.medium ?? 0), color: "#fbbf24" },
                        { label: "Low", value: Number(data.overall_risk_counts.low ?? 0), color: "#22c55e" },
                    ]);
                    setPieData([
                        { name: "IP/Domain Reputation", value: Number(data.categoryScores.ipDomainReputation ?? 0), color: "#22c55e" },
                        { name: "Encryption", value: Number(data.categoryScores.encryption ?? 0), color: "#fbbf24" },
                        { name: "Vulnerability Management", value: Number(data.categoryScores.vulnerabilityManagement ?? 0), color: "#22c55e" },
                        { name: "Attack Surface", value: Number(data.categoryScores.attackSurface ?? 0), color: "#22c55e" },
                    ]);
                }
            } catch (e) {
                // handle error
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    // Dummy riskManagement, update if you have API data for this
    const riskManagement = [
        { title: "Continue your risk assessment", status: "In Progress" },
        { title: "Remediation", complete: 0, inProgress: 0 },
        { title: "Additional Evidence", uploaded: 0, shared: 0, requested: 0 },
        { title: "Domains and IPs", active: customer?.domain_count_active ?? 0 },
        { title: "Security Questionnaires", complete: 0, inProgress: 0, shared: 0 },
    ];

    if (loading) return <div>Loading...</div>;
    if (!customer) return <div>No customer data found.</div>;

    function CustomerHeader() {
        return (
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-muted-foreground" /> Customer
                    Summary
                </h2>
                <div className="flex flex-row items-center gap-4">
                    <Avatar>
                        <AvatarFallback>{customer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-muted-foreground" />{" "}
                            {customer.name}
                        </CardTitle>
                        <div className="text-muted-foreground text-sm flex items-center gap-1">
                            <Globe className="w-4 h-4" /> {customer.domain}
                        </div>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className="text-lg px-3 py-1 border-green-500 text-green-600 flex items-center gap-1"
                        >
                            <ShieldCheck className="w-4 h-4" />
                            {customer.ratingGrade}
                        </Badge>
                        <span className="text-3xl font-bold text-green-600 flex items-center gap-1">
                            <Star className="w-5 h-5 text-yellow-400" />
                            {customer.rating}
                        </span>
                        <span className="text-muted-foreground self-end">
                            / {customer.ratingMax}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    function RiskOverview() {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />{" "}
                        Current Risks by Severity
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex gap-6">
                    {riskBreakdown.map((risk) => (
                        <div
                            key={risk.label}
                            className="flex flex-col items-center"
                        >
                            <Badge
                                style={{
                                    backgroundColor: risk.color,
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    minWidth: 56,
                                    justifyContent: "center",
                                }}
                                className="text-white mb-1 flex items-center gap-1 py-3 px-4"
                            >
                                {risk.label === "Critical" && (
                                    <AlertTriangle className="w-4 h-4 mr-1" />
                                )}
                                {risk.label === "High" && (
                                    <FileWarning className="w-4 h-4 mr-1" />
                                )}
                                {risk.label === "Medium" && (
                                    <FolderKanban className="w-4 h-4 mr-1" />
                                )}
                                {risk.label === "Low" && (
                                    <CheckCircle2 className="w-4 h-4 mr-1" />
                                )}
                                {risk.value}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                                {risk.label}
                            </span>
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    function RiskManagementSection() {
        const icons = [
            <ListChecks className="w-4 h-4 mr-1" key="assessment" />,
            <FileCheck2 className="w-4 h-4 mr-1" key="remediation" />,
            <FileText className="w-4 h-4 mr-1" key="evidence" />,
            <Globe className="w-4 h-4 mr-1" key="domains" />,
            <FolderKanban className="w-4 h-4 mr-1" key="questionnaires" />,
        ];
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-green-600" /> Risk
                        Management
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {riskManagement.map((item, idx) => (
                            <Card key={idx} className="">
                                <CardContent className="">
                                    <div className="font-medium mb-2 flex items-center gap-1">
                                        {icons[idx]} {item.title}
                                    </div>
                                    {item.status && (
                                        <Badge variant="outline">
                                            {item.status}
                                        </Badge>
                                    )}
                                    {item.complete !== undefined && (
                                        <div className="mt-2 text-sm text-muted-foreground">
                                            {item.complete} complete,{" "}
                                            {item.inProgress} in progress
                                        </div>
                                    )}
                                    {item.active !== undefined && (
                                        <div className="mt-2 text-sm text-muted-foreground">
                                            {item.active} active
                                        </div>
                                    )}
                                    {item.uploaded !== undefined && (
                                        <div className="mt-2 text-sm text-muted-foreground">
                                            {item.uploaded} uploaded, {item.shared}{" "}
                                            shared, {item.requested} requested
                                        </div>
                                    )}
                                    {item.complete !== undefined && (
                                        <Progress value={item.complete} />
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    function CompanyProfile() {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-muted-foreground" />{" "}
                        Company Profile
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <Building2 className="w-4 h-4" />
                                <span className="font-medium">Name:</span>{" "}
                                {customer.name}
                            </div>
                            <div className="mb-2 flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                <span className="font-medium">
                                    Primary domain:
                                </span>{" "}
                                {customer.domain}
                            </div>
                            <div className="mb-2 flex items-center gap-2">
                                <FolderKanban className="w-4 h-4" />
                                <span className="font-medium">Industry:</span>{" "}
                                {customer.industry}
                            </div>
                            <div className="mb-2 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4" />
                                <span className="font-medium">
                                    Overall security rating:
                                </span>{" "}
                                <Badge variant="outline">
                                    {customer.ratingGrade} {customer.rating}
                                </Badge>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span className="font-medium">Employees:</span>{" "}
                                {customer.employees}
                            </div>
                            <div className="mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span className="font-medium">
                                    Headquarters:
                                </span>{" "}
                                {customer.headquarters}
                            </div>
                            <div className="mb-2 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                <span className="font-medium">
                                    Contract end date:
                                </span>{" "}
                                {customer.contractEndDate}
                            </div>
                            <div className="mb-2 flex items-center gap-2">
                                <ListChecks className="w-4 h-4" />
                                <span className="font-medium">
                                    Internal owner:
                                </span>{" "}
                                {customer.internalOwner}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // --- Score by Epoch (Spider/Radar Chart) Section ---
    function ScoreByEpochSection() {
        const [visibleEpochs, setVisibleEpochs] = useState<string[]>(
            customer?.scores_by_epoch?.map((e: any) => e.epoch) || []
        );

        if (!customer?.scores_by_epoch) return null;

        // Get all metric keys except 'epoch', 'when', and 'overall'
        const metrics = Object.keys(customer.scores_by_epoch[0] || {})
            .filter(
                (k) =>
                    !["epoch", "when", "overall"].includes(k)
            );

        // Prepare data for RadarChart: one entry per metric, each epoch as a key
        const radarData = metrics.map((metric) => {
            const entry: any = { metric: metric.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()) };
            customer.scores_by_epoch.forEach((epochObj: any) => {
                entry[epochObj.epoch] = epochObj[metric];
            });
            return entry;
        });

        // Colors for each epoch line
        const epochColors = [
            "#2563eb", // blue
            "#22c55e", // green
            "#f59e42", // orange
            "#dc2626", // red
            "#a21caf", // purple
            "#0ea5e9", // sky
        ];

        // Epoch toggles
        const handleEpochToggle = (epoch: string) => {
            setVisibleEpochs((prev) =>
                prev.includes(epoch)
                    ? prev.filter((e) => e !== epoch)
                    : [...prev, epoch]
            );
        };

        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PieChartIcon className="w-5 h-5 text-blue-500" />
                        Score by Epoch
                        <span className="ml-2 cursor-pointer" title="Compare security scores for different time periods across multiple metrics. Toggle lines to focus on specific epochs.">
                            <Info className="w-4 h-4 text-muted-foreground" />
                        </span>
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {customer.scores_by_epoch.map((epochObj: any, idx: number) => (
                            <label key={epochObj.epoch} className="flex items-center gap-1 text-sm">
                                <input
                                    type="checkbox"
                                    checked={visibleEpochs.includes(epochObj.epoch)}
                                    onChange={() => handleEpochToggle(epochObj.epoch)}
                                />
                                <span style={{ color: epochColors[idx % epochColors.length] }}>
                                    {epochObj.epoch}
                                </span>
                            </label>
                        ))}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="w-full h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={radarData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 1000]} />
                                {customer.scores_by_epoch.map((epochObj: any, idx: number) =>
                                    visibleEpochs.includes(epochObj.epoch) ? (
                                        <Radar
                                            key={epochObj.epoch}
                                            name={epochObj.epoch}
                                            dataKey={epochObj.epoch}
                                            stroke={epochColors[idx % epochColors.length]}
                                            fill={epochColors[idx % epochColors.length]}
                                            fillOpacity={0.2}
                                        />
                                    ) : null
                                )}
                                <Legend />
                                <Tooltip />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                        <Info className="w-4 h-4 mt-0.5" title="What is Score by Epoch?" />
                        <span>
                            <b>Score by Epoch</b> shows how your security scores for different metrics (like website, email, network, etc.) have changed over time. Toggle epochs above to compare or focus on specific periods.
                        </span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // --- Risk Ratings Overview (Bar Chart) Section ---
    function RiskCharts() {
        const [visibleSeverities, setVisibleSeverities] = useState<string[]>([
            "Critical", "High", "Medium", "Low"
        ]);
        const categoryRiskCounts = customer?.category_risk_counts || {};

        // Prepare data for the bar chart
        const chartData = Object.keys(categoryRiskCounts).map((cat) => ({
            category: cat.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
            Critical: categoryRiskCounts[cat].critical,
            High: categoryRiskCounts[cat].high,
            Medium: categoryRiskCounts[cat].medium,
            Low: categoryRiskCounts[cat].low,
        }));

        const severityColors: Record<string, string> = {
            Critical: "#dc2626",
            High: "#f59e42",
            Medium: "#fbbf24",
            Low: "#22c55e",
        };

        // Severity toggles
        const handleSeverityToggle = (severity: string) => {
            setVisibleSeverities((prev) =>
                prev.includes(severity)
                    ? prev.filter((s) => s !== severity)
                    : [...prev, severity]
            );
        };

        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PieChartIcon className="w-5 h-5 text-blue-500" />
                        Risk Ratings Overview
                        <span className="ml-2 cursor-pointer" title="See the number of risks by severity for each security category. Toggle severities to focus on specific risk levels.">
                            <Info className="w-4 h-4 text-muted-foreground" />
                        </span>
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {["Critical", "High", "Medium", "Low"].map((severity) => (
                            <label key={severity} className="flex items-center gap-1 text-sm">
                                <input
                                    type="checkbox"
                                    checked={visibleSeverities.includes(severity)}
                                    onChange={() => handleSeverityToggle(severity)}
                                />
                                <span style={{ color: severityColors[severity] }}>{severity}</span>
                            </label>
                        ))}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="w-full h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                {visibleSeverities.includes("Critical") && (
                                    <Bar dataKey="Critical" stackId="a" fill={severityColors.Critical} />
                                )}
                                {visibleSeverities.includes("High") && (
                                    <Bar dataKey="High" stackId="a" fill={severityColors.High} />
                                )}
                                {visibleSeverities.includes("Medium") && (
                                    <Bar dataKey="Medium" stackId="a" fill={severityColors.Medium} />
                                )}
                                {visibleSeverities.includes("Low") && (
                                    <Bar dataKey="Low" stackId="a" fill={severityColors.Low} />
                                )}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                        <Info className="w-4 h-4 mt-0.5" title="What is Risk Ratings Overview?" />
                        <span>
                            <b>Risk Ratings Overview</b> displays the count of risks by severity (Critical, High, Medium, Low) for each security category. Toggle severities above to compare or focus on specific risk levels.
                        </span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <SidebarLayout
            breadcrumbs={[
                {
                    label: "Customer Summary",
                    href: "/customer-summary",
                },
            ]}
        >
            <div className="space-y-4">
                <CustomerHeader />
                <RiskOverview />
                <RiskManagementSection />
                <CompanyProfile />
                <ScoreByEpochSection />
                <RiskCharts />
            </div>
        </SidebarLayout>
    );
}