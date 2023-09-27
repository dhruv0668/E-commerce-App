import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout/Layout';
import AdminMenu from '../../../components/Layout/AdminMenu';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Option } = Select



const CraeteProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")


    // get All Category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/user/category/get-category");
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong in getting Category");
        }
    }

    useEffect(() => {
        getAllCategory()
    }, []);

    // create Product Function
    const handleCreate =async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("image", image)
            productData.append("category", category)
            const {data} = await axios.post("/api/user/product/create-product", productData);
            if(data?.success){
                toast.success("Product Created Successfully");
                navigate('/dashboard/admin/products')
            }else{
                toast.error(data?.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    };

    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className='container-fluid m-4 p-4'>
                <div className='row'>
                <div className='col-md-1'></div>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-6'>
                        <h3 className='text-center'>Create Product</h3>
                        <div className='m-1'>
                            <Select bordered={false}
                                placeholder="Select a Category"
                                size='large'
                                showSearch
                                className='form-selet mb-3 col-md-12 border border-dark'
                                onChange={(value) => { setCategory(value) }}>
                                {categories?.map(c => (
                                    <Option key={c._id} value={c._id}> {c.name} </Option>
                                ))}
                            </Select>
                            <div className='mb-3'>
                                <label className='btn btn-outline-dark col-md-12'>
                                    {image ? image.name : "Upload Image"}
                                    <input
                                        type='file'
                                        name='image'
                                        accept='image/*'
                                        onChange={(e) => setImage(e.target.files[0])}
                                        hidden />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {image && (
                                    <div className='text-center'>
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt='product-image'
                                            height={'200px'}
                                            className='img img-responsive' />
                                    </div>
                                )}
                            </div>
                            <div className='mb-3'>
                                <input type='text' 
                                value={name} 
                                placeholder='Write a Name' 
                                className='form-control  border border-dark' 
                                onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className='mb-3'>
                                <input type='text' 
                                value={description} 
                                placeholder='Write a Description' 
                                className='form-control  border border-dark' 
                                onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                            <div className='mb-3'>
                                <input type='number' 
                                value={price} 
                                placeholder='Write a Price' 
                                className='form-control  border border-dark' 
                                onChange={(e) => setPrice(e.target.value)}/>
                            </div>
                            <div className='mb-3'>
                                <input type='number' 
                                value={quantity} 
                                placeholder='Write a Quantity' 
                                className='form-control  border border-dark' 
                                onChange={(e) => setQuantity(e.target.value)}/>
                            </div>
                            <div className='mb-3'>
                            <Select bordered={false}
                                placeholder="Select Shipping"
                                size='large'
                                showSearch
                                className='form-selet mb-3 col-md-12 border border-dark'
                                onChange={(value) => { setShipping(value) }}>
                                
                                <Option value="0">No</Option>
                                <Option value="1">Yes</Option>
                            </Select>
                            </div>
                            <div className='mb-3'>
                                <button onClick={handleCreate} className='btn btn-dark'>Create Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CraeteProduct