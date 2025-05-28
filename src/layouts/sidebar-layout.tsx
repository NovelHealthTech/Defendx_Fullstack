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
					</div>
				</header>
				<div className="space-y-4 px-4 py-4">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
