import React, { useState, useEffect } from 'react';
import AdminMenu from '../../../components/Layout/AdminMenu';
import Layout from '../../../components/Layout/Layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([])

    // get all products

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/user/product/get-product");
            setProducts(data.products)
        } catch (error) {
            console.log(error);
            toast.error("something went wrong")
        }
    }

    //lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout>
            <div className='container-fluid m-4 p-4'>
                <div className='row'>
                <div className='col-md-1'></div>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    
                    <div className='col-md-7'>
                        <h3 className='text-center'>All Product List</h3>

                        <div className='d-flex flex-wrap'>
                            {products?.map(p => (
                                <Link className='product-link' key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                                <div className="card m-3" style={{ width: "20rem" }} >
                                    <img style={{objectFit:"cover"}} height={'300px'}  src={`/api/user/product/product-image/${p._id  }`} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">₹ {p.price}</p>
                                        <p className="card-text">{p.description}</p>
                                    </div>
                                </div>
                                </Link>
                            ))}
                        </div>

                    </div>
                    <div className='col-md-1'></div>
                </div>
            </div>
        </Layout>   
    )
}

export default Products