import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserSettingForm() {
	const [name, setName] = React.useState("John Doe");
	const [email, setEmail] = React.useState("john@example.com");
	const [notificationsEnabled] = React.useState(true);

	const [image, setImage] = React.useState<string | null>(null);
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(URL.createObjectURL(file));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Handle form submission
		console.log({
			name,
			email,
			notificationsEnabled,
			image,
			password,
			confirmPassword,
		});
	};
	return (
		<form onSubmit={handleSubmit} className="max-w-xl ml-3 space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Profile</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center gap-4">
						<Avatar className="h-16 w-16">
							<AvatarImage
								src={image || undefined}
								alt="Profile"
							/>
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
						<Input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
						/>
					</div>

					<div className="grid gap-4">
						<div className="grid gap-1">
							<Label htmlFor="name">Full Name</Label>
							<Input
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="grid gap-1">
							<Label htmlFor="email">Email Address</Label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						{/* Add password field */}
						<div className="grid gap-1">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="grid gap-1">
							<Label htmlFor="confirmPassword">
								Confirm Password
							</Label>
							<Input
								id="confirmPassword"
								type="password"
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* <Card>
				<CardHeader>
					<CardTitle>Settings</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<Label htmlFor="notifications">
							Enable Notifications
						</Label>
						<Switch
							id="notifications"
							checked={notificationsEnabled}
							onCheckedChange={setNotificationsEnabled}
						/>
					</div>
				</CardContent>
			</Card> */}

			<div className="flex justify-end gap-4">
				<Button type="button" variant="outline">
					Cancel
				</Button>
				<Button type="submit">Save Changes</Button>
			</div>
		</form>
	);
}
