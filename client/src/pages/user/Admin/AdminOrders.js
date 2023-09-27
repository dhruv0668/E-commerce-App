import React, { useState, useEffect } from 'react';
import AdminMenu from '../../../components/Layout/AdminMenu';
import Layout from '../../../components/Layout/Layout';
import { useAuth } from '../../../context/auth';
import moment from "moment";
import axios from 'axios';
import { Select } from 'antd';
const { Option } = Select

const AdminOrders = () => {
    const [status, setStatus] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "Deliverd",
        "Cancle"
    ])
    const [changeStatus, setChangeStatus] = useState("")
    const [order, setOrder] = useState([])
    const [auth, setAuth] = useAuth()

    const getOrder = async () => {
        const { data } = await axios.get("/api/user/all-orders")
        setOrder(data)
    }

    useEffect(() => {
        if (auth?.token) getOrder()
    }, [auth?.token])
    const handleChange = async (orderId, value) => {
        try {
          const { data } = await axios.put(`/api/user/product/order-status/${orderId}`, {
            status: value,
          });
          getOrder();
        } catch (error) {
          console.log(error);
        }
      };
    return (
        <>
            <Layout title={"Dashboard - All Orders"}>
                <div className='container-fluid m-4 p-4'>
                    <div className='row'>
                        <div className='col-md-1'></div>
                        <div className='col-md-3'>
                            <AdminMenu />
                        </div>
                        <div className='col-md-7 col-sm-12'>
                            <h1 className='text-center'>All Oreders</h1>
                            {
                                order?.map((order, index) => {
                                    return (
                                        <div>
                                            <table class="table table-dark table-striped">
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
                                                        <td>
                                                            <Select className='text-light'
                                                                bordered={false}
                                                                onChange={(value) => handleChange(order._id, value)}
                                                                defaultValue={order?.status}>
                                                                {status.map((s, i) => (
                                                                    <Option  key={i} value={s}>
                                                                        {s}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </td>
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
        </>
    )
}

export default AdminOrders