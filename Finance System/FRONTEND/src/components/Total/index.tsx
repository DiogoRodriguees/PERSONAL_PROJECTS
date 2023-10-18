import classes from "./style.module.css";
import { BsArrowDownCircle } from "react-icons/bs";

type TotalType = {
    valor: number
}

function Total({valor}: TotalType) {
    return (
        <div className={classes.entrada}>
            <div className={classes.titulo}>
                <h2>Total</h2>
            </div>

            <p>R$ {valor}</p>
        </div>
    );
}

export default Total;
