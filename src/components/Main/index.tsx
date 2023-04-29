import EntradaSaida from "../EntradaSaida";
import NovaEntradaSaida from "../NovaEntradaSaida";
import Resumo from "../Resumo/Resumo";
import Total from "../Total";
import api from "../../api/api";
import classes from "./style.module.css";
import { useEffect, useState } from "react";

type EntradaSaidaType = {
    descricao: string;
    valor: number;
};

type historicoItems = {
    valor: number;
    descricao: string;
    tipo: string;
};

function Main() {
    const [entradas, setEntradas] = useState<EntradaSaidaType[]>([]);
    const [saidas, setSaidas] = useState<EntradaSaidaType[]>([]);
    const [valorTotalDeEntradas, setValorTotalDeEntradas] = useState<number>(0);
    const [valorTotalDeSaidas, setValorTotalDeSaidas] = useState<number>(0);

    const [busca, setBusca] = useState("");
    const [historico, setHistorico] = useState<historicoItems[]>([]);
    const gerarTotalDeEntradas = async () => {
        let total = 0;
        entradas.map((item) => {
            total += item.valor;
        });
        setValorTotalDeEntradas(total);
    };

    const gerarTotalDeSaidas = async () => {
        let total = 0;
        saidas.map((item) => {
            total += item.valor;
        });
        setValorTotalDeSaidas(total);
    };

    const buscarTodasEntradas = async () => {
        try {
            const { data } = await api.get("/entradas");
            setEntradas(data);

            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const buscarTodasSaidas = async () => {
        try {
            const { data } = await api.get("/saidas");
            setSaidas(data);

            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const buscarHistorico = async () => {
        try {
            const { data } = await api.get(`/historico?descricao=${busca}`);

            setHistorico(data);

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        buscarHistorico();
        buscarTodasEntradas();
        buscarTodasSaidas();
    }, []);

    useEffect(() => {
        buscarHistorico();
    }, [busca]);
    useEffect(() => {
        gerarTotalDeEntradas();
        gerarTotalDeSaidas();
    }, [entradas, saidas]);

    return (
        <div className={classes.main}>
            <div className={classes.header}>
                <EntradaSaida
                    titulo="Entrada"
                    valor={valorTotalDeEntradas}
                    tipo="entrada"
                />

                <EntradaSaida
                    titulo="Saida"
                    valor={valorTotalDeSaidas}
                    tipo="saida"
                />
                <Total valor={valorTotalDeEntradas - valorTotalDeSaidas} />
            </div>
            <div>
                <NovaEntradaSaida />
            </div>
            <div>
                <div className={classes.buscar_container}>
                    <input
                        type="text"
                        placeholder="Buscar por descrição"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <Resumo historico={historico} />
            </div>
        </div>
    );
}

export default Main;
