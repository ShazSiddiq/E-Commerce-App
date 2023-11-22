import React, { createContext } from 'react'

export const MainCategory=createContext();
async function AddMainCategory(item){
    let rawData=await fetch("/maincategory",{
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

async function UpdateMainCategory(item){
  let rawData=await fetch("/maincategory/"+item._id,{
      method:"put",
      headers:{
          "content-type":"application/json"
      },
      body:JSON.stringify(item)
  })
  let result= await rawData.json();
  if(result)
  return{result:"done",message:"main category is updated"}
  else
  return{result:"fail",message:"internal server error"}
}

async function getMainCategory(item){
  let rawData=await fetch("/maincategory")
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

async function GetSingleMainCategory(item){
  let rawData=await fetch("/maincategory/"+item._id)
  let result= await rawData.json()
    var {id,...x}=result 
  if(result)
  return{result:"done",data:{_id:id,...x}}
  else
  return{result:"fail",message:"internal server error"}
}

async function DeleteMainCategory(item){
  let rawData=await fetch("/maincategory/"+item._id,{
      method:"Delete"
  })
  let result= await rawData.json();
  console.log(result);
  return{result:"done",message:"main category is deleted"}
  
}
export default function MainCategoryContextProvider(props) {
   
  return (
    <MainCategory.Provider value={
      {add:AddMainCategory,
      getMainCategory:getMainCategory,
      deleteData:DeleteMainCategory,
      getSingle:GetSingleMainCategory,
      update:UpdateMainCategory
      }}>
        {props.children}
    </MainCategory.Provider>
  )
}
