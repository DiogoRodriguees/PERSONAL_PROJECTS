import React from "react";
import classes from "./style.module.css";
import { Formik } from "formik";

type Formulario = {
    valor: number;
    descricao: string;
    tipo: string;
};

function NovaEntradaSaida() {
    function testarSubmissao(values: any) {
        console.log(values);
        alert("teste");
    }

    return (
        <Formik
            onSubmit={testarSubmissao}
            initialValues={{
                valor: "",
                descricao: "",
                tipo: "",
            }}
            component={({ values }) => (
                <form
                    onSubmit={testarSubmissao}
                    className={classes.entrada_saida}
                >
                    <div className={classes.entradas}>
                        <label htmlFor="descricao">Descriçao</label>
                        <input
                            type="text"
                            name="descricao"
                            value={values.descricao}
                        />
                    </div>
                    <div className={classes.entradas}>
                        <label htmlFor="valor">Valor</label>
                        <input
                            type="text"
                            name="valor"
                            value={values.valor}
                            onChange={() => values.valor}
                        />
                    </div>
                    <div className={classes.check}>
                        <div className={classes.labels}>
                            <input
                                type="checkbox"
                                name="saida"
                                value={"saida"}
                            />
                            <label htmlFor="saida">saida</label>
                        </div>
                    </div>
                    <input className={classes.button} type="submit" name="adicionar" value="Adicionar" />
                    <label htmlFor="adicionar"></label>
                </form>
            )}
        />
    ); 
}

export default NovaEntradaSaida;
