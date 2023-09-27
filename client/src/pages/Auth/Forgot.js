import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../style/style.css";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // on login

  const handleForgot = async () => {

    try {
      const res = await axios.post('/api/user/forgot-password',{ email, newPassword, answer });

      if (email && newPassword && answer) {
        toast.success("reset successfully");
        navigate("/login")
      }else{
        toast.error("something went wrong")
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Email or Password");
    }

  };

  return (
    <Layout title={"Forgot-Password - Shop Any Time"}>
      <div className="form-container ">
        <form >
          <h4 className="title">Reset Password</h4>
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              placeholder="Enter Your Age"
              required
            />
          </div>
          <button onClick={handleForgot} type="button" className="btn btn-primary mt-3">
            R e s e t
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Forgot