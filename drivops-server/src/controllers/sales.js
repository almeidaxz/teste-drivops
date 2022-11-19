const knex = require('../database/dbConnection');

const listSales = async (req, res) => {
    try {
        const allSales = await knex('sales').where({ active: true });

        return res.status(200).json(allSales);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro no servidor.' });
    }
}

const registerSale = async (req, res) => {
    const { sell_date, car_id, sale_value, cars_amount, salesman_id } = req.body;

    if (!sell_date || !cars_amount || !car_id || !sale_value || !salesman_id) {
        return res.status(404).json({ message: 'Todos os dados são obrigatórios.' });
    }

    try {
        const existingCar = await knex('cars').where({ id: car_id, active: true }).first();
        if (!existingCar || existingCar.inventory <= 0) {
            return res.status(404).json({ message: 'Carro não disponível para venda.' });
        }
        if (existingCar.inventory < cars_amount) {
            return res.status(404).json({ message: 'Quantidade não disponível para venda.' });
        }

        const existingSalesman = await knex('salesmen').where({ id: salesman_id, active: true }).first();
        if (!existingSalesman) {
            return res.status(404).json({ message: 'Vendedor não disponível.' });
        }

        const newInventory = existingCar.inventory - cars_amount;

        await knex('cars').update({ inventory: newInventory }).where({ id: car_id }).returning('*');
        await knex('sales').insert({ sell_date, car_id, sale_value, cars_amount, salesman_id }).returning('*');

        return res.status(201).json({ message: 'Venda cadastrada com sucesso!' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro no servidor.' });
    }
}

const updateSale = async (req, res) => {
    const { id } = req.params;
    const { sell_date, car_id, sale_value, cars_amount, salesman_id } = req.body;

    try {
        const existingSale = await knex('sales').where({ id }).first();
        if (!existingSale) {
            return res.status(404).json({ message: 'Venda não encontrada.' });
        }

        if (existingSale.cars_amount > cars_amount) {
            const selectedCar = await knex('cars').where({ id: car_id }).first();
            const newInventory = (selectedCar.inventory + existingSale.cars_amount) - cars_amount;

            if (newInventory < 0) {
                return res.status(400).json({ message: 'Quantidade não disponível para venda.' });
            }

            await knex('cars').update({ inventory: newInventory }).where({ id: car_id });
        } else if (existingSale.cars_amount < cars_amount) {
            const selectedCar = await knex('cars').where({ id: car_id }).first();
            const newInventory = (selectedCar.inventory + existingSale.cars_amount) - (existingSale.cars_amount + (cars_amount % existingSale.cars_amount));

            if (newInventory < 0) {
                return res.status(400).json({ message: 'Quantidade não disponível para venda.' });
            }

            await knex('cars').update({ inventory: newInventory }).where({ id: car_id });
        }

        await knex('sales').update({ sell_date, car_id, sale_value, cars_amount, salesman_id }).where({ id });

        return res.status(200).json({ message: 'Dados da venda alterados com sucecsso.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro no servidor.' });
    }
}

const deleteSale = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Informe o id da venda.' });
    }

    try {
        await knex('sales').uptdate({ active: false }).where({ id });

        return res.status(200).json({ message: 'Venda exlcuída com sucesso.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro no servidor.' });
    }
}

module.exports = {
    listSales,
    registerSale,
    updateSale,
    deleteSale
}