import React, { useContext, useEffect, useState } from 'react'
import { User } from '../store/UserContextProvider'
import pic from '../assets/productImage/noimage2.jpg'
import { Link, useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
    let [user, setUser] = useState({})
    let { getSingle, update } = useContext(User)
    let navigate=useNavigate()

    async function getAPIData() {
        let item = {
            _id: localStorage.getItem("userid")
        }
        const response = await getSingle(item)
        setUser(response.data);
    }

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
    function getFile(e) {
        let name = e.target.name
        let value = e.target.files[0].name
        setUser((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
            let item = {
                _id:user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
                password: user.password,
                addressline1: user.addressline1,
                addressline2: user.addressline2,
                addressline3: user.addressline3,
                pin: user.pin,
                city: user.city,
                state: user.state,
                pic: user.pic,
                role: user.role
            }
            const response = await update(item)
            if (response.result==="done")
                navigate("/profile")
            else
                alert(response.message)
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <div className='container-fluid mt-2'>
            <div className="row">
                <div className="col-md-6 col-12">
                    {
                        user.pic ?
                            <img src={require(`../assets/productImage/${user.pic}`)} height="600px" width="650px" alt="" />
                            : <img src={pic} height="600px" width="650px" alt="" />
                    }
                </div>
                <div className="col-md-6 col-12">
                    <h5 className='background text-center p-2'>Customer Profile Section</h5>
                    <form onSubmit={postData}>
                        <div className="mb-3">
                                <label className="form-label">Full Name<span className='text-danger'>*</span></label>
                                <input type="text" required className="form-control" onChange={getData} name='name' placeholder='Enter FullName' value={user.name} />
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6 col-12">
                                <label className="form-label">Email Address <span className='text-danger'>*</span></label>
                                <input type="email" required className="form-control" onChange={getData} name='email' placeholder='Enter Email' value={user.email} />
                            </div>
                            <div className="col-md-6 col-12">
                                <label className="form-label">Phone <span className='text-danger'>*</span></label>
                                <input type="text" required className="form-control" onChange={getData} name='phone' placeholder='Enter Phone Number' value={user.phone} />
                            </div>
                            <div className="col-md-6 col-12">
                                <label className="form-label">House No. or Building Name<span className='text-danger'>*</span></label>
                                <input type="text" required className="form-control" onChange={getData} name='addressline1' placeholder='Enter House/building No.' value={user.addressline1} />
                            </div>
                            <div className="col-md-6 col-12">
                                <label className="form-label">Street Name or Land Mark<span className='text-danger'>*</span></label>
                                <input type="text" required className="form-control" onChange={getData} name='addressline2' placeholder='Enter Phone Number' value={user.addressline2} />
                            </div>
                            <div className="col-md-6 col-12">
                                <label className="form-label">village or Locality Name<span className='text-danger'>*</span></label>
                                <input type="text" required className="form-control" onChange={getData} name='addressline3' placeholder='Enter Village/Locality' value={user.addressline3} />
                            </div>
                            <div className="col-md-6 col-12">
                                <label className="form-label">Pin Code  <span className='text-danger'>*</span></label>
                                <input type="text" required className="form-control" onChange={getData} name='pin' placeholder='Enter Pin Code' value={user.pin} />
                            </div>
                            <div className="col-md-6 col-12">
                                <label className="form-label">City <span className='text-danger'>*</span></label>
                                <input type="text" required className="form-control" onChange={getData} name='city' placeholder='Enter your City Number' value={user.city} />
                            </div>
                            <div className="col-md-6 col-12">
                                <label className="form-label">state <span className='text-danger'>*</span></label>
                                <input type="text" required className="form-control" onChange={getData} name='state' placeholder='Enter Your State Number' value={user.state} />
                            </div>
                            <div className="col-md-6 col-12">
                                <label className="form-label">Profile Pic <span className='text-danger'>*</span></label>
                                <input type="file" required className="form-control" onChange={getFile} name='pic'/>
                            </div>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label">Check me out <span className='text-danger'>*</span></label>
                        </div>
                        <button type="submit" className='btn background mybtn w-100'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
