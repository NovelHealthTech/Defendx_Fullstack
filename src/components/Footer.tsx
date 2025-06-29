export default function Footer() {
	return (
		<>
			<section className="bg-[#1c1f2a] py-20 px-6 md:px-12 text-white">
				<div className="max-w-7xl mx-auto text-center">
					<h3 className="text-orange-400 font-medium mb-2">
						Why Choose Us
					</h3>
					<h2 className="text-3xl md:text-5xl font-bold mb-10">
						Trusted by Enterprises for Excellence in Cybersecurity.
					</h2>

					<div className="grid md:grid-cols-3 gap-10">
						{/* Card 1 */}
						<div className="bg-[#2a2d3a] p-6 rounded-xl hover:shadow-lg transition">
							<div className="mb-4">
								<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-xl font-bold text-black">
									1
								</div>
							</div>
							<h4 className="text-xl font-semibold mb-2">
								Expert Team
							</h4>
							<p className="text-gray-400 text-sm">
								Our certified professionals bring decades of
								experience in network security and threat
								mitigation.
							</p>
						</div>

						{/* Card 2 */}
						<div className="bg-[#2a2d3a] p-6 rounded-xl hover:shadow-lg transition">
							<div className="mb-4">
								<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-xl font-bold text-black">
									2
								</div>
							</div>
							<h4 className="text-xl font-semibold mb-2">
								Proven Results
							</h4>
							<p className="text-gray-400 text-sm">
								Trusted by 100+ companies worldwide for reducing
								cyber risks and ensuring compliance.
							</p>
						</div>

						{/* Card 3 */}
						<div className="bg-[#2a2d3a] p-6 rounded-xl hover:shadow-lg transition">
							<div className="mb-4">
								<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-xl font-bold text-black">
									3
								</div>
							</div>
							<h4 className="text-xl font-semibold mb-2">
								24/7 Monitoring
							</h4>
							<p className="text-gray-400 text-sm">
								Round-the-clock surveillance of your systems
								with real-time alerts and rapid incident
								response.
							</p>
						</div>
					</div>
				</div>
			</section>
			<footer className="bg-[#1c1f2a] text-gray-400 py-8 px-6 md:px-12">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-sm">
						&copy; {new Date().getFullYear()} SecureScan. All rights
						reserved. Protecting your digital world.
					</p>
					<div className="flex space-x-6">
						<a
							href="#"
							className="hover:text-white text-sm transition"
						>
							Privacy Policy
						</a>
						<a
							href="#"
							className="hover:text-white text-sm transition"
						>
							Terms of Service
						</a>
						<a
							href="#"
							className="hover:text-white text-sm transition"
						>
							Contact Us
						</a>
					</div>
				</div>
			</footer>
		</>
	);
}
