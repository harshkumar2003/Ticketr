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
                .then((res) => {
                    setUser(res.data);
                })
                .catch(() => {
                    setUser(false);
                    navigate("/login");
                });
        }
    }, [navigate, setUser, user]);

    if (user === null) {
        return (
            <div className="min-h-screen grid place-items-center bg-black text-white">
                <div className="rounded-xl border border-white/10 bg-zinc-950 px-5 py-3 text-sm text-white/70">
                    Loading workspace...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <TopNavbar />
            <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
                <Sidebar />
                <main className="h-full flex-1 overflow-y-auto p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
