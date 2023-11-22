import React, { createContext } from 'react'

export const Brand=createContext();
async function AddBrand(item){
    let rawData=await fetch("/brand",{
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

async function UpdateBrand(item){
  let rawData=await fetch("/brand/"+item._id,{
      method:"put",
      headers:{
          "content-type":"application/json"
      },
      body:JSON.stringify(item)
  })
  let result= await rawData.json();
  if(result)
  return{result:"done",message:"Brand is updated"}
  else
  return{result:"fail",message:"internal server error"}
}

async function getBrand(item){
  let rawData=await fetch("/brand")
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

async function GetSingleBrand(item){
  let rawData=await fetch("/brand/"+item._id)
  let result= await rawData.json()
    var {id,...x}=result 
  if(result)
  return{result:"done",data:{_id:id,...x}}
  else
  return{result:"fail",message:"internal server error"}
}

async function DeleteBrand(item){
  let rawData=await fetch("/brand/"+item._id,{
      method:"Delete"
  })
  let result= await rawData.json();
  console.log(result);
  return{result:"done",message:"main category is deleted"}
  
}
export default function BrandContextProvider(props) {
   
  return (
    <Brand.Provider value={
      {add:AddBrand,
      getBrand:getBrand,
      deleteData:DeleteBrand,
      getSingle:GetSingleBrand,
      update:UpdateBrand
      }}>
        {props.children}
    </Brand.Provider>
  )
}
