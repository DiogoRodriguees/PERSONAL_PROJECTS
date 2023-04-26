import React, { useEffect, useState } from "react";

import classes from "./Resumo.module.css";
import Item from "../Item";
import api from "../../api/api";

type EntradaSaidaType = {
    descricao: String;
    valor: number;
    tipo: string
};

function Resumo() {
    const [entradasMaisSaidas, setEntradasMaisSaidas] = useState<EntradaSaidaType[]>([]);

    const buscarHistorico = async () => {
        const { data } = await api.get("historico");

        setEntradasMaisSaidas(data);
    };

    const gerarHistorico = async () => {

    };

    useEffect(() => {
        buscarHistorico();
    }, []);

    useEffect(() => {
        gerarHistorico();
    }, [entradasMaisSaidas]);

    return (
        <div className={classes.resumo}>
            <div className={classes.titulo_colunas}>
                <p className={classes.descricao}>Descrição</p>
                <p className={classes.valor}>Valor</p>
                <p className={classes.tipo}>Tipo</p>
            </div>
            <div>
                {entradasMaisSaidas.map((item, index) =>{
                    if(index >= 6){
                        return
                    }
                   return (<Item descricao={item.descricao} valor={item.valor} tipo={item.tipo} key={index}/>)
                })}
            </div>
        </div>
    );
}

export default Resumo;
