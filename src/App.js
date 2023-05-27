import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './Componet/Form/Login/Login';
import SignUp from './Componet/Form/Register/Register';
// import RequireAuth from './Componet/Form/RequireAuth/RequireAuth';
import AddUser from './Componet/Home/AddBilling/AddUser';
import AllUser from './Componet/Home/AllBilling/AllUser';
import Navbar from './Componet/Home/Navbar/Navbar';
import UpdateUser from './Componet/UpdateUser';
// import Register from './Componet/Form/Register/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoPlayer from './Componet/VideoPlayer/VideoPlayer';

function App() {

  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/" element={<AllUser></AllUser>} />
        <Route path="/add-billing" element={<AddUser></AddUser>} />
        <Route path="/updateUser/:id" element={<UpdateUser></UpdateUser>} />
        {/* </Route> */}
        <Route path="/video" element={<VideoPlayer />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<SignUp></SignUp>}></Route>
      </Routes>
      <ToastContainer />
    </div >
  );
}

export default App;
