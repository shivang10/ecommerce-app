import React from "react";

import {BrowserRouter as Router} from "react-router-dom";

import Homepage from "./homepage/homepage";

const App: React.FC = () => {
    return (
        <Router>
            <Homepage/>
        </Router>
    );
};

export default App;
