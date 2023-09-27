import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/Routes/UserMenu';
import { useAuth } from '../../context/auth';

const Profile = () => {
    const [auth] = useAuth()
    return (
        <Layout title={"Your Profile"}>
            <div className='container-fluid m-4 p-4'>
                <div className='row'>
                    <div className='col-md-1'></div>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-7'>
                        <h1 className='text-center mb-5'>Your profile</h1>
                        <div className='card bg-dark p-3'>
                            <p className='text-light fs-4'>Your Name : {auth?.user?.name}</p>
                            <p className='text-light fs-4'>Your Email : {auth?.user?.email}</p>
                            <p className='text-light fs-4'>Your Address : {auth?.user?.address}</p>
                            <p className='text-light fs-4'>Your Contact : {auth?.user?.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile