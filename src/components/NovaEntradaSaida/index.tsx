import React from "react";
import classes from "./style.module.css";
import { Field, Form, Formik } from "formik";
import api from "../../api/api";
import EntradaSaida from "../EntradaSaida";

type Formulario = {
    valor: number;
    descricao: string;
    tipo: string;
};

function NovaEntradaSaida() {
    const testarSubmissao = async (values: Formulario) => {
        try {
            if (values.tipo == "saida") {
                await api.post("/saida", values);
            } else {
                await api.post("/entrada", values);
            }
        } catch (error) {
            console.log(error);
        }

        window.location.reload();
    };

    return (
        <Formik
            onSubmit={testarSubmissao}
            initialValues={{
                valor: 0,
                descricao: "",
                tipo: "entrada",
            }}
            component={({ values, handleChange }) => (
                <Form className={classes.entrada_saida}>
                    <div className={classes.entradas}>
                        <label htmlFor="descricao">Descriçao</label>
                        <Field
                            type="text"
                            name="descricao"
                            value={values.descricao}
                        />
                    </div>
                    <div className={classes.entradas}>
                        <label htmlFor="valor">Valor</label>
                        <Field
                            type="number"
                            name="valor"
                            value={values.valor}
                            // onChange={() => values.valor}
                        />
                    </div>
                    <div className={classes.check}>
                        <div className={classes.labels}>
                            <input
                                type="checkbox"
                                name="tipo"
                                value={values.tipo}
                                onClick={() =>
                                    (values.tipo =
                                        values.tipo == "saida"
                                            ? "entrada"
                                            : "saida")
                                }
                            />
                            <label htmlFor="saida">saida</label>
                        </div>
                    </div>
                    <button
                        className={classes.button}
                        type="submit"
                        name="adicionar"
                        value="Adicionar"
                    >
                        Adicionar
                    </button>
                </Form>
            )}
        />
    );
}

export default NovaEntradaSaida;
