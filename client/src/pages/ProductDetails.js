import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState({})

    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug])

    // get product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/user/product/get-product/${params.slug}`)
            setProduct(data?.products)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <>
                <h1 className='text-center p-2'>Product Details</h1>
                <div className='container my-5'>
                    <div className='row'>
                        <div className='col-md-6 bt-left p-5'>
                            <img style={{ objectFit: "cover" }} height={'300px'} src={`/api/user/product/product-image/${product._id}`} alt={product.name} className="card-img-top" />
                        </div>
                        <div className='col-md-6 p-5'>
                            <p className='fs-5'>Product Name : {product.name}</p>
                            <p className='fs-5'>Description : {product.description}</p>
                            <p className='fs-5'>Price : $  {product.price}</p>
                            <button className='btn btn-dark' onClick={() => {
                                toast.success("Product Add to Cart Successfully") 
                            }}>
                                 Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    )
}

export default ProductDetails;