import React, { useEffect, useState } from "react";
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/AddCart';
import { useAuth } from '../context/auth';
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const [clientToken, setClientToken] = useState("")
    const [instance, setInstance] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    // total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => { total = total + item.price });
            return total
        } catch (error) {
            console.log(error)
        }
    }

    const totalProduct = () => {
        try {
            let total = cart?.length;
            return total
        } catch (error) {
            console.log(error)
        }
    }

    //remove item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }
    //get payment token
    const getToken = async () => {
        try {
            const { data } = await axios.get("/api/user/product/braintree/token")
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getToken()
    }, [auth?.token])

    //handle payment
    const handlePayment = async () => {
        try {
            let ID = JSON.parse(localStorage.getItem("user_id"))
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post("/api/user/product/braintree/payment", {
                nonce,
                cart,
                ID,
            });
            setLoading(false);
            console.log(data)
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    return (
        <Layout>
            <>
                <div className='container mt-4'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h1 className='text-center p-2'>
                                {`Hello ${auth?.token && auth?.user?.name}`}
                            </h1>
                            <h3 hidden={cart.length !== 0} className="text-center">Cart is Empty</h3>
                        </div>
                    </div>
                    <div className='row my-4'>
                        <div className='col-md-9'>
                            <div className='row'>
                                {
                                    cart?.map((p) => (
                                        <div className='row borderr bg-dark'>
                                            <div className='col-md-4 py-3'>
                                                <img style={{ objectFit: "cover" }} 
                                                height={'200px'} 
                                                src={`/api/user/product/product-image/${p._id}`} 
                                                className="card-img-top" 
                                                alt={p.name} 
                                                />
                                            </div>
                                            <div className='col-md-8 py-3'>
                                                <p className='fs-5 text-light'>Product Name : {p.name}</p>
                                                <p className='fs-5 text-light'>{p.description}</p>
                                                <h3 className='text-light'>Price : $  {p.price}</h3>
                                                <button onClick={() => removeCartItem(p._id)} 
                                                className='btn btn-danger'>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='col-md-3 bg-dark'>
                            <h2 className='text-center text-light borderr p-2'>Cart Summary</h2>
                            <h5 className='text-light px-4 py-2'>Total Product :  {totalProduct()}</h5>
                            <h5 className='text-light px-4 py-2'>Total Amount : $  {totalPrice()}</h5>
                            <div className="text-light">
                                {
                                    !clientToken || !cart?.length ? ("") : (
                                        <>
                                            <DropIn
                                                options={{
                                                    authorization: clientToken,
                                                    paypal: {
                                                        flow: "vault",
                                                    },
                                                }}
                                                onInstance={(instance) => setInstance(instance)}
                                            />

                                            <button
                                                className="btn btn-primary mb-3 mt-2"
                                                onClick={handlePayment}
                                                disabled={loading || !instance || !auth?.user?.address}
                                            >
                                                {loading ? "Processing ...." : "Make Payment"}
                                            </button>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    )
}

export default Cart