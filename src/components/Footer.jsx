import React, { useContext, useState } from 'react'
import { Newsletter } from '../store/NewsletterContextProvider'

export default function Footer() {
  let [email, setEmail] = useState("")
  let { add, getNewsletter } = useContext(Newsletter)

  function getData(e) {
    setEmail(e.target.value)
  }

  async function postData(e) {
    e.preventDefault()
    let response = await getNewsletter()
    let flag = false
    for (let item of response.data) {
      if (item.email === email) {
        flag = true
        break
      }
    }
    if (flag === false) {
      var item = {
        email: email
      }
      const response = await add(item)
      alert("ThankYou for Subscribing Our Newsletter Services")
    } else {
      alert("your Email id is Allready Ragistered with Us")
    }
  }
  return (
    <footer className='background text-center p-2 mt-3'>
      <h4 >Copyright@UrbanCart.com</h4>
      <div className='row'>
        <div className="col-md-2 col-1"></div>
        <div className="col-md-8 col-10">
          <form onSubmit={postData}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input onChange={getData} type="email" className="form-control" name="email" placeholder='Enter Email Address' />
            </div>
            <button type="submit" className="btn btn-primary w-100">Subscribe to Our NewsLetter Services</button>
          </form>
          <div className="col-md-2 col-1"></div>
        </div>
      </div>
    </footer>
  )
}
