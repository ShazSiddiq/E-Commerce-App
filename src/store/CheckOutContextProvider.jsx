import React, { createContext } from 'react'

export const CheckOut=createContext();
async function AddCheckOut(item){
    let rawData=await fetch("/checkout",{
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

async function UpdateCheckOut(item){
  let rawData=await fetch("/checkout/"+item._id,{
      method:"put",
      headers:{
          "content-type":"application/json"
      },
      body:JSON.stringify(item)
  })
  let result= await rawData.json();
  if(result)
  return{result:"done",message:"CheckOut is updated"}
  else
  return{result:"fail",message:"internal server error"}
}

async function getCheckOut(item){
  let rawData=await fetch("/checkout")
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

async function getCheckOutUser(item){
  let rawData=await fetch("/checkout")
  let result= await rawData.json()
  result=result.filter((i)=>i.userid===item.userid)
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

async function GetSingleCheckOut(item){
  let rawData=await fetch("/checkout/"+item._id)
  let result= await rawData.json()
    var {id,...x}=result 
  if(result)
  return{result:"done",data:{_id:id,...x}}
  else
  return{result:"fail",message:"internal server error"}
}
export default function CheckOutContextProvider(props) {
   
  return (
    <CheckOut.Provider value={
      {add:AddCheckOut,
      getCheckOut:getCheckOut,
      getCheckOutUser:getCheckOutUser,
      getSingle:GetSingleCheckOut,
      update:UpdateCheckOut
      }}>
        {props.children}
    </CheckOut.Provider>
  )
}
