import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import "../../style/style.css";
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // on login

    const handleSubmit = async () => {

        try {
            const res = await axios.post('/api/user/login',
                { email, password });
            if (res.data.success) {
                toast.success("login successfully");
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data))
                localStorage.setItem('user_id', JSON.stringify(res.data.user_id))
                navigate(location.state || "/")
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Invalid Email or Password");
        }

    };

    return (
        <Layout title={"Login - Shop Any Time"}>
            <div className="form-container ">
                <form >
                    <h4 className="title">Login Form</h4>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter Your Email "
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    <div>
                        <Link className='forgot' to={"/forgot-password"}  >
                            Forgot Password
                        </Link>
                    </div>
                    <button onClick={handleSubmit} type="button" className="btn btn-primary mt-3">
                        L o g i n
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default Login;