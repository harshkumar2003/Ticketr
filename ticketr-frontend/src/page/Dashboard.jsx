import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "../component/Navbar.jsx";
import api from "../api/api.js";


function Dashboard() {
    const API = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();useEffect(() => {
        const fetchTickets = async () => {
            try {
                console.log("Fetching tickets..."); // 🔥 debug line

                const res = await api.get("/tickets");

                console.log("Response:", res.data);
            } catch (err) {
                console.error("Error:", err.response?.data || err.message);
            }
        };

        fetchTickets();
    }, []);


    const fetchTickets = async () => {
        try {
            const res = await api.get("/api/tickets");
            console.log(res.data);
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };
    return (
        <>
            <div className="text-white">

            </div>
        </>
    )
}
export default Dashboard;