import React, { useContext, useEffect, useState } from 'react'
import Navleft from './Navleft'
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from 'react-router-dom';
import { CheckOut } from '../../store/CheckOutContextProvider';

export default function AdminCheckOut() {
    let [checkout, setCheckout] = useState([])
    let { getCheckOut } = useContext(CheckOut) 
    
    async function getAPIData() {
        var response = await getCheckOut()
        if (response.result === "done")
            setCheckout(response.data)
        else
            alert(response.message)
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
                                    <th>Mode</th>
                                    <th>Status</th>
                                    <th>Payment Status</th>
                                    <th>Total Amount</th>
                                    <th>Shipping Charge</th>
                                    <th>Final Amount</th> 
                                    <th>Date</th>
                                    <th></th>
                                </tr>
                                {
                                    checkout.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item._id}</td>
                                            <td>{item.mode}</td>
                                            <td>{item.status}</td>
                                            <td>{item.paymentstatus}</td>
                                            <td>&#8377;{item.total}</td>
                                            <td>&#8377;{item.shipping}</td>
                                            <td>&#8377;{item.final}</td>
                                            <td>{`${new Date(item.date).getDate()}/${new Date(item.date).getMonth()+1}/${new Date(item.date).getFullYear()} ${new Date(item.date).getHours()}:${new Date(item.date).getMinutes()}:${new Date(item.date).getSeconds()}`}</td>
                                            <td><Link to={`/admin-single-checkout/${item._id}`}><RemoveRedEyeIcon/></Link></td>
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
