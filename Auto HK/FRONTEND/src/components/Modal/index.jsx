/* Formik e react Hooks */
import { Formik, Field, Form } from "formik";
import { useState } from "react";

/* Server */
import { api } from "../../services/api";

/* Components */
import ConfirmaDelete from "../ConfirmDeleteModal";

/* Estilos */
import "./style.css";

export default function Modal({
    fecharModal,
    veiculo = "",
    ano = 0,
    marca = "Chevrolet",
    desc = "",
    vendido = false,
    id = 0,
    editar = false,
}) {
    const [isVendido, setVendido] = useState("Não Vendido");
    const [confirmaDelete, setConfirmaDelete] = useState(false);

    /* Criar um novo veiculo */
    const addVeiculo = async (veiculo) => {
        try {
            const { data } = await api.post(`/create`, veiculo);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    /* Editar o veiculo com o ID informado */
    const editarVeiculo = async (veiculo) => {
        try {
            const { data } = await api.put(`/cars/id?id=${id}`, veiculo);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    /* Função de submissão do FORMIK */
    function onSubmit(values) {
        let novoVeiculo = {
            veiculo: values.veiculo,
            marca: values.marca,
            ano: values.ano,
            desc: values.desc,
            vendido: values.vendido,
        };

        if (!editar) {
            addVeiculo(novoVeiculo);
            fecharModal();
        }

        editarVeiculo(novoVeiculo);
        fecharModal();
        window.location.reload();
    }

    const deletar = async () => {
        try {
            const { data } = await api.delete(`/cars/${id}`);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    function deletarVeiculo() {
        deletar();
        fecharModal();
        window.location.reload();
    }

    function confirmou(status) {
        if (status) {
            deletarVeiculo();
        } else {
            setConfirmaDelete(false);
        }
    }

    function alteraBotao(status) {
        if (!status) {
            setVendido("Vendido");
        } else {
            setVendido("Não Vendido");
        }
    }

    return (
        <div className="container-fora">
            <div className="cadastro-container">
                <Formik
                    required
                    onSubmit={onSubmit}
                    initialValues={{
                        veiculo: veiculo,
                        ano: ano,
                        marca: marca,
                        desc: desc,
                        vendido: vendido,
                    }}
                    component={({ values, handleChange }) => (
                        <Form>
                            <h1>Novo Veiculo</h1>

                            <div className="informacoes-container">
                                <Field
                                    type="text"
                                    name="veiculo"
                                    placeholder="Veiculo"
                                    className="input"
                                />
                                <Field
                                    type="number"
                                    name="ano"
                                    placeholder="Ano"
                                    className="input"
                                />

                                <Field
                                    type="text"
                                    name="marca"
                                    placeholder="Marca"
                                    className="input-marca"
                                ></Field>

                                <Field
                                    type="checkbox"
                                    name="vendido"
                                    className="nao-vendido"
                                    onClick={() => {
                                        alteraBotao(values.vendido);
                                    }}
                                />
                                {isVendido}
                                {/* <label htmlFor="sold">{vendido}</label> */}
                            </div>

                            <div className="descriçao">
                                <label className="descricao-titulo">
                                    Descricao
                                </label>
                                <Field
                                    component="textarea"
                                    type="textarea"
                                    name="desc"
                                    className="box-descricao"
                                />
                            </div>

                            <div className="cadastro-botoes">
                                <button type="submit">
                                    {editar ? "Salvar" : "ADD"}
                                </button>

                                <button onClick={fecharModal}>Fechar</button>
                                {editar && (
                                    <button
                                        id="btnDelete"
                                        onClick={() => setConfirmaDelete(true)}
                                    >
                                        Deletar
                                    </button>
                                )}
                            </div>
                        </Form>
                    )}
                />
                {confirmaDelete && <ConfirmaDelete confirmou={confirmou} />}
            </div>
        </div>
    );
}
