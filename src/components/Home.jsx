import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

import pic1 from "../assets/Image/pic1.jpg"
import pic2 from "../assets/Image/pic2.jpg"
import pic3 from "../assets/Image/pic3.jpg"
import pic4 from "../assets/Image/pic4.jpg"
import pic5 from "../assets/Image/pic5.jpg"
import pic6 from "../assets/Image/pic6.jpg"
import pic7 from "../assets/Image/pic7.jpg"
import pic8 from "../assets/Image/pic8.jpg"
import pic9 from "../assets/Image/pic9.jpg"
import pic10 from "../assets/Image/pic10.jpg"
import ProductList from './ProductList'


function Item(props) {
  return (
    <Paper>
      <img className='mt-1' src={props.item.pic} width="100%" height="600px" alt="" />
    </Paper>
  )
}

export default function Home() {
  var items = [
    {
      pic: pic1

    },
    {
      pic: pic2
    },
    {
      pic: pic3
    },
    {
      pic: pic4

    },
    {
      pic: pic5

    },
    {
      pic: pic6

    },
    {
      pic: pic7

    },
    {
      pic: pic8

    },
    {
      pic: pic9

    },
    {
      pic: pic10

    }
  ]
  return (
    <>
      <Carousel>
        {
          items.map((item, i) => <Item key={i} item={item} />)
        }
      </Carousel>
      <h5 className='background text-center my-2'>Latest Product Sample</h5>
      <ProductList mc="All" sc="All" br="All" />
    </>
  )
}
