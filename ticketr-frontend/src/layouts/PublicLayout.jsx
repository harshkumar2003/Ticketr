import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar.jsx";
function PublicLayout(){
    return(
        <>
            <Navbar/>
            <main>
                <Outlet />
            </main>
        </>
    )
}
export default PublicLayout;