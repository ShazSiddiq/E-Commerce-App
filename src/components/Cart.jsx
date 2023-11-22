import React, { useContext, useEffect, useState } from 'react'
import { Cart as CartContext } from '../store/CartContextProvider'
import { Link } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Cart() {
  let [cart, setCart] = useState([]);
  let [total, setTotal] = useState(0);
  let [shipping, setShipping] = useState(0);
  let [final, setFinal] = useState(0);

  let { getCart, update, deleteData } = useContext(CartContext)

  async function getAPIData() {
    let item = {
      userid: localStorage.getItem("userid")
    }
    const response = await getCart(item)
    setCart(response.data)
    let total=0
    let shipping=0
    let final=0
    for(let item of response.data){
      total=total+item.total
    }
    if(total<1000 && response.data.length>=1)
    shipping=150
    final=shipping+total
    setTotal(total)
    setShipping(shipping)
    setFinal(final)
  }
  async function deleteRecord(_id) {
    if (window.confirm("Are You Sure to Delete!!!")) {
      let item = {
        _id: _id
      }
      await deleteData(item)
      getAPIData()
    }
  }
  async function updateRecord(_id, operation) {
    var c = cart.find(item => item._id === _id)
    if (operation === "DEC" && c.qty === 1)
      return
    else if (operation === "INC") {
      c.qty = c.qty + 1
      c.total = c.total + c.price
    } else {
      c.qty = c.qty - 1
      c.total = c.total - c.price
    }
    var item = {
      id: c._id,
      userid: c.userid,
      productid: c.productid,
      name: c.name,
      maincategory: c.maincategory,
      subcategory: c.subcategory,
      brand: c.brand,
      color: c.color,
      size: c.size,
      pic: c.pic,
      qty: c.qty,
      price: c.price,
      total: c.total
    }
    const response = await update(item)
    if (response.result === "done")
      getAPIData()
    else
      alert(response.message)
  }

  useEffect(() => {
    getAPIData()
  }, [])
  return (
    <div className='container-fluid'>
      <div className="table-responsive">
        <h4 className='background text-center mt-2 p-1'>Cart Section</h4>
        <table className='table'>
          <tbody>
            <tr>
              <th></th>
              <th>Name</th>
              <th>MainCategory</th>
              <th>SubCategory</th>
              <th>Brand</th>
              <th>Color</th>
              <th>Size</th>
              <th></th>
              <th>Qty</th>
              <th></th>
              <th>Price</th>
              <th>Total</th>
              <th></th>
            </tr>

            {
              cart.map((item, index) => {
                return <tr key={index}>
                  <td><img src={require(`../assets/productImage/${item.pic}`)} height="100px" width="100px" alt="" /></td>
                  <td>{item.name}</td>
                  <td>{item.maincategory}</td>
                  <td>{item.subcategory}</td>
                  <td>{item.brand}</td>
                  <td>{item.color}</td>
                  <td>{item.size}</td>
                  <td><button className='btn mytbn text-primary' onClick={() => updateRecord(item._id, "INC")}><AddIcon /></button></td>
                  <td>{item.qty}</td>
                  <td><button className='btn mytbn text-primary' onClick={() => updateRecord(item._id, "DEC")}><RemoveIcon /></button></td>
                  <td>&#8377;{item.price}</td>
                  <td>&#8377;{item.total}</td>
                  <td><button className='btn mytbn text-primary' onClick={() => deleteRecord(item._id)}><DeleteForeverIcon /></button></td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col-md-6 col-12"></div>
        <div className="col-md-6 col-12">
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
                {
                  cart.length>=1?<td colSpan={2}><Link to="/checkout" className='btn mybtn background w-100 mt-1'>CheckOut</Link></td>:<td></td>
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
