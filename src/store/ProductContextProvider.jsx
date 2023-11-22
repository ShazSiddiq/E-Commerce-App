import React, { createContext } from 'react'

export const Product=createContext();
async function AddProduct(item){
    let rawData=await fetch("/product",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    let result= await rawData.json();
    if(result)
    return{result:"done",message:"Product is created"}
    else
    return{result:"fail",message:"internal server error"}
}
 
async function UpdateProduct(item){
  let rawData=await fetch("/product/"+item._id,{
      method:"put",
      headers:{
          "content-type":"application/json"
      },
      body:JSON.stringify(item)
  })
  let result= await rawData.json();
  if(result)
  return{result:"done",message:"Product is updated"}
  else
  return{result:"fail",message:"internal server error"}
}

async function getProduct(item){
  let rawData=await fetch("/product")
  let result= await rawData.json()
  let d=[]
  for (let item of result) {
    var {id,...x}=item
    d.push({_id:id,...x})
  }
  if(result)
  return{result:"done",data:d}
  else
  return{result:"fail",message:"internal server error"}
}

async function GetSingleProduct(item){
  let rawData=await fetch("/product/"+item._id)
  let result= await rawData.json()
    var {id,...x}=result 
  if(result)
  return{result:"done",data:{_id:id,...x}}
  else
  return{result:"fail",message:"internal server error"}
}

async function DeleteProduct(item){
  let rawData=await fetch("/product/"+item._id,{
      method:"Delete"
  })
  let result= await rawData.json();
  console.log(result);
  return{result:"done",message:"Product is deleted"}
  
}
export default function ProductContextProvider(props) {
   
  return (
    <Product.Provider value={
      {add:AddProduct,
      getProduct:getProduct,
      deleteData:DeleteProduct,
      getSingle:GetSingleProduct,
      update:UpdateProduct
      }}>
        {props.children}
    </Product.Provider>
  )
}
