import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar.jsx";
function PublicLayout(){
    return(
        <>
            <Navbar/>
            <main className="min-h-[calc(100vh-4rem)]">
                <Outlet />
            </main>
        </>
    )
}
export default PublicLayout;
