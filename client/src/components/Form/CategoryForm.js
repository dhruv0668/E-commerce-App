import React from 'react';
// import axios from 'axios';


const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form>
                <div className="mb-3">
                    <input type="text" placeholder='Enter New Category' className="form-control"
                        value={value} onChange={(e) => setValue(e.target.value)} />
                </div>
                <button onClick={handleSubmit} type="button" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default CategoryForm