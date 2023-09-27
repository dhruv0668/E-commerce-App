import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";


export default function AdminRoutes() {
    const [ok, setok] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get('/api/user/admin-auth',
                {
                    headers: {
                        "Authorization": auth?.token
                    }
                });
            if (res.data.ok) {
                setok(true)
            } else {
                setok(false)
            }
        }
        if( auth?.token) authCheck();
    }, [auth])
    return ok ? <Outlet /> :<Spinner path="" />;
}