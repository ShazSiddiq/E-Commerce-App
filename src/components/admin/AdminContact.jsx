import React, { useContext, useEffect, useState } from 'react'
import Navleft from './Navleft'
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom';
import { Contact } from '../../store/ContactContextProvider';

export default function AdminContact() {
    let [contact, setContact] = useState([])
    let { getContact,deleteData } = useContext(Contact) 
    
    async function getAPIData() {
        var response = await getContact()
        if (response.result === "done")
            setContact(response.data)
        else
            alert(response.message)
    }

    async function deleteRecord(_id){
       if(window.confirm("Are You Sure to Delete!!!")){
        let item={
            _id:_id
        }
        await deleteData(item)
        getAPIData()
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
                    <h5 className='background text-center p-2 mt-2'>Contact Section <Link to="/contact"><AddIcon className='text-dark' /> </Link> </h5>
                    <div className="table-responsive">
                        <table className='table table-striped table-hover'>
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email Address</th>
                                    <th>Phone</th>
                                    <th>Subject</th>
                                    <th>Date</th>
                                    <th>status</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {
                                    contact.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item._id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.subject}</td>
                                            <td>{`${new Date(item.date).getDate()}/${new Date(item.date).getMonth()+1}/${new Date(item.date).getFullYear()} ${new Date(item.date).getHours()}:${new Date(item.date).getMinutes()}:${new Date(item.date).getSeconds()}`}</td>
                                            <td>{item.status}</td>
                                            <td><Link to={`/admin-single-contact/${item._id}`} className='btn'><RemoveRedEyeIcon className='edit'/></Link></td>
                                            <td><button className='btn' onClick={()=>deleteRecord(item._id)}><DeleteForeverIcon className='edit'/></button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}
