import React from "react";
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Styles
import "./style.css"

// Components
import Default from "./Components/Default/Default";
import HomePage from "./Components/HomePage/HomePage";
import AboutUs from "./Components/AboutUs/AboutUs";
import ContactUs from "./Components/ContactUs/ContactUs";
import Equipments from "./Components/Equipments/Equipments";
import Locations from "./Components/Locations/Locations";
import OilDetect from "./Components/OilDetect/OilDetect";
import Partners from "./Components/Partners/Partners";

const root = ReactDOM.createRoot(document.querySelector("#root"))

var router = createBrowserRouter([
    {
        path: '/',
        element: <Default></Default>,
        children: [
            {
                index: true,
                element: <HomePage></HomePage>
            },
            {
                path: 'aboutUs',
                element: <AboutUs></AboutUs>
            },
            {
                path: 'contactUs',
                element: <ContactUs></ContactUs>
            },
            {
                path: 'equipments',
                element: <Equipments></Equipments>
            },
            {
                path: 'locations',
                element: <Locations></Locations>
            },
            {
                path: 'oilDetect',
                element: <OilDetect></OilDetect>
            },
            {
                path: 'partners',
                element: <Partners></Partners>
            }
        ]
    }
])

root.render(
    <RouterProvider router={router}>

    </RouterProvider>
)