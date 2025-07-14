import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import { isTokenExpired, clearAuthData } from "@/utils/auth";

// Auth check function that clears expired tokens
const isAuthenticated = () => {
	const token = localStorage.getItem("token");
	if (!token || isTokenExpired()) {
		clearAuthData();
		return false;
	}
	return true;
};

const Login = lazy(() => import("./pages/Login"));
const SecurityProfile = lazy(() => import("./pages/SecurityProfile"));
const UserSettings = lazy(() => import("./pages/UserSettings"));
const SettingsUser = lazy(() => import("./pages/settings/UserSettings.tsx"));
const CustomerSummary = lazy(() => import("./pages/CustomerSummary"));
const CustomerPortfolio = lazy(() => import("./pages/CustomerPortfolio"));
const QuestionnaireLibrary = lazy(
	() => import("./pages/QuestionnaireLibrary/QuestionnaireLibrary")
);
const EditQuestionnaire = lazy(
	() => import("./pages/QuestionnaireLibrary/EditQuestionnaire")
);
const SecurityQuestionnaires = lazy(
	() => import("./pages/SecurityQuestionnaires/SecurityQuestionnaires")
);
const PreviewQuestionnaire = lazy(
	() => import("./pages/QuestionnaireLibrary/PreviewQuestionnaire")
);
const SecurityCreateQuestionnaires = lazy(
	() => import("./pages/SecurityQuestionnaires/CreateSecurityQuestionnaire")
);
const SecurityViewQuestionnaire = lazy(
	() => import("./pages/SecurityQuestionnaires/ViewSecurityQuestionnaire")
);
const CustomerViewSecurityQuestionnaire = lazy(
	() =>
		import(
			"./pages/SecurityQuestionnaires/CustomerViewSecurityQuestionnaire"
		)
);
const RiskProfile = lazy(() => import("./pages/RiskProfile"));
const RiskAssessments = lazy(
	() => import("./pages/RiskAssessments/RiskAssessments")
);

const CreateRiskAssessment = lazy(
	() => import("./pages/RiskAssessments/CreateRiskAssessment.tsx")
);
const EditRiskAssessment = lazy(
	() => import("./pages/RiskAssessments/EditRiskAssessment.tsx")
);

const IPAddresses = lazy(() => import("./pages/IPAddresses/IPAddresses.tsx"));
const Domains = lazy(() => import("./pages/Domains/Domains.tsx"));
const AdditionalEvidence = lazy(
	() => import("./pages/AdditionalEvidence/AdditionalEvidence.tsx")
);
const SwitchAccount = lazy(() => import("./pages/SwitchAccount.tsx"));
const EditUser = lazy(() => import("./pages/settings/EditUser.tsx"));
const Remediation = lazy(() => import("./pages/Remediation/Remediation.tsx"));
const CreateRemediation = lazy(
	() => import("./pages/Remediation/CreateRemediation.tsx")
);
const ModifiedRisks = lazy(
	() => import("./pages/ModifiedRisks/ModifiedRisks.tsx")
);
const CreateRiskWaiver = lazy(
	() => import("./pages/ModifiedRisks/CreateRiskWaiver.tsx")
);

const FourthParties = lazy(
	() => import("./pages/FourthParties/FourthParties.tsx")
);
const AddFourthParty = lazy(
	() => import("./pages/FourthParties/AddFourthParty.tsx")
);
const Vulnerabilities = lazy(
	() => import("./pages/Vulnerabilities/Vulnerabilities.tsx")
);

const ProtectedRoute = () => {
	return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoute = () => {
	return !isAuthenticated() ? (
		<Outlet />
	) : (
		<Navigate to="/customer-portfolio" replace />
	);
};

export const routes = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <PublicRoute />,
		children: [
			{
				path: "",
				element: <Login />,
			},
		],
	},
	{
		path: "/security-profile",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <SecurityProfile />,
			},
		],
	},
	{
		path: "/user-settings",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <UserSettings />,
			},
		],
	},
	{
		path: "/customer-summary/:id/:domain",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <CustomerSummary />,
			},
		],
	},
	{
		path: "/risk-profile/:id/:domain",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <RiskProfile />,
			},
		],
	},
	{
		path: "/customer-portfolio",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <CustomerPortfolio />,
			},
		],
	},
	{
		path: "/questionnaire-library",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <QuestionnaireLibrary />,
			},
		],
	},
	{
		path: "/questionnaire-library/edit/:id",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <EditQuestionnaire />,
			},
		],
	},
	{
		path: "/questionnaire-library/edit/new",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <EditQuestionnaire />,
			},
		],
	},
	{
		path: "/questionnaire-library/preview/:id",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <PreviewQuestionnaire />,
			},
		],
	},
	{
		path: "/security-questionnaires",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <SecurityQuestionnaires />,
			},
		],
	},
	{
		path: "/security-questionnaires/create",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <SecurityCreateQuestionnaires />,
			},
		],
	},
	{
		path: "/security-questionnaires/:id/edit",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <SecurityViewQuestionnaire />,
			},
		],
	},
	{
		path: "/security-questionnaires/customer-view/:id",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <CustomerViewSecurityQuestionnaire />,
			},
		],
	},
	{
		path: "/risk-assessments",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <RiskAssessments />,
			},
		],
	},
	{
		path: "/risk-assessments/create",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <CreateRiskAssessment />,
			},
		],
	},
	{
		path: "/risk-assessments/:id/edit",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <EditRiskAssessment />,
			},
		],
	},
	{
		path: "/ip-addresses/:id/:domains",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <IPAddresses />,
			},
		],
	},
	{
		path: "/domains/:id/:domains",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <Domains />,
			},
		],
	},
	{
		path: "/additional-evidence",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <AdditionalEvidence />,
			},
		],
	},
	{
		path: "/switch-account",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <SwitchAccount />,
			},
		],
	},
	{
		path: "/settings/user",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <SettingsUser />,
			},
		],
	},
	{
		path: "/settings/edit-user/:id",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <EditUser />,
			},
		],
	},
	{
		path: "/modified-risks",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <ModifiedRisks />,
			},
		],
	},
	{
		path: "/modified-risks/create-risk-waiver",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <CreateRiskWaiver />,
			},
		],
	},
	{
		path: "/remediation",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <Remediation />,
			},
		],
	},
	{
		path: "/remediation/create",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <CreateRemediation />,
			},
		],
	},
	{
		path: "/fourth-parties",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <FourthParties />,
			},
		],
	},
	{
		path: "/fourth-parties/add-fourth-party",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <AddFourthParty />,
			},
		],
	},
	{
		path: "/fourth-parties/edit/:id",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <AddFourthParty />,
			},
		],
	},
	{
		path: "/vulnerabilities",
		element: <ProtectedRoute />,
		children: [
			{
				path: "",
				element: <Vulnerabilities />,
			},
		],
	},
];
