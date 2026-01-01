import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "../component/Navbar.jsx";

function Dashboard() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if(!token)
            navigate("/login");

        console.log(token);
        console.log(role);
    },[])
    return (
        <>
            <div className="text-white">
                <Navbar/>
            </div>
        </>
    )
}
export default Dashboard;