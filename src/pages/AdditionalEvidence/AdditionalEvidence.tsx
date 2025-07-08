import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SidebarLayout from "@/layouts/sidebar-layout";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import DocumentUpload from "@/components/DocumentUpload";
import { useState } from "react";
import RequestDocumentsSheet from "@/components/RequestDocumentsSheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ExternalLink, Globe, Plus } from "lucide-react";
import AddSecurityPageSheet from "@/components/AddSecurityPageSheet";

const customer = {
	name: "Adani Group",
	domain: "adani.com",
	industry: "Asphalt Products Manufacturing",
	rating: 794,
	ratingGrade: "B",
	ratingMax: 950,
	employees: 29200,
	headquarters: "Ahmedabad, GJ",
};

export default function AdditionalEvidence() {
	const [documents, setDocuments] = useState<File[]>([]);
	const [isRequestSheetOpen, setIsRequestSheetOpen] = useState(false);
	const [isAddPageSheetOpen, setIsAddPageSheetOpen] = useState(false);

	const handleDocumentsChange = (files: File[]) => {
		setDocuments(files);
	};
	return (
		<SidebarLayout
			breadcrumbs={[
				{
					label: "Additional Evidence",
					href: "/additional-evidence",
				},
			]}
		>
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
									<a
										href={"#"}
										className="text-xs flex items-center gap-1 hover:underline text-blue-500"
									>
										<Globe className="w-3 h-3" />{" "}
										{customer.domain}
									</a>
								</CardTitle>
							</div>
						</div>
					</div>
				}
				info="Use additional evidence to upload documents, like audit reports or completed security questionnaires, and capture identified risks. You can also review and add Security and Privacy page links to source relevant information for customer risk assessments."
				actions={null}
			/>

			{/* <PageHeader
				title="Additional Evidence"
				info="Use additional evidence to upload documents, like audit reports or completed security questionnaires, and capture identified risks. You can also review and add Security and Privacy page links to source relevant information for customer risk assessments."
				actions={
					<div className="flex items-center gap-2">
						<Button variant="outline">Compare</Button>
						<Button variant="outline">Generate report</Button>
					</div>
				}
			/> */}

			<div className="flex flex-1 flex-col gap-4">
				<Tabs defaultValue="documents" className="w-full">
					<TabsList className="mb-2 h-auto p-2 w-full">
						<TabsTrigger
							value="documents"
							className="flex-col h-auto py-1"
						>
							Documents
						</TabsTrigger>
						<TabsTrigger
							value="security-pages"
							className="flex-col h-auto py-1"
						>
							Security and privacy pages
						</TabsTrigger>
					</TabsList>
					<TabsContent value="documents" className="flex-1">
						<Card className="h-full">
							<CardHeader className="flex flex-row items-center justify-between">
								<CardTitle>Documents</CardTitle>
								<Button
									variant="outline"
									onClick={() => setIsRequestSheetOpen(true)}
								>
									Request documents
								</Button>
							</CardHeader>
							<CardContent>
								<DocumentUpload
									uploadedFiles={documents}
									onFilesChange={handleDocumentsChange}
								/>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="security-pages" className="flex-1">
						<Card className="h-full">
							<CardHeader className="flex flex-row items-center justify-between">
								<CardTitle>
									Security and privacy pages
								</CardTitle>
								<Button
									onClick={() => setIsAddPageSheetOpen(true)}
								>
									<Plus className="mr-2 h-4 w-4" /> Add page
								</Button>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col justify-center items-center h-48 text-center">
									<div className="p-3 rounded-full bg-muted mb-4">
										<ExternalLink className="w-6 h-6 text-muted-foreground" />
									</div>
									<h3 className="text-lg font-semibold mb-1">
										No security and privacy pages found
									</h3>
									<p className="text-muted-foreground text-sm">
										No security and privacy page have been
										found or added for this customer yet.
									</p>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
			<RequestDocumentsSheet
				open={isRequestSheetOpen}
				onOpenChange={setIsRequestSheetOpen}
			/>
			<AddSecurityPageSheet
				open={isAddPageSheetOpen}
				onOpenChange={setIsAddPageSheetOpen}
			/>
		</SidebarLayout>
	);
}
