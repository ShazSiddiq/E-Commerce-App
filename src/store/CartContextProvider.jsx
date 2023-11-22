import React, { createContext } from 'react'

export const Cart=createContext();
async function AddCart(item){
    let rawData=await fetch("/cart",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    let result= await rawData.json();
    if(result)
    return{result:"done",message:"main category is created"}
    else
    return{result:"fail",message:"internal server error"}
}

async function UpdateCart(item){
  let rawData=await fetch("/cart/"+item.id,{
      method:"put",
      headers:{
          "content-type":"application/json"
      },
      body:JSON.stringify(item)
  })
  let result= await rawData.json();
  if(result)
  return{result:"done",message:"Cart is updated"}
  else
  return{result:"fail",message:"internal server error"}
}

async function getCart(item){
  let rawData=await fetch("/cart")
  let result= await rawData.json()
  result=result.filter((x=>x.userid===item.userid))
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

async function GetSingleCart(item){
  let rawData=await fetch("/cart/"+item._id)
  let result= await rawData.json()
    var {id,...x}=result 
  if(result)
  return{result:"done",data:{_id:id,...x}}
  else
  return{result:"fail",message:"internal server error"}
}

async function DeleteCart(item){
  let rawData=await fetch("/cart/"+item._id,{
      method:"Delete"
  })
  let result= await rawData.json();
  console.log(result);
  return{result:"done",message:"main category is deleted"}
  
}

async function DeleteAllCart(item) {
    let rawData = await fetch("/cart")
    let result = await rawData.json()
    result = result.filter((x => x.userid === item.userid))
     for(let item of result){
        rawData = await fetch("/cart/" + item.id, {
            method: "Delete"
        })
         result = await rawData.json();
     }
    return { result: "done", message: "main category is deleted" }

}
export default function CartContextProvider(props) {
   
  return (
    <Cart.Provider value={
      {addCart:AddCart,
      getCart:getCart,
      deleteData:DeleteCart,
      deleteAllData:DeleteAllCart,
      getSingle:GetSingleCart,
      update:UpdateCart
      }}>
        {props.children}
    </Cart.Provider>
  )
}
