import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import pic from '../assets/productImage/signup.jpg'
import { User } from '../store/UserContextProvider'

export default function Signup() {
    let [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
    })

    let { add } = useContext(User)
    let navigate = useNavigate()

    function getData(e) {
        let name = e.target.name
        let value = e.target.value
        setUser((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        if (user.password === user.cpassword) {
            let item = {
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
                password: user.password,
                addressline1: "",
                addressline2: "",
                addressline3: "",
                pin: "",
                city: "",
                state: "",
                pic: "",
                role: "user"
            }
            const response = await add(item)
            if (response.result==="done")
                navigate("/login")
            else
                alert(response.message)
        } else
            alert("Password and Confirm Password Doesn't Matched!!!")
    }
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-6 col-12 mt-2">
                    <img src={pic} height="500px" width="100%" alt="" />
                </div>
                <div className="col-md-6 col-12 mt-2">
                    <h5 className='background text-center p-1'>SignUp Section</h5>
                    <form onSubmit={postData}>
                        <div className="row mb-3">
                            <div className="col-md-6 col-12">
                                <label className="form-label">Full Name<span className='text-danger'>*</span></label>
                                <input type="text" required className="form-control" onChange={getData} name='name' placeholder='Enter FullName' />
                            </div>
                            <div className="col-md-6 col-12">
                                <label className="form-label">User Name <span className='text-danger'>*</span></label>
                                <input type="text" required className="form-control" onChange={getData} name='username' placeholder='Enter UserName to SignUp' />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6 col-12">
                                <label className="form-label">Password <span className='text-danger'>*</span></label>
                                <input type="password" required className="form-control" onChange={getData} name='password' placeholder='Enter Password' />
                            </div>
                            <div className="col-md-6 col-12">
                                <label className="form-label">Confirm Password <span className='text-danger'>*</span></label>
                                <input type="password" className="form-control" onChange={getData} name='cpassword' placeholder='Confirm Password' />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6 col-12">
                                <label className="form-label">Email Address <span className='text-danger'>*</span></label>
                                <input type="email" required className="form-control" onChange={getData} name='email' placeholder='Enter Email' />
                            </div>
                            <div className="col-md-6 col-12">
                                <label className="form-label">Phone <span className='text-danger'>*</span></label>
                                <input type="text" required className="form-control" onChange={getData} name='phone' placeholder='Enter Phone Number' />
                            </div>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label">Check me out <span className='text-danger'>*</span></label>
                        </div>
                        <button type="submit" className='btn background mybtn w-100'>SignUp</button>
                        <Link to="/login" className='text-decoration-none mt-2'>Allready have an Account?Login</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
