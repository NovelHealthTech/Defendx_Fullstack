import React, { useState } from "react";
import SidebarLayout from "@/layouts/sidebar-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2 } from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router";

// Mock user data
const users = [
	{
		id: 1,
		name: "ankit.sharma@zoominsurancebrokers.com",
		email: "ankit.sharma@zoominsurancebrokers.com",
		role: "Trust Exchange Read only",
		loginType: "Password",
		lastLoggedIn: { date: "Jun 19, 2025", time: "12:31" },
		initials: "AN",
		color: "bg-emerald-400",
	},
	{
		id: 2,
		name: "rahul.n@zoominsurancebrokers.com",
		email: "rahul.n@zoominsurancebrokers.com",
		role: "Admin",
		loginType: "Password",
		lastLoggedIn: { date: "Jun 27, 2025", time: "02:17" },
		initials: "RA",
		color: "bg-gray-400",
	},
	{
		id: 3,
		name: "Ankit Sharma",
		email: "ritesh.aggarwal@zoominsurancebrokers.com",
		role: "Admin",
		loginType: "Password",
		lastLoggedIn: { date: "Jun 26, 2025", time: "10:08" },
		initials: "RI",
		color: "bg-gray-300",
	},
];

const roles = ["Account users", "Collaborators", "Default setting"];

