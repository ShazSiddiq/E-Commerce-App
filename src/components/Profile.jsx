import React, { useContext, useEffect, useState } from 'react'
import { User } from '../store/UserContextProvider'
import { CheckOut } from '../store/CheckOutContextProvider'
import pic from '../assets/productImage/noimage.png'
import { Link } from 'react-router-dom'
import { Wishlist } from '../store/WishlistContextProvider'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function Profile() {
  let [user, setUser] = useState({})
  let [order, setOrder] = useState([])
  let [wishlist, setWishlist] = useState([])
  let { getSingle } = useContext(User)
  let { getCheckOutUser } = useContext(CheckOut)
  let { getWishlist, deleteData } = useContext(Wishlist)

  async function getAPIData() {
    let item = {
      _id: localStorage.getItem("userid")
    }
    var response = await getSingle(item)
    setUser(response.data);
    item = {
      userid: localStorage.getItem("userid")
    }
    response = await getWishlist(item)
    setWishlist(response.data);
    response = await getCheckOutUser(item)
    setOrder(response.data);
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
  useEffect(() => {
    getAPIData()
  }, [])
  return (
    <div className='container-fluid mt-2'>
      <div className="row">
        <div className="col-md-6 col-12">
          {
            user.pic ?
              <img src={require(`../assets/productImage/${user.pic}`)} height="500px" width="500px" alt="" />
              : <img src={pic} height="500px" width="500px" alt="" />
          }
        </div>
        <div className="col-md-6 col-12">
          <h5 className='background text-center p-2'>Customer Profile Section</h5>
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
                <th colSpan={2}><Link to="/update-profile" className='background btn w-100 mybtn p-1'>Update Profile</Link></th>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
      {
        wishlist.length >= 1 ?
          <>
            <h5 className='background text-center p-2 mt-2'>WishList Section</h5>
            <div className="table-responsive">
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
                    <th>Price</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>

                  {
                    wishlist.map((item, index) => {
                      return <tr key={index}>
                        <td><img src={require(`../assets/productImage/${item.pic}`)} height="100px" width="100px" alt="" /></td>
                        <td>{item.name}</td>
                        <td>{item.maincategory}</td>
                        <td>{item.subcategory}</td>
                        <td>{item.brand}</td>
                        <td>{item.color}</td>
                        <td>{item.size}</td>
                        <td>&#8377;{item.price}</td>
                        <td><button className='btn mytbn text-primary' onClick={() => deleteRecord(item._id)}><DeleteForeverIcon /></button></td>
                        <td><Link to={`/single-product/${item.productid}`} className='btn mytbn text-primary'><AddShoppingCartIcon /></Link></td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </>
          : <h5 className='background text-center p-2 mt-2'>No Item in Wishlist</h5>
      }
      {
        order.length >= 1 ?
          <>
            <h5 className='background text-center p-2 mt-2'>Order History section</h5>
            {
              order.map((item, index) => {
                return <div className="row" key={index}>
                  <div className="col-lg-3 col-md-4 col-12">
                    <div className='table-responsive'>
                      <table className='table table-striped'>
                        <tbody>
                          <tr>
                            <th>Order Id :</th>
                            <td>{item._id}</td>
                          </tr>
                          <tr>
                            <th>Mode :</th>
                            <td>{item.mode}</td>
                          </tr>
                          <tr>
                            <th> Order Status :</th>
                            <td>{item.status}</td>
                          </tr>
                          <tr>
                            <th>Payment Status :</th>
                            <td>{item.paymentstatus}</td>
                          </tr>
                          <tr>
                            <th>RPPID :</th>
                            <td>{item.rppid}</td>
                          </tr>
                          <tr>
                            <th>Total Amount :</th>
                            <td>&#8377;{item.total}</td>
                          </tr>
                          <tr>
                            <th>Shipping Charge :</th>
                            <td>&#8377;{item.shipping}</td>
                          </tr>
                          <tr>
                            <th>Final Amount :</th>
                            <td>&#8377;{item.final}</td>
                          </tr>
                          <tr>
                            <th>Date :</th>
                            <td>{item.date}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-8 col-12">
                    <div className="table-responsive">
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
                            <th>Price</th>
                            <th></th>
                          </tr>

                          {
                            item.products && item.products.map((item, index) => {
                              return <tr key={index}>
                                <td><img src={require(`../assets/productImage/${item.pic}`)} height="100px" width="100px" alt="" /></td>
                                <td>{item.name}</td>
                                <td>{item.maincategory}</td>
                                <td>{item.subcategory}</td>
                                <td>{item.brand}</td>
                                <td>{item.color}</td>
                                <td>{item.size}</td>
                                <td>&#8377;{item.price}</td>
                              </tr>
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <hr />
                </div>
              })
            }
          </>
          : <h5 className='background text-center p-2 mt-2'>No Order History</h5>
      }
    </div>
  )
}
