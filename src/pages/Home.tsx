import { Link } from "react-router";
import { GalleryVerticalEnd } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LoginForm } from "@/components/login-form";

const Home = () => {
	return (
		<>
			{/* <Header />
			<Hero />
			<Intro />
			<Features />
			<Footer /> */}
			<div className="grid min-h-svh lg:grid-cols-2">
				<div className="flex flex-col gap-4 p-6 md:p-10">
					<div className="flex justify-between w-full gap-2">
						<Link
							to="/"
							className="flex items-center gap-2 font-medium"
						>
							<div className="flex items-center justify-center">
								<img
									src={`/assets/images/defend_x_logo.png`}
									alt="Defend X Logo"
									className="w-80 h-20"
								/>
							</div>

						</Link>
						<ThemeSwitcher />
					</div>
					<div className="flex flex-1 items-center justify-center">
						<div className="w-full max-w-xs">
							<LoginForm />
						</div>
					</div>
				</div>
				<div className="relative hidden bg-muted lg:block">
					<img
						src="/assets/images/cybersecurity1.jpg"
						alt="Image"
						className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
					/>
				</div>
			</div>
		</>
	);
};

export default Home;
