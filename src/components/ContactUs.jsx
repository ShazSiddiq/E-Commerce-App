import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Contact } from '../store/ContactContextProvider'

export default function ContactUs() {
    let [contacts, setContacts] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    })

    let { add } = useContext(Contact)
    let navigate = useNavigate()

    function getData(e) {
        let name = e.target.name
        let value = e.target.value
        setContacts((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        let item = {
            name: contacts.name,
            email: contacts.email,
            phone: contacts.phone,
            subject: contacts.subject,
            message: contacts.message,
            status: "Active",
            date: new Date()
        }
        const response = await add(item)
        alert(response.message)
        setContacts({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: ""
        })
    }
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-6 col-12 mt-2">
                    <div className='background text-center p-2 mb-1'>sasiddique99@gmail.com</div>
                    <div className='background text-center p-2 mb-1'>7525054638</div>
                    <div className='background text-center p-2 mb-1'>D67,Masjid Gali,New Ashok Nagar,Delhi</div>
                    <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height="450px" id="gmap_canvas" src="https://maps.google.com/maps?q=D67%20New%20Ashok%20Nagar&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe></div></div>
                </div>
                <div className="col-md-6 col-12 mt-2">
                    <h5 className='background text-center p-1'>Contact Us</h5>
                    <form onSubmit={postData}>
                        <div className="mb-3">
                            <label className="form-label">Full Name<span className='text-danger'>*</span></label>
                            <input type="text" required className="form-control" onChange={getData} name='name' placeholder='Enter FullName' value={contacts.name} />
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6 col-12">
                                <label className="form-label">Email Address <span className='text-danger'>*</span></label>
                                <input type="email" required className="form-control" onChange={getData} name='email' placeholder='Enter Email' value={contacts.email} />
                            </div>
                            <div className="col-md-6 col-12">
                                <label className="form-label">Phone <span className='text-danger'>*</span></label>
                                <input type="text" required className="form-control" onChange={getData} name='phone' placeholder='Enter Phone Number' value={contacts.phone} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Subject<span className='text-danger'>*</span></label>
                                <input type="text" required className="form-control" onChange={getData} name='subject' placeholder='Enter Subject' value={contacts.subject} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Message<span className='text-danger'>*</span></label>
                                <textarea className='form-control' name="message" rows="5" onChange={getData} value={contacts.message}></textarea>
                            </div>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label">Check me out </label>
                        </div>
                        <button type="submit" className='btn background mybtn w-100'>Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
