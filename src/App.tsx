import React, { useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Header from "./Layouts/Header";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Product from "./Component/Products/Product";
import Login from "./Component/Login";
import Category from "./Component/Category/Category";
import Supplier from "./Component/Supplier/Supplier";
import Home from "./Component/Home/Home";
import { useAppDispatch, useAppSelector } from "./app/hook";
import { Admin_user } from "./features/userslice";
import Settings from "./Component/Login/settings";
import PrivateRoutes from "./routes/privateRoutes";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    console.log('useeffect main');

    if (user.Authed_admin == false) {
      // console.log('dispatch userAdmin');
      dispatch(Admin_user());
    }
  }, [user.Authed_admin]);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<PrivateRoutes  permition={'admin'}>
          <Product />
              </PrivateRoutes>} />
          {/* <Route path="/category" element={<Category />} /> */}
          <Route path="/Supplier" element={<Supplier />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/category"
            element={
              <PrivateRoutes  permition={'super_admin'}>
                <Category/>
              </PrivateRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
