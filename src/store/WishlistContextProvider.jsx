import React, { createContext } from 'react'

export const Wishlist=createContext();
async function AddWishlist(item){
    let rawData=await fetch("/wishlist",{
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


async function getWishlist(item){
  let rawData=await fetch("/wishlist")
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

async function DeleteWishlist(item){
  let rawData=await fetch("/wishlist/"+item._id,{
      method:"Delete"
  })
  let result= await rawData.json();
  console.log(result);
  return{result:"done",message:"main category is deleted"}
  
}
export default function WishlistContextProvider(props) {
   
  return (
    <Wishlist.Provider value={
      {addWishlist:AddWishlist,
      getWishlist:getWishlist,
      deleteData:DeleteWishlist
      }}>
        {props.children}
    </Wishlist.Provider>
  )
}
