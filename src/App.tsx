import { useEffect } from "react";
import { Button } from "./components/ui/button";
import { isTokenExpired, clearAuthData, setupTokenExpiryHandler } from "@/utils/auth";
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        
        if (isTokenExpired()) {
            console.log("Token expired or not present, redirecting to login");
            clearAuthData();
            navigate("/login");
        } else {
            setupTokenExpiryHandler(() => {
                navigate("/login");
            });
        }
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-svh">
            <Button>Click me</Button>
        </div>
    );
}

export default App;