import { Button } from "@/components/ui/button";
import { Users2, Signal } from "lucide-react";

export default function Intro() {
	return (
		<section className="bg-[#292d3c] py-16 px-6 md:px-12" id="about">
			<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
				{/* Images */}
				<div className="relative space-y-6">
					<img
						src="/assets/images/section.png"
						alt="Cyber woman"
						className="rounded-xl shadow-lg w-full md:w-[80%] mx-auto"
					/>
				</div>

				{/* Content */}
				<div>
					<p className="text-orange-500 mb-2 text-sm font-semibold">
						About SecureScan
					</p>
					<h2 className="text-white text-3xl md:text-4xl font-bold mb-6 leading-tight">
						The Comprehensive Solution for Your Needs.
					</h2>
					<p className="text-gray-300 mb-6">
						Organizations are now compelled to implement
						comprehensive cybersecurity strategies to safeguard
						their systems, networks, and data from the relentless
						onslaught of cyber threats. Our solutions ensure the
						protection of privacy and integrity of your digital
						assets.
					</p>

					<div className="space-y-6 mb-8">
						{/* Feature 1 */}
						<div className="flex items-start gap-4">
							<div className="bg-[#2a2d3a] rounded-full p-3">
								<Users2 className="text-orange-500" />
							</div>
							<div>
								<h4 className="text-white font-semibold text-base">
									Highly Professional Members
								</h4>
								<p className="text-gray-400 text-sm">
									Organizations are now forced to implement
									comprehensive cyber security strategies to
									protect their systems,
								</p>
							</div>
						</div>

						{/* Feature 2 */}
						<div className="flex items-start gap-4">
							<div className="bg-[#2a2d3a] rounded-full p-3">
								<Signal className="text-orange-500" />
							</div>
							<div>
								<h4 className="text-white font-semibold text-base">
									Infrastructure Integration Technology
								</h4>
								<p className="text-gray-400 text-sm">
									Organizations are now forced to implement
									comprehensive cyber security strategies to
									protect their systems,
								</p>
							</div>
						</div>
					</div>

					{/* CTA Button */}
					<Button className="bg-gradient-to-r from-purple-600 to-orange-400 text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition">
						➜ Know More About
					</Button>
				</div>
			</div>
		</section>
	);
}
