import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Login from './login'
import Chat from './chat'

class App extends Component {
    render() {
        return (<Router>
            <div className="App">
                <Routes>
                    <Route exact path='/' element={<Login />} />
                    <Route path="/sign-in" element={<Login />} />
                    <Route path="/chat/*" element={<Chat />} />
                </Routes>

            </div></Router>
        );
    }
}
export default App