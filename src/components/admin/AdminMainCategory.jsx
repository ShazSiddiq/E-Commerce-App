import React, { useContext, useEffect, useState } from 'react'
import Navleft from './Navleft'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom';
import { MainCategory } from '../../store/MainCategoryContextProvider';

export default function AdminMaincategory() {
    let [maincategory, setMaincategory] = useState([])
    let { getMainCategory,deleteData } = useContext(MainCategory)

    async function getAPIData() {
        var response = await getMainCategory()
        if (response.result === "done")
            setMaincategory(response.data)
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
                    <h5 className='background text-center p-2 mt-2'>Main Category Section <Link to="/admin-add-maincategory"><AddIcon className='text-dark' /> </Link> </h5>
                    <div className="table-responsive">
                        <table className='table table-striped table-hover'>
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {
                                    maincategory.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item._id}</td>
                                            <td>{item.name}</td>
                                            <td><Link to={`/admin-update-maincategory/${item._id}`}><EditIcon className='edit'/></Link></td>
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
