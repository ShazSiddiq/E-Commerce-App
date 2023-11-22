import React, { useContext, useEffect, useState } from 'react'
import Navleft from './Navleft'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom';
import { Product } from '../../store/ProductContextProvider';

export default function AdminProduct() {
    let [product, setProduct] = useState([])
    let { getProduct,deleteData } = useContext(Product)  

    async function getAPIData() {
        var response = await getProduct()
        if (response.result === "done")
            setProduct(response.data)
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
                    <h5 className='background text-center p-2 mt-2'>Product Section <Link to="/admin-add-product"><AddIcon className='text-dark' /> </Link> </h5>
                    <div className="table-responsive">
                        <table className='table table-striped table-hover'>
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>MainCategory</th>
                                    <th>SubCategory</th>
                                    <th>Brand</th>
                                    <th>Base Price</th>
                                    <th>Discount</th>
                                    <th>Final Price</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Stock</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {
                                    product.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item._id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.maincategory}</td>
                                            <td>{item.subcategory}</td>
                                            <td>{item.brand}</td>
                                            <td>&#8377;{item.baseprice}</td>
                                            <td>{item.discount}%</td>
                                            <td>&#8377;{item.finalprice}</td>
                                            <td>{item.color}</td>
                                            <td>{item.size}</td>
                                            <td>{item.stock}</td>
                                            <td><img src={require(`../../assets/productImage/${item.pic2}`)} width="100px" height="80px" alt="" /></td>
                                            <td><img src={require(`../../assets/productImage/${item.pic2}`)} width="100px" height="80px" alt="" /></td>
                                            <td><img src={require(`../../assets/productImage/${item.pic2}`)} width="100px" height="80px" alt="" /></td>
                                            <td><img src={require(`../../assets/productImage/${item.pic2}`)} width="100px" height="80px" alt="" /></td>
                                            <td><Link to={`/admin-update-product/${item._id}`}><EditIcon className='edit'/></Link></td>
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
