import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout/Layout';
import AdminMenu from '../../../components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Users = () => {

    const [user, setUser] = useState([])
 
    const getAllUser = async () => {
        try {
            const { data } = await axios.get("/api/user/users/get-user");
            setUser(data.user)
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }

    useEffect(() => {
        getAllUser();
    }, []);

    return (
        <Layout title={"Dashboard - All Users"}>
            <div className='container-fluid m-4 p-4'>
                <div className='row'>
                <div className='col-md-1'></div>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-7 px-5 '>
                        <h3 className='text-center'>All Users List</h3>
                        <div>
                        {user?.map(p => (
                             <div className="card bg-dark m-3 p-4" >
                             <div>
                                 <p className="card-title text-light fs-4">User Name : {p.name}</p>
                                 <p className="card-title text-light fs-4">User Email : {p.email}</p>
                                 <p className="card-title text-light fs-4">User Contact : {p.phone}</p>
                                 <p className="card-title text-light fs-4">User Adderss : {p.address}</p>
                                 <p className="card-title text-light fs-4">Sign Up Date : {p.createdAt}</p>
                             </div>
                         </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users