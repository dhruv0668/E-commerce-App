import React from 'react'
import Layout from '../components/Layout/Layout';
import {GoDotFill} from "react-icons/go";

const Policy = () => {
  return (
    <Layout title={"Privacy & Policy - Shop Any Time bg"}>
    <div className="row contactus mt-5">
      <div className="col-md-6 ">
        <img
           className='met-img'
          src="/images/policy.jpg"
          alt="contactus"
        />
      </div>
      <div className="col-md-4">
      <h1 className="bg-dark p-2 text-white text-center">Privacy & Policy</h1>
      <p className="text-justify mt-5">
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
      </p>
      <p className="text-justify mt-2">
            
      </p>
      <p>
       <GoDotFill /> Mobile app privacy policies
      </p>
      <p>
       <GoDotFill /> Privacy policies for Blogger
      </p>
      <p>
       <GoDotFill /> WordPress privacy policies
      </p>
      <p>
       <GoDotFill /> Ecommerce privacy policies
      </p>
      <p>
       <GoDotFill /> Small Business privacy policies
      </p>
      <p>
       <GoDotFill /> Email marketing privacy policy
      </p>
      </div>
    </div>
  </Layout>
  )
}

export default Policy