const UserSettings: React.FC = () => {
	const [activeTab, setActiveTab] = useState("Account users");
	const [search, setSearch] = useState("");
	const [mfaEnabled, setMfaEnabled] = useState(false);
	const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
	const [manageRolesDialogOpen, setManageRolesDialogOpen] = useState(false);

	// Filter users by search
	const filteredUsers = users.filter(
		(u) =>
			u.name.toLowerCase().includes(search.toLowerCase()) ||
			u.email.toLowerCase().includes(search.toLowerCase()) ||
			u.role.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<SidebarLayout
			breadcrumbs={[
				{ label: "Settings", href: "#" },
				{ label: "Manage Users", href: "#" },
			]}
		>
			<div className="space-y-4">
				{/* Header Row */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<h1 className="text-xl font-semibold">Manage Users</h1>
					<div className="flex items-center gap-2 flex-wrap">
						<div className="flex items-center gap-2">
							<span className="text-sm text-muted-foreground">
								MFA {mfaEnabled ? "enabled" : "disabled"}
							</span>
							<Switch
								checked={mfaEnabled}
								onCheckedChange={setMfaEnabled}
								aria-label="Toggle MFA"
							/>
						</div>
						<Button
							variant="outline"
							className="font-medium"
							aria-label="Manage roles"
							onClick={() => setManageRolesDialogOpen(true)}
						>
							Manage roles
						</Button>
						<Button
							className="font-medium"
							aria-label="Invite users"
							onClick={() => setInviteDialogOpen(true)}
						>
							+ Invite users
						</Button>
					</div>
				</div>

				{/* Invite Users Dialog */}
				<InviteUsersDialog
					open={inviteDialogOpen}
					onOpenChange={setInviteDialogOpen}
				/>
				{/* Manage Roles Dialog */}
				<ManageRolesDialog
					open={manageRolesDialogOpen}
					onOpenChange={setManageRolesDialogOpen}
				/>

				{/* Tabs */}
				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className="w-full"
				>
					<TabsList className="mb-2 h-auto p-2 w-full">
						{roles.map((role) => (
							<TabsTrigger
								key={role}
								value={role}
								className="flex-col h-auto py-1"
								aria-label={role}
							>
								{role}
							</TabsTrigger>
						))}
					</TabsList>

					{/* Account Users Tab Content */}
					<TabsContent value="Account users">
						{/* Search Bar */}
						<div className="mb-2 flex items-center">
							<Input
								type="text"
								placeholder="Search users by name, email, or role"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="w-full max-w-md"
								aria-label="Search users"
							/>
						</div>
						{/* User Table */}
						<div className="overflow-x-auto border rounded-lg bg-background">
							<table className="min-w-full text-sm">
								<thead>
									<tr className="text-muted-foreground border-b">
										<th className="py-2 px-4 font-normal">
											<input
												type="checkbox"
												aria-label="Select all users"
												tabIndex={0}
											/>
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Name
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Email
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Role
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Login Type
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Last Logged In
										</th>
										<th className="py-2 px-4 font-normal text-center">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{filteredUsers.map((user) => (
										<tr
											key={user.id}
											className="border-b last:border-0 group hover:bg-muted/40"
										>
											<td className="py-3 px-4">
												<input
													type="checkbox"
													aria-label={`Select user ${user.name}`}
													tabIndex={0}
												/>
											</td>
											<td className="py-3 px-4">
												<div className="flex items-center gap-2">
													<Avatar
														className={`w-8 h-8 ${user.color}`}
													>
														<AvatarFallback>
															{user.initials}
														</AvatarFallback>
													</Avatar>
													<span className="font-medium">
														{user.name}
													</span>
												</div>
											</td>
											<td className="py-3 px-4">
												{user.email}
											</td>
											<td className="py-3 px-4">
												<Badge
													variant="outline"
													className={`rounded-full ${
														user.role === "Admin"
															? "bg-blue-50 text-blue-500 border-blue-500"
															: ""
													}`}
												>
													{user.role}
												</Badge>
											</td>
											<td className="py-3 px-4">
												<Badge
													variant="outline"
													className="rounded-full bg-muted text-muted-foreground"
												>
													{user.loginType}
												</Badge>
											</td>
											<td className="py-3 px-4">
												<span>
													{user.lastLoggedIn.date}
												</span>
												<span className="ml-2 text-muted-foreground">
													{user.lastLoggedIn.time}
												</span>
											</td>
											<td className="py-3 px-4 text-center">
												<Link
													to={`/settings/edit-user/${user.id}`}
													aria-label={`Edit user ${user.name}`}
													tabIndex={0}
													className="inline-flex items-center p-1.5 rounded hover:bg-muted"
												>
													<Pencil className="w-4 h-4 text-muted-foreground" />
												</Link>
												<button
													className="inline-flex items-center p-1.5 rounded hover:bg-muted ml-2"
													aria-label={`Delete user ${user.name}`}
													tabIndex={0}
												>
													<Trash2 className="w-4 h-4 text-muted-foreground" />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</TabsContent>

					{/* Collaborators Tab Content */}
					<TabsContent value="Collaborators">
						<div className="text-muted-foreground text-sm py-8 text-center">
							No collaborators found.
						</div>
					</TabsContent>

					{/* Default Setting Tab Content */}
					<TabsContent value="Default setting" className="pt-6">
						<Card>
							<CardHeader>
								<CardTitle>
									Default permissions for new users
								</CardTitle>
								<CardDescription>
									Set the default permission level for new
									users that are automatically added to your
									account.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<DefaultPermissionSelect />
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</SidebarLayout>
	);
};

// DefaultPermissionSelect component
const permissionOptions = [
	{
		value: "read-only",
		label: "Read only",
		color: "bg-yellow-50 text-yellow-700 border-yellow-200",
	},
	{
		value: "trust-exchange-read-only",
		label: "Trust Exchange Read only",
		color: "bg-blue-50 text-blue-700 border-blue-200",
	},
	{
		value: "trust-exchange-standard",
		label: "Trust Exchange Standard",
		color: "bg-orange-50 text-orange-700 border-orange-200",
	},
];

const DefaultPermissionSelect: React.FC = () => {
	const [selected, setSelected] = useState(permissionOptions[1].value);
	return (
		<div className="w-80 max-w-full">
			<Combobox
				options={permissionOptions}
				value={selected}
				onChange={setSelected}
				placeholder="Select permission..."
				searchPlaceholder="Search permissions..."
			/>
		</div>
	);
};

// InviteUsersDialog component
const InviteUsersDialog: React.FC<{
	open: boolean;
	onOpenChange: (open: boolean) => void;
}> = ({ open, onOpenChange }) => {
	const [emails, setEmails] = useState("");
	const isContinueDisabled = emails.trim() === "";
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-lg w-full">
				<DialogHeader>
					<DialogTitle>
						Invite users to Zoom Insurance Brokers
					</DialogTitle>
					<DialogDescription>
						You can invite multiple users by separating them with a
						comma, space, or newline.
					</DialogDescription>
				</DialogHeader>
				<div className="mt-4">
					<label
						htmlFor="invite-emails"
						className="block font-medium mb-2"
					>
						Enter email addresses
					</label>
					<Textarea
						id="invite-emails"
						rows={6}
						value={emails}
						onChange={(e) => setEmails(e.target.value)}
						placeholder=""
						className="resize-none"
						aria-label="Enter email addresses"
					/>
				</div>
				<DialogFooter className="mt-6 flex flex-row justify-end gap-2">
					<DialogClose asChild>
						<Button variant="ghost">Cancel</Button>
					</DialogClose>
					<Button
						disabled={isContinueDisabled}
						className="font-medium"
					>
						Continue and set permissions
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

// ManageRolesDialog component
const roleList = [
	{ label: "Admin", color: "bg-blue-50 text-blue-700", count: 2 },
	{ label: "Read only", color: "bg-yellow-50 text-yellow-700", count: 0 },
	{ label: "Standard", color: "bg-gray-100 text-gray-500", count: 0 },
	{
		label: "Trust Exchange Read only",
		color: "bg-blue-50 text-blue-700",
		count: 1,
	},
	{
		label: "Trust Exchange Standard",
		color: "bg-orange-50 text-orange-700",
		count: 0,
	},
];

const ManageRolesDialog: React.FC<{
	open: boolean;
	onOpenChange: (open: boolean) => void;
}> = ({ open, onOpenChange }) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-xl w-full">
				<DialogHeader>
					<DialogTitle>Manage roles</DialogTitle>
					<DialogDescription>
						Roles help set up permissions in a consistent way, which
						helps keep your UpGuard account secure and compliant.
						They also make it easy to update permissions for a group
						of users.
					</DialogDescription>
				</DialogHeader>
				<div className="divide-y mt-4">
					{roleList.map((role) => (
						<div
							key={role.label}
							className="flex items-center justify-between py-3"
						>
							<Badge
								className={`text-base px-3 py-1 font-medium ${role.color}`}
							>
								{role.label}
							</Badge>
							<div className="flex items-center gap-4">
								<span className="text-blue-700 text-sm font-medium min-w-[70px] text-right">
									{role.count} USER
									{role.count === 1 ? "" : "S"}
								</span>
								<button
									className="p-1.5 rounded hover:bg-muted"
									aria-label={`Edit ${role.label} role`}
									tabIndex={0}
								>
									<Pencil className="w-4 h-4 text-muted-foreground" />
								</button>
								<button
									className="p-1.5 rounded hover:bg-muted"
									aria-label={`Delete ${role.label} role`}
									tabIndex={0}
								>
									<Trash2 className="w-4 h-4 text-muted-foreground" />
								</button>
							</div>
						</div>
					))}
				</div>
				<DialogFooter className="mt-6 flex flex-row justify-end gap-2">
					<DialogClose asChild>
						<Button variant="ghost">Cancel</Button>
					</DialogClose>
					<Button className="font-medium">Create new role</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default UserSettings;
