import React, { createContext } from 'react'

export const Newsletter=createContext();
async function AddNewsletter(item){
    let rawData=await fetch("/newsletter",{
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

async function getNewsletter(item){
  let rawData=await fetch("/newsletter")
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

async function DeleteNewsletter(item){
  let rawData=await fetch("/newsletter/"+item._id,{
      method:"Delete"
  })
  let result= await rawData.json();
  console.log(result);
  return{result:"done",message:"main category is deleted"}
  
}
export default function NewsletterContextProvider(props) {
   
  return (
    <Newsletter.Provider value={
      {add:AddNewsletter,
      getNewsletter:getNewsletter,
      deleteData:DeleteNewsletter
      }}>
        {props.children}
    </Newsletter.Provider>
  )
}
