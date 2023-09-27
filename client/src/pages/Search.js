import Layout from '../components/Layout/Layout';
import React from 'react';
import { useSearch } from '../context/search';

const Search = () => {
    const [values, setValues] = useSearch()
  return (
    <Layout title={"Search result"}>
        <div className='container'>
            <div className='text-center'>
                <h2>Search Results</h2>
                <h5> {values?.results.length < 1 
                ? 'No Products Founds' 
                : `Found ${values?.results.length}`}</h5>
                <div className='d-flex flex-wrap mt-4'>
              {values?.results.map(p => (
                <div className="card m-3" style={{ width: "19rem" }} >
                  <img style={{ objectFit: "cover" }} height={'300px'} src={`/api/user/product/product-image/${p._id}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title m-2">{p.name}</h5>
                    <p className="card-text m-2">$ {p.price}</p>
                    <p className="card-text m-2">{p.description}</p>
                    <button className='btn btn-secondary m-2'>More Details</button>
                    <button className='btn btn-dark m-2'>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
            </div>
        </div>
    </Layout>
  )
}

export default Search