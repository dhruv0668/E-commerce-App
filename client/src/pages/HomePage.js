import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useCart } from '../context/AddCart';
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices';
// import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])

  // get All Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/user/category/get-category");
      if (data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategory()
  }, []);


  // get Products

  const getProducts = async () => {
    try {
      const { data } = await axios.get("/api/user/product/get-product");
      setProducts(data.products)
    } catch (error) {
      console.log(error)
    }
  }

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if(value){
      all.push(id);
    }else{
      all = all.filter(c => c!== id);
    }
    setChecked(all)
  }

  useEffect(() => {
   if(!checked.length || !radio.length)  getProducts();
  }, [checked.length, radio.length])

  useEffect(() => {
   if(checked.length || radio.length)  filterProduct();
  }, [checked, radio])

  // get filter product
  const filterProduct = async () => {
    try {
      const {data} = await axios.post("/api/user/product/filter-product", {checked, radio})
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout title={"All Product - Best Offer"}>
      <div className='container-fluid m-4 p-4'>
        <div className='row'>
          <div className='col-md-2'>
            <h2 className='text-center'>Filter By Category</h2>
            <div className='d-flex flex-column'>
              {categories?.map(c => (
                <Checkbox className='fs-5' key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} >
                  {c.name}  
                </Checkbox>
              ))}
            </div>
             {/* filter price */}
            <h2 className='text-center mt-5'>Filter By Price</h2>
            <div className='d-flex flex-column'>
                <Radio.Group onChange={e => setRadio(e.target.value)}>
                  {Prices?.map(p => (
                    <div key={p._id}>
                        <Radio className='fs-5' value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
            </div>
            <div className='d-flex flex-column mt-5'>
                <button className='btn btn-danger' onClick={() => window.location.reload()}>RESET</button>
            </div>
          </div>
          <div className='col-md-8 col-sm-12'>
            <h2 className='text-center'>All Products</h2>
            <div className='d-flex flex-wrap cent'>
              {products?.map(p => (
                <div className="card m-3" style={{ width: "19rem" }} >
                  <img style={{ objectFit: "cover" }} height={'300px'} src={`/api/user/product/product-image/${p._id}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title m-2">{p.name}</h5>
                    <p className="card-text font m-2">$  {p.price}</p>
                    <p className="card-text m-2">{p.description.slice(0,29)} . . .</p>
                    <button className='btn btn-secondary m-2' onClick={() => navigate(`/product/${p.slug}`)} >More Details</button>
                    <button className='btn btn-dark m-2'
                     onClick={() => {
                      setCart([...cart,p])
                      localStorage.setItem('cart', JSON.stringify([...cart,p]))
                      toast.success("Product Add to Cart Successfully")
                     }}>
                      Add to Cart
                      </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;