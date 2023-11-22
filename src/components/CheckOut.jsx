import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { User } from '../store/UserContextProvider'
import { Cart } from '../store/CartContextProvider'
import { Link, useNavigate } from 'react-router-dom'
import { CheckOut as CheckOutContext } from '../store/CheckOutContextProvider'

export default function CheckOut() {
    let [user, setUser] = useState({})
    let [cart, setCart] = useState([])
    let { getSingle } = useContext(User)
    let { getCart,deleteAllData } = useContext(Cart)
    let { add } = useContext(CheckOutContext)
    let navigate = useNavigate()


    let [total, setTotal] = useState(0);
    let [shipping, setShipping] = useState(0);
    let [final, setFinal] = useState(0);
    let [mode, setMode] = useState("COD")

    async function getAPIData() {
        let item = {
            _id: localStorage.getItem("userid")
        }
        var response = await getSingle(item)
        setUser(response.data);
        item = {
            userid: localStorage.getItem("userid")
        }
        response = await getCart(item)
        setCart(response.data)
        let total = 0
        let shipping = 0
        let final = 0
        for (let item of response.data) {
            total = total + item.total
        }
        if (total < 1000 && response.data.length >= 1)
            shipping = 150
        final = shipping + total
        setTotal(total)
        setShipping(shipping)
        setFinal(final)
    }
    function getData(e) {
        setMode(e.target.value)
    }
    async function PlaceOrder() {
        var item = {
            userid: localStorage.getItem("userid"),
            mode: mode,
            status: "Order Placed",
            paymentstatus: "Pending",
            rppid: "",
            total: total,
            shipping: shipping,
            final: final,
            date:new Date,
            products: cart
        }
        var response = await add(item)
        if (response.result === "done"){
            item={
                userid:localStorage.getItem("userid")
            }
            await deleteAllData(item)
            navigate("/confirmation")
        }
        else
            alert(response.message)
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-6 col-12">
                    <h5 className='background text-center p-2 mt-2'>Billing Details</h5>
                    <table className='table table-striped table-hover'>
                        <tbody>
                            <tr>
                                <th>Full Name:</th>
                                <td>{user.name}</td>
                            </tr>
                            <tr>
                                <th>User Name:</th>
                                <td>{user.username}</td>
                            </tr>
                            <tr>
                                <th>Email Address:</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th>Phone:</th>
                                <td>{user.phone}</td>
                            </tr>
                            <tr>
                                <th>House No. or Building Name:</th>
                                <td>{user.addressline1}</td>
                            </tr>
                            <tr>
                                <th>Street Name or Landmark: </th>
                                <td>{user.addressline2}</td>
                            </tr>
                            <tr>
                                <th>Village and City:</th>
                                <td>{user.addressline3}</td>
                            </tr>
                            <tr>
                                <th>Pin:</th>
                                <td>{user.pin}</td>
                            </tr>
                            <tr>
                                <th>City:</th>
                                <td>{user.city}</td>
                            </tr>
                            <tr>
                                <th>State:</th>
                                <td>{user.state}</td>
                            </tr>
                            <tr>
                                <th colSpan={2}><Link to="/update-profile" className='background btn w-100 mybtn p-2'>Update Profile</Link></th>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div className="col-md-6 col-12">
                    <h5 className='background text-center p-2 mt-2'>Products Details</h5>
                    <div className="table-responsive">
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>

                                {
                                    cart.map((item, index) => {
                                        return <tr key={index}>
                                            <td><img src={require(`../assets/productImage/${item.pic}`)} height="70px" width="70px" alt="" /></td>
                                            <td>{item.name}</td>
                                            <td>{item.color}</td>
                                            <td>{item.size}</td>
                                            <td>{item.qty}</td>
                                            <td>&#8377;{item.price}</td>
                                            <td>&#8377;{item.total}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <th>Total Amount :</th>
                                    <td>&#8377;{total}</td>
                                </tr>
                                <tr>
                                    <th>Shipping Charge :</th>
                                    <td>&#8377;{shipping}</td>
                                </tr>
                                <tr>
                                    <th>Final Amount :</th>
                                    <td>&#8377;{final}</td>
                                </tr>
                                <tr>
                                    <th>Payment Mode</th>
                                    <td>
                                        <select name="mode" onChange={getData} className='form-select'>
                                            <option value="COD">COD</option>
                                            <option value="Net Banking">Net Banking/card/Upi</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    {
                                        cart.length >= 1 ? <td colSpan={2}><button className='btn mybtn background w-100 mt-1' onClick={PlaceOrder}>Place Order</button></td> :<td></td>
                                    }
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
