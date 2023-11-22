import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Navleft from './Navleft';
import { SubCategory } from '../../store/SubCategoryContextProvider';

export default function AdminUpdateSubcategory() {
    let [name,setName] = useState("");
    let {getSingle,update,getSubCategory}=useContext(SubCategory)
    let navigate=useNavigate()
    let {_id}= useParams()

    const getData=(e)=>{
        setName(e.target.value )
    } 
    async function postData(e){
        e.preventDefault()
        let item={
            _id:_id,
            name:name
        }
        let result = await getSubCategory()
        let flag = false
        for (let i of result.data) {
            if (i.name === name) {
                flag = true
                break
            }
        }
        if(flag===false){
        const response= await update(item)
        if (response.result==="done")
        navigate("/admin-subcategory")
        else
        alert (response.message)
        }
        else{
            alert("SubCategory Allready Existed!!!")
        }
    }

    async function getAPIData(){
        let item={
            _id:_id
        }
        let response= await getSingle(item)
        // console.log(response.data );
        setName(response.data.name)
    }
    useEffect(()=>{
        getAPIData()
    },[])
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
                    <Navleft />
                </div>
                <div className="col-xl-10 col-lg-9 col-md-8 col-sm-6 col-12">
                    <h5 className='background text-center p-2 mt-2'>Sub Category Section </h5>
                    <form onSubmit={postData}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" onChange={getData} name='name' placeholder='Enter SubCategory Name' value={name} required  />
                        </div>
                        <button type="submit" className="border-0 background w-100">Update</button>
                    </form>
                </div>
            </div>

        </div>
    )
}
