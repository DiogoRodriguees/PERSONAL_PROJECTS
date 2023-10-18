import { api } from "./services/api";
import { useEffect, useState } from "react";

import List from "./components/List";
import Header from "./components/Header";
import AddVeiculo from "./components/AddVeiculo";

import "./App.css";

function App() {
    const [list, setList] = useState([]);

    const updateList = async (param) => {
        setList(param);
    };

    const getList = async (param = "") => {
        try {
            const { data } = await api.get(`/cars/find?find=${param}`);
            updateList(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <div className="container-app-externo">
            <Header buscarVeiculo={getList} />

            <div className="container-app">
                <AddVeiculo/>

                <List list={list} />
            </div>
        </div>
    );
}

export default App;
