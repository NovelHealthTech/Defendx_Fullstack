export type IPAddress = {
	source: string;
	ip: string;
	range: string;
	owner: string;
	country: string;
	score?: number;
	asn: string;
	asnName: string;
	asnName2: string;
	asnRegistry: string;
	protocol: string;
	labels: string[];
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
