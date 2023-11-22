import React, { useContext, useEffect, useState } from 'react'
import { Product as productContext } from '../store/ProductContextProvider'
import { useNavigate, useParams } from 'react-router-dom'

import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import { Cart } from '../store/CartContextProvider'
import { Wishlist } from '../store/WishlistContextProvider'


export default function SingleProductPage() {
    let [product, setProduct] = useState({})
    let { getSingle } = useContext(productContext)
    let {addCart,getCart}=useContext(Cart)
    let {addWishlist,getWishlist}=useContext(Wishlist)
    let { _id } = useParams()
    let navigate=useNavigate()

    async function getAPIData() {
        const item = {
            _id: _id
        }
        const response = await getSingle(item)
        setProduct(response.data)
        // console.log(response.data);
    }

    function Item(props) {
        return (
            <Paper>
            {
                props.item.pic ?
                <img src={require(`../assets/productImage/${props.item.pic}`)} width="100%" height="600px" alt="" />
                : ""
            }
            </Paper>
        )
    }

    var items = [
        {
            pic: product.pic1

        },
        {
            pic: product.pic2
        },
        {
            pic: product.pic3
        },
        {
            pic: product.pic4

        }
    ]
    async function addToCart(){
        let item={
            userid:localStorage.getItem("userid")
        }
        let response= await getCart(item)
        var flag=false
        for(let item of response.data){
            if(item.userid===localStorage.getItem("userid")&& item.product===_id){
                flag=true
                break
            }
        }
        if(flag===false){
            item={
                userid:localStorage.getItem("userid"),
                productid:_id,
                name:product.name,
                maincategory:product.maincategory,
                subcategory:product.subcategory,
                brand:product.brand,
                color:product.color,
                size:product.size,
                price:product.finalprice,
                qty:1,
                total:product.finalprice,
                pic:product.pic1
            }
            response=await addCart(item)
        }
        navigate("/cart")
    }

    async function addToWishlist(){
        let item={
            userid:localStorage.getItem("userid")
        }
        let response= await getWishlist(item)
        var flag=false
        for(let item of response.data){
            if(item.userid===localStorage.getItem("userid")&& item.product===_id){
                flag=true
                break
            }
        }
        if(flag===false){
            item={
                userid:localStorage.getItem("userid"),
                productid:_id,
                name:product.name,
                maincategory:product.maincategory,
                subcategory:product.subcategory,
                brand:product.brand,
                color:product.color,
                size:product.size,
                price:product.finalprice,
                pic:product.pic1
            }
            response=await addWishlist(item)
        }
        navigate("/profile")
    }

    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-6 col-12">
                    <Carousel>
                        {
                            items.map((item, i) => <Item key={i} item={item} />)
                        }
                    </Carousel>
                </div>
                <div className="col-md-6 col-12">
                    <div className="table-responsive">
                        <h5 className='background text-center mt-2 p-1'>Single Product Section</h5>
                        <table className='table table-striped table-hover'>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{product.name}</td>
                                </tr>
                                <tr>
                                    <th>Maincategory</th>
                                    <td>{product.maincategory}</td>
                                </tr>
                                <tr>
                                    <th>Subcategory</th>
                                    <td>{product.subcategory}</td>
                                </tr>
                                <tr>
                                    <th>Brand</th>
                                    <td>{product.brand}</td>
                                </tr>
                                <tr>
                                    <th>Color</th>
                                    <td>{product.color}</td>
                                </tr>
                                <tr>
                                    <th>Size</th>
                                    <td>{product.size}</td>
                                </tr>
                                <tr>
                                    <th>Baseprice</th>
                                    <td>&#8377;<del className='text-danger'>{product.baseprice}</del></td>
                                </tr>
                                <tr>
                                    <th>Discount</th>
                                    <td>{product.discount}%</td>
                                </tr>
                                <tr>
                                    <th>Finalprice</th>
                                    <td>&#8377;{product.finalprice}</td>
                                </tr>
                                <tr>
                                    <th>Stock</th>
                                    <td>{product.stock}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{product.description}</td>
                                </tr>
                                <tr>
                                    <th colSpan={2}><button className=' btn mybtn text-decoration-none text-center d-block w-100 background text-dark p-2 rounded' onClick={addToCart}>Add to Cart</button></th>
                                </tr>
                                <tr>
                                    <th colSpan={2}><button className='btn mybtn text-decoration-none text-center d-block w-100 background text-dark p-2 rounded' onClick={addToWishlist}>Add to Wishlist</button></th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
