import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./page/Home.jsx";
import Doc from "./page/doc/Doc.jsx";
import Apps from "./page/Apps/Apps.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import Login from "./page/Apps/auth/Login.jsx";
import Register from "./page/Apps/auth/Register.jsx";
import Dash from "./page/Apps/dash/Dash.jsx";
import AdmCategory from "./page/Apps/dash/adm-category/AdmCategory.jsx";
import AdmTags from "./page/Apps/dash/adm-tags/AdmTags.jsx";
import AdmUsers from "./page/Apps/dash/adm-user/AdmUsers.jsx";
import AdmUserDetail from "./page/Apps/dash/adm-user/AdmUserDetail.jsx";
import AdmUsersPost from "./page/Apps/dash/adm-user/AdmUsersPost.jsx";
import AdmUsersUpdate from "./page/Apps/dash/adm-user/AdmUsersUpdate.jsx";
import Kamus from "./page/Apps/kamus/Kamus.jsx";
import Profile from "./page/Apps/dash/profile/Profile.jsx";
import AdmProduct from "./page/Apps/dash/adm-product/AdmProduct.jsx";
import AdmProductPost from "./page/Apps/dash/adm-product/AdmProductPost.jsx";
import AdmProductDetail from "./page/Apps/dash/adm-product/AdmProductDetail.jsx";
import AdmProductUpdate from "./page/Apps/dash/adm-product/AdmProductUpdate.jsx";
import { ProtectedAdmin, ProtectedUser } from "./page/Apps/dash/profile/ProtectedRole.jsx";
import AuthRedirect from "./page/Apps/auth/AuthRedirect.jsx";
import Product from "./page/Apps/shop/Product.jsx";
import AdmKamus from "./page/Apps/dash/adm-kamus/AdmKamus.jsx";
import AdmKamusPost from "./page/Apps/dash/adm-kamus/AdmKamusPost.jsx";
import AdmKamusUpdate from "./page/Apps/dash/adm-kamus/AdmKamusUpdate.jsx";
import Doc1 from "./page/doc/Doc1.jsx";
import Doc2 from "./page/doc/Doc2.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />
      <Route path="doc" element={<Doc />}>
        <Route index element={<Doc1 />} />
        <Route path="doc-1" element={<Doc1 />} />
        <Route path="doc-2" element={<Doc2 />} />
      </Route>
      <Route path="app" element={<Apps />}>
        {/* public */}
        <Route index element={<Dash />} />
        <Route path="product" element={<Product />} />
        <Route path="kamus" element={<Kamus />} />
        {/* auth redirect */}
        <Route element={<AuthRedirect />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* private user */}
        <Route element={<ProtectedUser />}>
          <Route path="user-profile" element={<Profile />} />
        </Route>
        {/* private admin */}
        <Route element={<ProtectedAdmin />}>
          <Route path="adm-profile" element={<Profile />} />
          <Route path="adm-user">
            <Route index element={<AdmUsers />} />
            <Route path="post" element={<AdmUsersPost />} />
            <Route path="detail/:id" element={<AdmUserDetail />} />
            <Route path="update/:id" element={<AdmUsersUpdate />} />
          </Route>
          <Route path="adm-product">
            <Route index element={<AdmProduct />} />
            <Route path="post" element={<AdmProductPost />} />
            <Route path="detail/:id" element={<AdmProductDetail />} />
            <Route path="update/:id" element={<AdmProductUpdate />} />
          </Route>
          <Route path="adm-tags" element={<AdmTags />} />
          <Route path="adm-category" element={<AdmCategory />} />
          <Route path="adm-kamus">
            <Route index element={<AdmKamus />} />
            <Route path="post" element={<AdmKamusPost />} />
            <Route path="update/:id" element={<AdmKamusUpdate />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
