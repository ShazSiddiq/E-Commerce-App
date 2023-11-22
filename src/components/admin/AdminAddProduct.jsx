import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navleft from './Navleft';
import { Product } from '../../store/ProductContextProvider';
import { MainCategory } from '../../store/MainCategoryContextProvider';
import { SubCategory } from '../../store/SubCategoryContextProvider';
import { Brand } from '../../store/BrandContextProvider';

export default function AdminAddProduct() {
    let [product, setProduct] = useState({
        name: '',
        maincategory: '',
        subcategory: '',
        brand: '',
        color: '',
        size: '',
        baseprice: 0,
        discount: 0,
        finalprice:0,
        stock: 'In stock',
        description: 'This is a Sample Product',
        pic1: '',
        pic2: '',
        pic3: '',
        pic4: '',
    });
    let [maincategory, setMaincategory] = useState([]);
    let [subcategory, setSubcategory] = useState([]);
    let [brand, setBrand] = useState([]);

    let { add } = useContext(Product)
    let { getMainCategory } = useContext(MainCategory)
    let { getSubCategory } = useContext(SubCategory)
    let { getBrand } = useContext(Brand)

    let navigate = useNavigate()
    const getData = (e) => {
        var name = e.target.name
        var value = e.target.value
        setProduct((oldData) => {
            return {
                ...oldData,
                [name]: value
            }
        })
    }
    const getFile = (e) => {
        var name = e.target.name
        var value = e.target.files[0].name
        setProduct((oldData) => {
            return {
                ...oldData,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        var item = {
            name:product.name,
            maincategory: product.maincategory,
            subcategory: product.subcategory,
            brand: product.brand,
            color: product.color,
            size: product.size,
            baseprice:parseInt(product.baseprice),
            discount:parseInt(product.discount),
            finalprice:parseInt(product.baseprice-product.baseprice*product.discount/100),
            stock: product.stock,
            description:product.description,
            pic1: product.pic1,
            pic2: product.pic2,
            pic3: product.pic3,
            pic4: product.pic4,
        }
        const response = await add(item)
        if (response.result === "done")
            navigate("/admin-product")
        else
            alert(response.message)
    }

    async function getAPIData() {
        var response = await getMainCategory()
        if (response.result === "done"){
            setMaincategory(response.data)
            setProduct((oldData) => {
                return {
                    ...oldData,
                    ['maincategory']: response.data[0].name
                }
            })
        }   
        else
            alert(response.message)

        response = await getSubCategory()
        if (response.result === "done"){
            setSubcategory(response.data)
            setProduct((oldData) => {
                return {
                    ...oldData,
                    ['subcategory']: response.data[0].name
                }
            })
        }  
        else
            alert(response.message)

        response = await getBrand()
        if (response.result === "done"){
            setBrand(response.data)
            setProduct((oldData) => {
                return {
                    ...oldData,
                    ['brand']: response.data[0].name
                }
            })
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
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
                    <Navleft />
                </div>
                <div className="col-xl-10 col-lg-9 col-md-8 col-sm-6 col-12">
                    <h5 className='background text-center p-2 mt-2'>Product Section </h5>
                    <form onSubmit={postData}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" name='name' placeholder='Enter Product Name' required onChange={getData} />
                        </div>
                        <div className="row mb-3">
                        <div className="col-md-3 col-sm-6 col-12">
                            <label className="form-label">MainCategory</label>
                            <select name="maincategory" onChange={getData} className='form-select'>
                                {
                                    maincategory.map((item,index)=>{
                                        return <option key={index} value={item.value}>{item.name}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className="col-md-3 col-sm-6 col-12">
                            <label className="form-label">SubCategory</label>
                            <select name="subcategory" onChange={getData} className='form-select'>
                                {
                                    subcategory.map((item,index)=>{
                                        return <option key={index} value={item.value}>{item.name}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className="col-md-3 col-sm-6 col-12">
                            <label className="form-label">Brand</label>
                            <select name="brand" onChange={getData} className='form-select'>
                                {
                                    brand.map((item,index)=>{
                                        return <option key={index} value={item.value}>{item.name}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className="col-md-3 col-sm-6 col-12">
                            <label className="form-label">Stock</label>
                            <select name="stock" onChange={getData} className='form-select'>
                               <option value="In stock">In stock</option>
                               <option value="Out stock">Out stock</option>
                            </select>
                        </div>
                        </div>
                        <div className="row mb-3">
                        <div className="col-md-6 col-12">
                            <label className="form-label">Color</label>
                            <input type="text" className="form-control" name='color' placeholder='Enter Product Color' required onChange={getData} />
                        </div>
                        <div className="col-md-6 col-12">
                            <label className="form-label">Size</label>
                            <input type="text" className="form-control" name='size' placeholder='Enter Product Size' required onChange={getData} />
                        </div>       
                        </div>
                        <div className="row mb-3">
                        <div className="col-md-6 col-12">
                            <label className="form-label">Base Price</label>
                            <input type="number" className="form-control" name='baseprice' placeholder='Enter Product Baese Price' required onChange={getData} />
                        </div> 
                        <div className="col-md-6 col-12">
                            <label className="form-label">Discount</label>
                            <input type="number" className="form-control" name='discount' placeholder='Enter Product Discount' required onChange={getData} min={0} />
                        </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                           <textarea rows={5} onChange={getData} name='description' className='form-control'value={product.description}></textarea>
                        </div>
                        <div className="row mb-3">
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label className="form-label">Pic1</label>
                            <input type="file" className="form-control " name='pic1' required onChange={getFile} />
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label className="form-label">Pic2</label>
                            <input type="file" className="form-control " name='pic2' required onChange={getFile} />
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label className="form-label">Pic3</label>
                            <input type="file" className="form-control " name='pic3' required onChange={getFile} />
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label className="form-label">Pic4</label>
                            <input type="file" className="form-control " name='pic4' required onChange={getFile} />
                        </div>
                        </div>
                        <button type="submit" className="border-0 background w-100">Add</button>
                    </form>
                </div>
            </div>

        </div>
    )
}
