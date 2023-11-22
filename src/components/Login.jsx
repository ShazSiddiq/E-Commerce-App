import React, { useContext, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'

import pic from '../assets/productImage/login.jpg'
import { User } from '../store/UserContextProvider'

export default function Login() {
    let [user, setUser] = useState({
        username: "",
        password: ""
    })

    let {getUser}=useContext(User)
    let navigate=useNavigate()

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
        const response=await getUser()
        const authUser=response.data.find((item)=>item.username===user.username && item.password===user.password)
        if(authUser){
            localStorage.setItem("Login",true)
            localStorage.setItem("username",authUser.username)
            localStorage.setItem("name",authUser.name)
            localStorage.setItem("userid",authUser._id)
            navigate("/profile")
        }
        else{
            alert("Invalid UserName And Password")
        }
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-6 col-12 mt-2">
                    <img src={pic} height="400px" width="100%" alt="" />
                </div>
                <div className="col-md-6 col-12 mt-2">
                    <h5 className='background text-center p-1'>Login Section</h5>
                    <form onSubmit={postData}>
                        <div className="mb-3">
                            <label className="form-label">User Name</label>
                            <input type="text" className="form-control" onChange={getData} name='username' placeholder='Enter UserName to Login' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={getData} name='password' placeholder='Enter Password' />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label">Check me out</label>
                        </div>
                        <button type="submit" className='btn background mybtn w-100'>Login</button>
                        <div className='d-flex justify-content-between'>
                            <Link to="#" className='text-decoration-none'>Forget Password</Link>
                            <Link to="/signup" className='text-decoration-none'>New User?Create An Account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
