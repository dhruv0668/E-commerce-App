import React from 'react';
import Layout from '../components/Layout/Layout';

const About = () => {
  return (
    <Layout title={"About us - Shop Any Time"}>
    <div className="row contactus mb">
      <div className="col-md-6 ">
        <img
          className='about-img'
          src="/images/about.jpg"
          alt="contactus"
        />
      </div>
      <div className="col-md-4">
      <h1 className="bg-dark mt-5 p-2 text-white text-center">About Us</h1>
        <p className="text-justify mt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          officiis obcaecati esse tempore unde ratione, eveniet mollitia,
          perferendis eius temporibus dicta blanditiis doloremque explicabo
          quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
          accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
          commodi illum quidem neque tempora nam.
        </p>
      </div>
    </div>
  </Layout>
  );
};

export default About;