import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/Routes/UserMenu';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from "moment";

const Orders = () => {
    const [order, setOrder] = useState([])
    const [auth, setAuth] = useAuth()

    const getOrder = async () => {
        let ID = JSON.parse(localStorage.getItem("user_id"))
        const { data } = await axios.post("/api/user/orders", {
            ID
        })
            setOrder(data)
    }

    useEffect(() => {
        if (auth?.token) getOrder()
    }, [auth?.token])


    return (
        <Layout title={"Your Orders"}>
            <div className='container-fluid m-4 p-4'>
                <div className='row'>
                    <div className='col-md-1'></div>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-7'>
                        <h1 className='text-center mb-5'>All Oreders</h1>
                        {
                            order?.map((order, index) => {
                                return (
                                    <div>
                                        <table className="table table-dark table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Payment</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Transaction_Id</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{order?.status}</td>
                                                    <td>{moment(order?.createAt).fromNow()}</td>
                                                    <td>{order?.payment.success ? "Success" : "Failed"}</td>
                                                    <td>{order?.products?.length}</td>
                                                    <td>{order?.payment?.transaction?.amount}</td>
                                                    <td>{order?.payment?.transaction?.id}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders