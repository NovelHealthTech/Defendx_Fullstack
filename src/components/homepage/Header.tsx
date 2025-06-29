import { ThemeSwitcher } from "../theme-switcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import { Link } from "react-router";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "#about", label: "About" },
	{ href: "#services", label: "Services" },
	{ href: "#contact", label: "Contact" },
];

export default function Header() {
	return (
		<header className="bg-[#1c1f2a] text-white px-4 py-4 md:py-6 md:px-12 flex items-center justify-between">
			<Link to="/" className="text-2xl font-bold">
				SecureScan
			</Link>

			{/* Desktop Nav */}
			<nav className="hidden md:flex space-x-8 items-center">
				<div className="flex justify-between items-center relative">
					<ThemeSwitcher />
				</div>
				{navLinks.map((link) => (
					<Link
						key={link.href}
						to={link.href}
						className="hover:text-orange-400 transition"
					>
						{link.label}
					</Link>
				))}
				<Button asChild>
					<Link to="/login">Login</Link>
				</Button>
			</nav>

			{/* Mobile Menu */}
			<div className="md:hidden">
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon">
							<Menu className="w-6 h-6 text-white" />
						</Button>
					</SheetTrigger>
					<SheetContent
						side="right"
						className="bg-[#1c1f2a] text-white w-64 border-slate-700 px-4"
					>
						<nav className="mt-8 space-y-6">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									to={link.href}
									className="block text-lg hover:text-orange-400 transition"
								>
									{link.label}
								</Link>
							))}
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
