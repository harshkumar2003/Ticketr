import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TopNavbar from '../component/TopNavbar.jsx';
import Sidebar from "../component/Sidebar.jsx";
import { getMe } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const AppLayout = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            getMe()
                .then(res => {
                    console.log("ME RESPONSE:", res.data);
                    setUser(res.data);
                })
                .catch(err => {
                    console.log("ME ERROR:", err.response?.status);
                    setUser(false);
                    navigate("/login");
                });
        }
    }, [user]);

    if (user === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-screen flex flex-col">
            <TopNavbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-6 overflow-y-auto ">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
