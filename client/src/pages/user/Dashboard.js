import React from 'react';
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/Routes/UserMenu';
import { useAuth } from '../../context/auth';

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Shop Any Time - Dashboard"}>
        <div className='container-fluid m-4 p-4'>
        <div className='row'>
          <div className='col-md-1'></div>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-7'>
            <div className='card p-3 m-3'>
              <h3> User Name : {auth?.user?.name}</h3>
              <h3> User Email : {auth?.user?.email}</h3>
              <h3> User Address : {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard