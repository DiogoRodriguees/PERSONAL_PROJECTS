import React, { useEffect, useState } from "react";

import classes from "./Resumo.module.css";
import Item from "../Item";
import api from "../../api/api";

type historicoItems = {
    descricao: string;
    valor: number;
    tipo: string;
};

type historico = {
    historico: historicoItems[];
};

function Resumo({ historico }: historico) {
    return (
        <div className={classes.resumo}>
            <div className={classes.titulo_colunas}>
                <p className={classes.descricao}>Descrição</p>
                <p className={classes.valor}>Valor</p>
                <p className={classes.tipo}>Tipo</p>
            </div>
            <div>
                {historico.map((item, index) => {
                    if (index >= 6) {
                        return;
                    }
                    return (
                        <Item
                            descricao={item.descricao}
                            valor={item.valor}
                            tipo={item.tipo}
                            key={index}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Resumo;
