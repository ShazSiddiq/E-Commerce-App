import React, { createContext } from 'react'

export const Contact=createContext();
async function AddContact(item){
    let rawData=await fetch("/contact",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    let result= await rawData.json();
    if(result)
    return{result:"done",message:"Thank You For Contacting Us!!!Our Team Will Reach Shortly..!!!"}
    else
    return{result:"fail",message:"internal server error"}
}

async function UpdateContact(item){
  let rawData=await fetch("/contact/"+item._id,{
      method:"put",
      headers:{
          "content-type":"application/json"
      },
      body:JSON.stringify(item)
  })
  let result= await rawData.json();
  if(result)
  return{result:"done",message:"Contact is updated"}
  else
  return{result:"fail",message:"internal server error"}
}

async function getContact(item){
  let rawData=await fetch("/contact")
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

async function GetSingleContact(item){
  let rawData=await fetch("/contact/"+item._id)
  let result= await rawData.json()
    var {id,...x}=result 
  if(result)
  return{result:"done",data:{_id:id,...x}}
  else
  return{result:"fail",message:"internal server error"}
}

async function DeleteContact(item){
  let rawData=await fetch("/contact/"+item._id,{
      method:"Delete"
  })
  let result= await rawData.json();
  console.log(result);
  return{result:"done",message:"main category is deleted"}
  
}
export default function ContactContextProvider(props) {
   
  return (
    <Contact.Provider value={
      {add:AddContact,
      getContact:getContact,
      deleteData:DeleteContact,
      getSingle:GetSingleContact,
      update:UpdateContact
      }}>
        {props.children}
    </Contact.Provider>
  )
}
