import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className="list-group">
                    <h1 className='mb-4 p-3'>Dashboard</h1>
                    <NavLink to="/dashboard/user/profile" className="list-group-item bg-dark text-light list-group-item-action">
                        Profile
                    </NavLink>
                    <NavLink to="/dashboard/user/orders" className="list-group-item bg-dark text-light list-group-item-action">
                        Orders
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default UserMenu