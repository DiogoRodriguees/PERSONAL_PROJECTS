import { prismaclient as prisma } from "../../services/prismaclient";
import { Car } from "../types/cars.types";

export class CarsRepository {
    /* Criar um novo carro */
    async create({ veiculo, marca, ano, desc, vendido }: Car) {
        const car = await prisma.car.create({
            data: {
                veiculo,
                marca,
                ano,
                desc,
                vendido,
            },
        });

        return car;
    }

    /* Para editar os campos do car */
    async updateCar(id: number, { veiculo, marca, ano, desc, vendido }: Car) {
        const carExists = await prisma.car.findUnique({ where: { id } });

        if (carExists) {
            const car = await prisma.car.update({
                where: {
                    id,
                },
                data: {
                    veiculo,
                    marca,
                    ano,
                    desc,
                    vendido,
                },
            });
            return car;
        }
    }

    /* Busca todos os carros cadastrados */
    async getAll() {
        const cars = await prisma.car.findMany();

        return cars;
    }

    /* Busca os carros que correpondem ao parametro */
    async getByParam(params: string) {
        const cars = await prisma.car.findMany({
            where: {
                OR: [{ veiculo: { contains: params } }, { marca: { contains: params } }],
            },
        });

        return cars;
    }

    /* Busca cars que corresponde ao ID */
    async getById(id: number) {
        const car = await prisma.car.findMany({
            where: {
                id: id,
            },
        });

        return car;
    }
}
