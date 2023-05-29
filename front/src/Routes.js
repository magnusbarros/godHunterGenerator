import React from "react";
import {
    createBrowserRouter
} from "react-router-dom";
import "./index.css";
import Characters from './pages/characters/Characters'
import TalentCompendium from "./pages/talentCompendium/TalentCompendium";
import CharacterEdit from "./content/character/characterEdit/CharacterEdit";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Characters />,
    },
    {
        path: "characters",
        element: <Characters />
    },
    {
        path: "talent-compendium",
        element: <TalentCompendium />
    },
    {
        path: "character-edit",
        element: <CharacterEdit />
    },
    {
        path: "options",
        element: <div>Work In Progress</div>
    }
]);

export default router;