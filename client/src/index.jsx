import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {ApolloProvider} from "@apollo/client";

import "./index.css";

import App from "./components/App";
import client from "./client";

const Root = () => (
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </BrowserRouter>
)

createRoot(document.getElementById('app')).render(<Root/>);

