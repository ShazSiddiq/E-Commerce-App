import React, { useContext, useEffect, useState } from 'react'
import Navleft from './Navleft'
import {useNavigate, useParams } from 'react-router-dom';
import { Contact } from '../../store/ContactContextProvider';

export default function AdminSingleContact() {
    let [contact, setContact] = useState([])
    let { getSingle, deleteData,update } = useContext(Contact)
    let { _id } = useParams()
    let navigate=useNavigate()

    async function getAPIData() {
        let items = {
            _id: _id
        }
        var response = await getSingle(items)
        if (response.result === "done")
            setContact(response.data)
        else
            alert(response.message)
    }

    async function updateRecord() {
            let item = {
                _id: _id,
                status:"Done",
                name:contact.name,
                email:contact.email,
                phone:contact.phone,
                subject:contact.subject,
                message:contact.message,
                date:contact.date
            }
            const response=await update(item)
            if(response.data==="done")
            getAPIData()
    }

    async function deleteRecord(_id) {
        if (window.confirm("Are You Sure to Delete!!!")) {
            let item = {
                _id: _id
            }
            await deleteData(contact)
            navigate("/admin-contact")
        }
    }

    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
                    <Navleft />
                </div>
                <div className="col-xl-10 col-lg-9 col-md-8 col-sm-6 col-12">
                    <h5 className='background text-center p-2 mt-2'>Single Contact Section </h5>
                    <div className="table-responsive">
                        <table className='table table-striped table-hover'>
                            <tbody>
                                <tr>
                                    <th>Id:</th>
                                    <td>{contact._id}</td>
                                </tr>
                                <tr>
                                    <th>Name:</th>
                                    <td>{contact.name}</td>
                                </tr>
                                <tr>
                                    <th>Email Address:</th>
                                    <td>{contact.email}</td>
                                </tr>
                                <tr>
                                    <th>Phone:</th>
                                    <td>{contact.phone}</td>
                                </tr>
                                <tr>
                                    <th>Subject:</th>
                                    <td>{contact.subject}</td>
                                </tr>
                                <tr>
                                    <th>Date:</th>
                                    <td>{`${new Date(contact.date).getDate()}/${new Date(contact.date).getMonth()+1}/${new Date(contact.date).getFullYear()} ${new Date(contact.date).getHours()}:${new Date(contact.date).getMinutes()}:${new Date(contact.date).getSeconds()}`}</td>
                                </tr>
                                <tr>
                                    <th>status:</th>
                                    <td>{contact.status}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>{contact.status==="Active" ? <button className='background btn mybtn w-100 mt-2' onClick={updateRecord}>Change Status from Active to Done</button> : <button onClick={deleteRecord} className='background btn mybtn w-100 mt-2'>Delete</button>}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}
