import React from 'react'
import Navleft from './Navleft'
import pic from '../../assets/Image/pic2.jpg'

export default function AdminHome() {
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
                    <Navleft />
                </div>
                <div className="col-xl-10 col-lg-9 col-md-8 col-sm-6 col-12">
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <img src={pic} width="80%" height="400px" alt="" />
                        </div>
                        <div className="col-md-6 col-12">
                            <h5 className='background text-center p-2 mt-2'>Admin Home Page</h5>
                            <table className='table table-striped table-hover'>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>Shahbaz</td>
                                    </tr>
                                    <tr>
                                        <th>User Name</th>
                                        <td>Admin</td>
                                    </tr>
                                    <tr>
                                        <th>Role</th>
                                        <td>Admin</td>
                                    </tr>
                                    <tr>
                                        <th>Email Id</th>
                                        <td>admin@ecomm.com</td>
                                    </tr>
                                    <tr>
                                        <th>Phon No</th>
                                        <td>7525054638</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
