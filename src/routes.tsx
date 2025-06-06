import { lazy } from "react";
import Home from "./pages/Home.tsx";
const Login = lazy(() => import("./pages/Login.tsx"));
const SecurityProfile = lazy(() => import("./pages/SecurityProfile.tsx"));
const UserSettings = lazy(() => import("./pages/UserSettings.tsx"));
const CustomerSummary = lazy(() => import("./pages/CustomerSummary.tsx"));
const CustomerPortfolio = lazy(() => import("./pages/CustomerPortfolio.tsx"));
const QuestionnaireLibrary = lazy(
	() => import("./pages/QuestionnaireLibrary/QuestionnaireLibrary.tsx")
);
const EditQuestionnaire = lazy(
	() => import("./pages/QuestionnaireLibrary/EditQuestionnaire.tsx")
);
const SecurityQuestionnaires = lazy(
	() => import("./pages/SecurityQuestionnaires/SecurityQuestionnaires.tsx")
);
const PreviewQuestionnaire = lazy(
	() => import("./pages/QuestionnaireLibrary/PreviewQuestionnaire.tsx")
);

const SecurityCreateQuestionnaires = lazy(
	() =>
		import("./pages/SecurityQuestionnaires/CreateSecurityQuestionnaire.tsx")
);
const SecurityViewQuestionnaire = lazy(
	() => import("./pages/SecurityQuestionnaires/ViewSecurityQuestionnaire.tsx")
);
const CustomerViewSecurityQuestionnaire = lazy(
	() =>
		import(
			"./pages/SecurityQuestionnaires/CustomerViewSecurityQuestionnaire.tsx"
		)
);

export const routes = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/security-profile",
		element: <SecurityProfile />,
	},
	{
		path: "/user-settings",
		element: <UserSettings />,
	},
	{
		path: "/customer-summary",
		element: <CustomerSummary />,
	},
	{
		path: "/customer-portfolio",
		element: <CustomerPortfolio />,
	},
	{
		path: "/questionnaire-library",
		element: <QuestionnaireLibrary />,
	},
	{
		path: "/questionnaire-library/edit/:id",
		element: <EditQuestionnaire />,
	},
	{
		path: "/questionnaire-library/edit/new",
		element: <EditQuestionnaire />,
	},
	{
		path: "/questionnaire-library/preview/:id",
		element: <PreviewQuestionnaire />,
	},
	{
		path: "/security-questionnaires",
		element: <SecurityQuestionnaires />,
	},
	{
		path: "/security-questionnaires/create",
		element: <SecurityCreateQuestionnaires />,
	},
	{
		path: "/security-questionnaires/:id/edit",
		element: <SecurityViewQuestionnaire />,
	},
	{
		path: "/security-questionnaires/customer-view/:id",
		element: <CustomerViewSecurityQuestionnaire />,
	},
];
