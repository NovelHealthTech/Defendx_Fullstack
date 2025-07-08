import { AppSidebar } from "@/components/app-sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const mockAccounts = [
	{ name: "Digit Insurance", email: "user@digitinsurance.com" },
	{
		name: "Zoom Insurance Brokers",
		email: "rahul.n@zoominsurancebrokers.com",
	},
];
const currentAccountEmail = "rahul.n@zoominsurancebrokers.com";

export default function SidebarLayout({
	children,
	breadcrumbs,
}: {
	children: React.ReactNode;
	breadcrumbs?: {
		label: string;
		href: string;
	}[];
}) {
	const [currentAccount] = useState(
		mockAccounts.find((a) => a.email === currentAccountEmail) ||
			mockAccounts[0]
	);

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center justify-between gap-2">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 h-4"
						/>
						<Breadcrumb>
							<BreadcrumbList>
								{breadcrumbs?.map((breadcrumb, index) => {
									if (index === breadcrumbs.length - 1) {
										return (
											<BreadcrumbItem
												key={breadcrumb.label}
											>
												<BreadcrumbPage>
													{breadcrumb.label}
												</BreadcrumbPage>
											</BreadcrumbItem>
										);
									}
									return (
										<>
											<BreadcrumbItem
												key={breadcrumb.label}
											>
												<BreadcrumbLink
													href={breadcrumb.href}
												>
													{breadcrumb.label}
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator className="hidden md:block" />
										</>
									);
								})}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<div className="flex items-center gap-2 px-4">
						<ThemeSwitcher />
						<Button
							variant="ghost"
							size="icon"
							className="h-7 w-7"
							asChild
						>
							<Link to="/settings/user">
								<Settings />
							</Link>
						</Button>
						{/* Account Dropdown using Shadcn */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button
									className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
									aria-label="Account menu"
									type="button"
								>
									<span className="truncate max-w-[140px]">
										{currentAccount.name}
									</span>
									<svg
										className="w-4 h-4 ml-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="min-w-64"
							>
								<DropdownMenuLabel className="truncate text-xs font-normal px-4 py-2">
									{currentAccount.email}
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									className="px-4 py-2"
									onSelect={(e) => e.preventDefault()}
								>
									Audit Log
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuLabel className="px-4 py-1 text-xs text-gray-400 select-none">
									Switch account
								</DropdownMenuLabel>
								{mockAccounts.map((account) => (
									<DropdownMenuItem
										asChild
										key={account.email}
										className="px-4 py-2"
									>
										<Link
											to={`/switch-account?email=${account.email}`}
										>
											{account.name}
										</Link>
									</DropdownMenuItem>
								))}
								<DropdownMenuSeparator />
								<DropdownMenuItem
									className="px-4 py-2 text-red-600"
									onSelect={(e) => e.preventDefault()}
								>
									Sign out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>
				<div className="space-y-4 px-4 py-4">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
