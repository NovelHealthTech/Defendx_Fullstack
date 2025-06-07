import { LoginForm } from "@/components/login-form";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Link } from "react-router";

const Login = () => {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-between w-full gap-2">
					<Link
						to="/"
						className="flex items-center gap-2 font-medium"
					>
						<div className="flex h-12 w-12 items-center justify-center">
							<img
								src={`/assets/images/favicon.png`}
								alt="Defend X Logo"
								className=""
							/>
						</div>
						DefendX
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
	);
};

export default Login;
