import React, { useContext, useEffect, useState } from 'react'
import Navleft from './Navleft'
import { useParams } from 'react-router-dom';
import { CheckOut } from '../../store/CheckOutContextProvider';

export default function AdminSingleCheckOut() {
    let [checkout, setCheckout] = useState([])
    let [status, setStatus] = useState("Order Placed")
    let [payment, setPayment] = useState("Pending")
    let { getSingle, update } = useContext(CheckOut)
    let { _id } = useParams()

    async function getAPIData() {
        let items = {
            _id: _id
        }
        var response = await getSingle(items)
        if (response.result === "done") {
            setCheckout(response.data)
            setStatus(response.data.status)
            setPayment(response.data.payment)
        }
        else
            alert(response.message)
    }
    function getData(e) {
        if (e.target.name === "status")
            setStatus(e.target.value)
        else
            setPayment(e.target.value)
    }

    async function updateRecord() { 
        var item = {
            _id: _id,
            userid: localStorage.getItem("userid"),
            mode: checkout.mode,
            status: status,
            paymentstatus: payment,
            rppid: checkout.rppid,
            total: checkout.total,
            shipping: checkout.shipping,
            final: checkout.final,
            date: checkout.date,
            products: checkout.products
        }
        const response = await update(item)
        if (response.data === "done")
            getAPIData()
    }

    useEffect(() => {
        getAPIData()
    },[])
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
                    <Navleft />
                </div>
                <div className="col-xl-10 col-lg-9 col-md-8 col-sm-6 col-12">
                    <h5 className='background text-center p-2 mt-2'>Single Checkout Section </h5>
                    <div className="table-responsive">
                        <table className='table table-striped table-hover'>
                            <tbody>
                                <tr>
                                    <th>Id:</th>
                                    <td>{checkout._id}</td>
                                </tr>
                                <tr>
                                    <th>Mode:</th>
                                    <td>{checkout.mode}</td>
                                </tr>
                                <tr>
                                    <th>Status:</th>
                                    <td>
                                        {checkout.status}
                                        {
                                            checkout.status !== "Delivered" ?
                                                <select name="status" className='form-select' onChange={getData}>
                                                    <option value="Packed">Packed</option>
                                                    <option value="Prepare for Dispatch">Prepare for Dispatch</option>
                                                    <option value="Dispatched">Dispatched</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="In Transit">In Transit</option>
                                                    <option value="Order reached at Final Delevery Station">Order reached at Final Delevery Station</option>
                                                    <option value="Out For Delevery">Out For Delevery</option>
                                                    <option value="Deleverd">Deleverd</option>
                                                </select> : ""
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>Payment Status:</th>
                                    <td>
                                        {checkout.paymentstatus}
                                        {
                                            checkout.paymentstatus !== "Done" && checkout.mode === "COD" ?
                                                <select name="payment" className='form-select' onChange={getData}>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Done">Done</option>
                                                </select> : ""
                                        }
                                    </td>
                                </tr>
                                {
                                    checkout.mode !== "COD" ?
                                        <tr>
                                            <th>RPPID</th>
                                            <td>{checkout.rppid}</td>
                                        </tr> : ""
                                }
                                <tr>
                                    <th>Total Amount:</th>
                                    <td>{checkout.total}</td>
                                </tr>
                                <tr>
                                    <th>Shipping Charge:</th>
                                    <td>{checkout.shipping}</td>
                                </tr>
                                <tr>
                                    <th>Final Amount:</th>
                                    <td>{checkout.final}</td>
                                </tr>
                                <tr>
                                    <th>Date:</th>
                                    <td>{`${new Date(checkout.date).getDate()}/${new Date(checkout.date).getMonth() + 1}/${new Date(checkout.date).getFullYear()} ${new Date(checkout.date).getHours()}:${new Date(checkout.date).getMinutes()}:${new Date(checkout.date).getSeconds()}`}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        {checkout.status !== "Delivered" || checkout.paymentstatus === "Done" ? <button className='background btn mybtn w-100 mt-2' onClick={updateRecord}>Update</button> : ""}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}
