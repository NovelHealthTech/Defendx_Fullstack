import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

const services = [
	{
		icon: "🌀", // Placeholder icon (can replace with Lucide or SVG)
		title: "Endpoint Security",
		description:
			"Protects end-user devices like laptops, desktops, and mobile devices from cybersecurity threats through advanced security measures.",
	},
	{
		icon: "🔧",
		title: "Security Consulting",
		description:
			"Provides expert advice and strategies to enhance your organization's cybersecurity posture and resilience.",
	},
	{
		icon: "👁️",
		title: "Threat Intelligence Services",
		description:
			"Offers real-time threat intelligence to help organizations proactively defend against emerging cyber threats.",
	},
	{
		icon: "🧠",
		title: "Security Training and Awareness",
		description:
			"Educates employees on cybersecurity best practices to reduce the risk of human error and enhance security awareness.",
	},
	{
		icon: "🌐",
		title: "Security Awareness Training",
		description:
			"Focuses on building a security-conscious culture within your organization through comprehensive training programs.",
	},
	{
		icon: "🛠️",
		title: "Application Security Testing",
		description:
			"Conducts thorough testing of applications to identify and remediate vulnerabilities before they can be exploited.",
	},
];

export default function Features() {
	return (
		<section className="bg-[#292d3c] py-16 px-6 md:px-12" id="services">
			<div className="max-w-7xl mx-auto text-center">
				<p className="text-orange-500 mb-2 text-sm font-semibold">
					Our Services
				</p>
				<h2 className="text-white text-3xl md:text-4xl font-bold mb-12">
					From Your Cyber Security Services.
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{services.map((service, index) => (
						<Card
							key={index}
							className="bg-[#2a2d3a] text-white rounded-2xl shadow-xl hover:shadow-lg transition border-slate-700"
						>
							<CardContent className="p-6 flex flex-col gap-4">
								<div className="text-4xl">{service.icon}</div>
								<h3 className="text-lg font-semibold">
									{service.title}
								</h3>
								<p className="text-sm text-gray-300">
									{service.description}
								</p>

								<button className="mt-auto flex items-center justify-end gap-1 text-sm font-medium text-white hover:text-orange-500 transition cursor-pointer">
									Read More <ArrowUpRight size={14} />
								</button>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
