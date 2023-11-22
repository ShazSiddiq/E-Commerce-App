import React, { createContext } from 'react'

export const SubCategory=createContext();
async function AddSubCategory(item){
    let rawData=await fetch("/subcategory",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    let result= await rawData.json();
    if(result)
    return{result:"done",message:"Sub category is created"}
    else
    return{result:"fail",message:"internal server error"}
}

async function UpdateSubCategory(item){
  let rawData=await fetch("/subcategory/"+item._id,{
      method:"put",
      headers:{
          "content-type":"application/json"
      },
      body:JSON.stringify(item)
  })
  let result= await rawData.json();
  if(result)
  return{result:"done",message:"Sub category is updated"}
  else
  return{result:"fail",message:"internal server error"}
}

async function getSubCategory(item){
  let rawData=await fetch("/subcategory")
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

async function GetSingleSubCategory(item){
  let rawData=await fetch("/subcategory/"+item._id)
  let result= await rawData.json()
    var {id,...x}=result 
  if(result)
  return{result:"done",data:{_id:id,...x}}
  else
  return{result:"fail",message:"internal server error"}
}

async function DeleteSubCategory(item){
  let rawData=await fetch("/subcategory/"+item._id,{
      method:"Delete"
  })
  let result= await rawData.json();
  console.log(result);
  return{result:"done",message:"Sub category is deleted"}
  
}
export default function SubCategoryContextProvider(props) {
   
  return (
    <SubCategory.Provider value={
      {add:AddSubCategory,
      getSubCategory:getSubCategory,
      deleteData:DeleteSubCategory,
      getSingle:GetSingleSubCategory,
      update:UpdateSubCategory
      }}>
        {props.children}
    </SubCategory.Provider>
  )
}
