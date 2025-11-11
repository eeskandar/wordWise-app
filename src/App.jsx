import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

import PageNotFound from "./pages/PageNotFound/PageNotFound"
import Login from "./pages/Login/Login"
import Homepage from "./pages/Homepage/Homepage"
import Product from "./pages/Product/Product"
import Pricing from "./pages/Pricing/Pricing"
import AppLayout from "./pages/AppLayout/AppLayout"
import CityList from "./components/CityList/CityList"
import City from "./components/City/City"
import CountryList from "./components/CountryList/CountryList"
import Form from "./components/Form/Form"
import ProtectedByAuth from "./fakeAuth/ProtectedByAuth";
import { CitiesProvider } from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/AuthContext";
import "../index.css"

polyfillCountryFlagEmojis();

function App() {

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
