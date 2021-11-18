import React from "react";

import {BrowserRouter as Router} from "react-router-dom";

import NavBar from "./components/NavBar";
import Homepage from "./homepage/homepage";
import Routes from "./routes/routes";

const App: React.FC = () => {
    return (
        <Router>
            <NavBar/>
            <Homepage/>
            <Routes/>
        </Router>
    );
};

export default App;
