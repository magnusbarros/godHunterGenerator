import React from "react";
import {
    createBrowserRouter
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div></div>,
    },
    {
        path: "characters",
        element: <div>Work In Progress</div>
    },
    {
        path: "talent-compendium",
        element: <div>Work In Progress</div>
    },
    {
        path: "options",
        element: <div>Work In Progress</div>
    }
]);

export default router;