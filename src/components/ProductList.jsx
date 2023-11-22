import React, { useContext, useEffect, useState } from 'react'
import { Product } from '../store/ProductContextProvider';
import ProductItem from './ProductItem'


export default function ProductList(props) {
  let [products, setProducts] = useState([]);
  let { getProduct } = useContext(Product)


  async function getAPIData() {
    var response = await getProduct()
    
    var p = []
    // console.log(response.data);
    if (props.mc === "All" && props.sc === "All" && props.br=== "All")
    p = response.data
    else if( props.mc!=="All" && props.sc==="All" && props.br==="All")
    p=response.data.filter((item)=>item.maincategory===props.mc)
    else if( props.mc==="All" && props.sc!=="All" && props.br==="All")
    p=response.data.filter((item)=>item.subcategory===props.sc)
    else if( props.mc==="All" && props.sc==="All" && props.br!=="All")
    p=response.data.filter((item)=>item.brand===props.br)
    else if( props.mc!=="All" && props.sc!=="All" && props.br==="All")
    p=response.data.filter((item)=>item.maincategory===props.mc && item.subcategory===props.sc)
    else if( props.mc!=="All" && props.sc==="All" && props.br!=="All")
    p=response.data.filter((item)=>item.maincategory===props.mc && item.brand===props.br)
    else if( props.mc==="All" && props.sc!=="All" && props.br!=="All")
    p=response.data.filter((item)=>item.subcategory===props.sc && item.brand===props.br)
    else if( props.mc!=="All" && props.sc!=="All" && props.br!=="All")
    p=response.data.filter((item)=>item.maincategory===props.mc && item.subcategory===props.sc && item.brand===props.br)
  setProducts(p)
  // setProducts(response.data)
  }
  useEffect(() => {  
    getAPIData()
  }, [props.mc,props.sc,props.br])
  return (
    <div className='container-fluid'>
      <div className="row">
        {
          products.map((item, index) => {
            return <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
              <ProductItem name={item.name} baseprice={item.baseprice} discount={item.discount} finalprice={item.finalprice} pic={item.pic1} _id={item._id} />
            </div>
          })
        }
      </div>
    </div>
  )
}
