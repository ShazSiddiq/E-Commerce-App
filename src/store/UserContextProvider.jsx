import React, { createContext } from 'react'

export const User=createContext();
async function AddUser(item){
    let rawData=await fetch("/user",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    let result= await rawData.json();
    if(result)
    return{result:"done",message:"User is created"}
    else
    return{result:"fail",message:"internal server error"}
}

async function UpdateUser(item){
  let rawData=await fetch("/user/"+item._id,{
      method:"put",
      headers:{
          "content-type":"application/json"
      },
      body:JSON.stringify(item)
  })
  let result= await rawData.json();
  if(result)
  return{result:"done",message:"User is updated"}
  else
  return{result:"fail",message:"internal server error"}
}

async function getUser(){
  let rawData=await fetch("/user")
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

async function GetSingleUser(item){
  let rawData=await fetch("/user/"+item._id)
  let result= await rawData.json()
    var {id,...x}=result 
  if(result)
  return{result:"done",data:{_id:id,...x}}
  else
  return{result:"fail",message:"internal server error"}
}

async function DeleteUser(item){
  let rawData=await fetch("/user/"+item._id,{
      method:"Delete"
  })
  let result= await rawData.json();
  console.log(result);
  return{result:"done",message:"main category is deleted"}
  
}
export default function UserContextProvider(props) {
   
  return (
    <User.Provider value={
      {add:AddUser,
      getUser:getUser,
      deleteData:DeleteUser,
      getSingle:GetSingleUser,
      update:UpdateUser
      }}>
        {props.children}
    </User.Provider>
  )
}
