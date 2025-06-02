import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
	return (
		<section className="bg-[#292d3c] text-white py-20">
			<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
				{/* Left Column */}
				<div>
					<h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
						Essential Policy <br />
						for <span className="text-white">Cyber</span> <br />
						<span className="text-white">security</span> <br />
						Protection.
					</h1>
					<p className="text-white text-lg mb-8">
						In today's increasingly digital world, cybersecurity is
						paramount. Our company provides cutting-edge solutions
						to protect your digital assets and ensure business
						continuity in the face of evolving cyber threats.
					</p>

					<div className="flex flex-wrap gap-4">
						<Button className="text-white px-6">
							Request A Demo
						</Button>
						<Button variant="ghost" className="text-white gap-2">
							<div className="bg-white text-black rounded-full p-2">
								<Play size={16} />
							</div>
							Watch Intro Video
						</Button>
					</div>
				</div>

				{/* Right Column */}
				<div className="relative">
					{/* Framed image (simulate shield with rounded corners) */}
					<img
						alt="Cybersecurity Expert"
						src="/assets/images/hero-img.png"
						width={500}
						height={600}
						className="object-cover"
					/>
				</div>
			</div>
		</section>
	);
}
