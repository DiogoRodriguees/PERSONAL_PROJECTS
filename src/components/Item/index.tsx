import React from "react";
import classes from "./style.module.css";

import { BsArrowUpCircle, BsArrowDownCircle } from "react-icons/bs";

const icons = {
    entrada: <BsArrowUpCircle size={"20px"} color="green" />,
    saida: <BsArrowDownCircle size={"20px"} color="red" />,
};

type informcacoes = {
    descricao: String;
    valor: number;
    tipo: String;
};

function Item({ descricao, tipo, valor }: informcacoes) {
    return (
        <div>
            <div className={classes.titulo_colunas}>
                <p className={classes.descricao}>{descricao}</p>
                <p className={classes.valor}>R$ {valor}</p>
                <p className={classes.tipo}>
                    {tipo === "saida" ? icons.saida : icons.entrada}
                </p>
            </div>
        </div>
    );
}

export default Item;
