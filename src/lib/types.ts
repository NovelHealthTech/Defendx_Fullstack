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
	ipAddresses?: { ip: string; domains: string[] }[];
	risks?: { title: string; severity: string; description?: string }[];
};
