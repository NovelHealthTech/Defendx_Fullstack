export type IPAddress = {
	ip: string;
	owner: string;
	country: string;
	asn: number;
	as_name: string;
	services?: string[];
	sources?: string[];
	score?: number;
	range?: string;
	labels?: string[];
	domains?: { hostname: string; automated_score: number }[]; // For detailed IP response
};

// For static data in DATA.tsx file
export type IPAddressData = {
	source: string;
	ip: string;
	range: string;
	owner: string;
	country: string;
	asn: string;
	asnName: string;
	asnName2: string;
	asnRegistry: string;
	protocol: string;
	labels: string[];
	score?: number;
};

export type IPAddressDetail = {
	ip: string;
	owner: string;
	country: string;
	asn: number;
	as_name: string;
	sources: string[];
	domains: { hostname: string; automated_score: number }[];
};

export type IPRange = {
	sources: string[];
	rangeStart: string;
	rangeEnd: string;
	owner: string;
	autonomousSystem: string;
	autonomousSystemNumber: string;
	country: string;
	ipCount: number;
};

export type Domain = {
	id: number;
	domain: string;
	primary: boolean;
	inactive?: boolean;
	score: number | null;
	grade: string | null;
	scannedOn: string | null;
	firstScanned?: string;
	maxScore?: number;
	scannedOnTime?: string;
	scannedAt?: string;
	ipAddresses?: { ip: string; domains: string[] }[];
	risks?: { title: string; severity: string; description?: string }[];
	checkResults?: any[];
};

export type Vendor = {
	id: string;
	name: string;
	primary_hostname: string;
	score: number;
	automatedScore: number;
	assessmentStatus: string;
};

export type Customer = {
	id: string;
	name: string;
	domain: string;
	logo: string;
	score: number;
	grade: string;
	automatedScore: number;
	automatedGrade: string;
	trend: number;
	trendUp: boolean;
	lastAssessed: string;
};
