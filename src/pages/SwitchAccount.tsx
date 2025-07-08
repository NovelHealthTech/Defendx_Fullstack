import { useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { useMemo, useState } from "react";
import SidebarLayout from "@/layouts/sidebar-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

function useQuery() {
	const { search } = useLocation();
	return useMemo(() => new URLSearchParams(search), [search]);
}

export default function SwitchAccount() {
	const query = useQuery();
	const email = query.get("email");

	const [name, setName] = useState("John Doe");
	const [lname, setLname] = useState("Doe");
	const [openChangePasswordDialog, setOpenChangePasswordDialog] =
		useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Handle form submission
		console.log({
			name,
			email,
			lname,
		});
	};

	return (
		<SidebarLayout
			breadcrumbs={[
				{
					label: "User Settings",
					href: "/user-settings",
				},
			]}
		>
			<form onSubmit={handleSubmit} className="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							Update Account{" "}
							<p className="text-sm text-muted-foreground">
								({email})
							</p>
						</CardTitle>
						<CardDescription>
							Update your account information here.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="grid gap-1">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="grid gap-1">
								<Label htmlFor="email">Last Name</Label>
								<Input
									id="email"
									type="email"
									value={lname}
									onChange={(e) => setLname(e.target.value)}
								/>
							</div>
						</div>
						<Button type="submit">Update Profile</Button>
					</CardContent>
				</Card>
			</form>
			<h2>Change Password</h2>
			<p>
				In order to change your password, you must contact your account
				administrator.
			</p>
			<Button
				type="button"
				variant="outline"
				onClick={() => {
					setOpenChangePasswordDialog(true);
				}}
			>
				Request Password Change
			</Button>
			<Dialog
				open={openChangePasswordDialog}
				onOpenChange={setOpenChangePasswordDialog}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Password Change</DialogTitle>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="button">Confirm</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</SidebarLayout>
	);
}
