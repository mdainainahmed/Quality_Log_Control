import { Outlet } from "react-router-dom";
import {Header, Footer} from "../index.js";

const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    );
}

export default Layout;