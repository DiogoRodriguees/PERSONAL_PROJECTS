import classes from './style.module.css'
import { BsArrowUpCircle, BsArrowDownCircle } from "react-icons/bs";

const icons = {
    entrada: <BsArrowUpCircle size={"30px"} color="green" />,
    saida: <BsArrowDownCircle size={"30px"} color="red" />,
};

type EntradaSaida = {
    titulo: String,
    tipo: String,
    valor: number
}


function EntradaSaida({titulo, tipo, valor}:EntradaSaida) {
  return (
    <div className={classes.entrada}>
        <div className={classes.titulo}>
            <h2>{titulo}</h2>
            {tipo === "saida" ? icons.saida : icons.entrada}
        </div>

        <p>R$ {valor}</p>
    </div>
  )
}

export default EntradaSaida