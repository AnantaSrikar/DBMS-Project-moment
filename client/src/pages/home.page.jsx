import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRole } from "../context";
import AdminHome from "../components/admin.home";
import StudentHome from "../components/student.home";
import NavBar from "../components/navbar";

const HomePage = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        const store = JSON.parse(localStorage.getItem("login"));
        if (!(store && store.login)) {
            navigate("/login");
        }
    }, []);
    const [role, handleRole] = useRole();
    return (
        <div>
            <NavBar />
            {role === "admin" ? <AdminHome /> : <StudentHome />}
        </div>
    );
};

export default HomePage;
