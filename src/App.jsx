import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

import { CitiesProvider } from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/AuthContext";
import CityList from "./components/CityList/CityList"
import City from "./components/City/City"
import CountryList from "./components/CountryList/CountryList"
import Form from "./components/Form/Form"
import SpinnerFullPage from "./components/SpinnerFullPage/SpinnerFullPage"
import ProtectedByAuth from "./fakeAuth/ProtectedByAuth";

import "../index.css"

// lazy loading to reduce bundle size
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Login = lazy(() => import ("./pages/Login/Login"));
const Product = lazy(() => import ("./pages/Product/Product"));
const Pricing = lazy(() => import ("./pages/Pricing/Pricing"));
const PageNotFound = lazy(() => import ("./pages/PageNotFound/PageNotFound"));
const AppLayout = lazy(() => import ("./pages/AppLayout/AppLayout"));

polyfillCountryFlagEmojis();

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/product" element={<Product />} />
              <Route path="/app" element={
                <ProtectedByAuth>
                  <AppLayout />
                </ProtectedByAuth>}>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City /> }/>
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
