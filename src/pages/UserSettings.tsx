import SidebarLayout from "@/layouts/sidebar-layout";
import UserSettingForm from "@/components/user-setting-form";

export default function UserSettings() {
	return (
		<SidebarLayout
			breadcrumbs={[
				{
					label: "User Settings",
					href: "/user-settings",
				},
			]}
		>
			<UserSettingForm />
		</SidebarLayout>
	);
}
