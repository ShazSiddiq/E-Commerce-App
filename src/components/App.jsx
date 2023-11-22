import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';
import AdminHome from './admin/AdminHome';
import AdminSubcategory from './admin/AdminSubCategory';
import AdminAddSubCategory from './admin/AdminAddSubCategory';
import AdminUpdateSubcategory from './admin/AdminUpdateSubCategory';
import AdminMaincategory from './admin/AdminMainCategory';
import AdminAddMainCategory from './admin/AdminAddMainCategory';
import AdminUpdateMaincategory from './admin/AdminUpdateMainCategory';
import AdminBrand from './admin/AdminBrand';
import AdminAddBrand from './admin/AdminAddBrand';
import AdminUpdateBrand from './admin/AdminUpdateBrand';
import AdminProduct from './admin/AdminProduct';
import AdminAddProduct from './admin/AdminAddProduct';
import AdminUpdateProduct from './admin/AdminUpdateProduct';
import Shop from './Shop';
import SingleProductPage from './SingleProductPage';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import ContactUs from './ContactUs';
import AdminContact from './admin/AdminContact';
import AdminSingleContact from './admin/AdminSingleContact';
import AdminUserList from './admin/AdminUserList';
import AdminNewsletter from './admin/AdminNewsletter';
import Cart from './Cart';
import CheckOut from './CheckOut';
import Confirmation from './Confirmation';
import AdminCheckOut from './admin/AdminCheckOut.jsx';
import AdminSingleCheckOut from './admin/AdminSingleCheckOut.jsx';
import About from './About.jsx';




export default function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/shop/:mc/:sc/:br' element={<Shop/>}/>
        <Route path='/single-product/:_id' element={<SingleProductPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/update-profile' element={<UpdateProfile/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<CheckOut/>}/>
        <Route path='/confirmation' element={<Confirmation/>}/>
        <Route path='/about' element={<About/>}/>


        <Route path='/admin-home' element={<AdminHome/>}/>
        <Route path='/admin-maincategory' element={<AdminMaincategory/>}/>
        <Route path='/admin-add-maincategory' element={<AdminAddMainCategory/>}/>
        <Route path='/admin-update-maincategory/:_id' element={<AdminUpdateMaincategory/>}/>

        <Route path='/admin-subcategory' element={<AdminSubcategory/>}/>
        <Route path='/admin-add-subcategory' element={<AdminAddSubCategory/>}/>
        <Route path='/admin-update-subcategory/:_id' element={<AdminUpdateSubcategory/>}/>

        <Route path='/admin-brand' element={<AdminBrand/>}/>
        <Route path='/admin-add-brand' element={<AdminAddBrand/>}/>
        <Route path='/admin-update-brand/:_id' element={<AdminUpdateBrand/>}/>

        <Route path='/admin-product' element={<AdminProduct/>}/>
        <Route path='/admin-add-product' element={<AdminAddProduct/>}/>
        <Route path='/admin-update-product/:_id' element={<AdminUpdateProduct/>}/>

        <Route path='/admin-contact' element={<AdminContact/>}/>
        <Route path='/admin-single-contact/:_id' element={<AdminSingleContact/>}/>

        <Route path='/admin-userlist' element={<AdminUserList/>}/>

        <Route path='/admin-newsletter' element={<AdminNewsletter/>}/>

        <Route path='/admin-checkout' element={<AdminCheckOut/>}/>
        <Route path='/admin-single-checkout/:_id' element={<AdminSingleCheckOut/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  )
}
