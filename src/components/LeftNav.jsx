import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link, useParams } from 'react-router-dom';
import { MainCategory } from '../store/MainCategoryContextProvider';
import { SubCategory } from '../store/SubCategoryContextProvider';
import { Brand } from '../store/BrandContextProvider';


export default function LeftNav() {
    let [maincategory, setMaincategory] = useState([])
    let [subcategory, setSubcategory] = useState([])
    let [brand, setBrand] = useState([])
    let { getMainCategory } = useContext(MainCategory)
    let { getSubCategory } = useContext(SubCategory)
    let { getBrand } = useContext(Brand)
    let {mc,sc,br}=useParams()

    async function getAPIData() {
        var response = await getMainCategory()
        setMaincategory(response.data)

        response = await getSubCategory()
        setSubcategory(response.data)

        response = await getBrand()
        setBrand(response.data)
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="secondary mailbox folders">
                <List>
                    <h6 className='background text-center'>MainCategory</h6>
                    <ListItem disablePadding>
                                <ListItemButton>
                                    <Link to={`/shop/All/${sc}/${br}`} className='text-decoration-none'>All</Link>
                                </ListItemButton>
                            </ListItem>
                    {
                        maincategory.map((item, index) => {
                            return <ListItem disablePadding key={index}>
                                <ListItemButton>
                                    <Link to={`/shop/${item.name}/${sc}/${br}`} className='text-decoration-none'>{item.name}</Link>
                                </ListItemButton>
                            </ListItem>
                        })
                    }
                </List>

                <List>
                    <h6 className='background text-center'> SubCategory</h6>
                    <ListItem disablePadding>
                                <ListItemButton>
                                    <Link to={`/shop/${mc}/All/${br}`} className='text-decoration-none'>All</Link>
                                </ListItemButton>
                            </ListItem>
                    {
                        subcategory.map((item, index) => {
                            return <ListItem disablePadding key={index}>
                                <ListItemButton>
                                    <Link to={`/shop/${mc}/${item.name}/${br}`} className='text-decoration-none'>{item.name}</Link>
                                </ListItemButton>
                            </ListItem>
                        })
                    }
                </List>

                <List>
                    <h6 className='background text-center'>Brands</h6>
                    <ListItem disablePadding>
                                <ListItemButton>
                                    <Link to={`/shop/${mc}/${sc}/All`} className='text-decoration-none'>All</Link>
                                </ListItemButton>
                            </ListItem>
                    {
                        brand.map((item, index) => {
                            return <ListItem disablePadding key={index}>
                                <ListItemButton>
                                    <Link to={`/shop/${mc}/${sc}/${item.name}`} className='text-decoration-none'>{item.name}</Link>
                                </ListItemButton>
                            </ListItem>
                        })
                    }
                </List>
            </nav>
        </Box>
    )
}
