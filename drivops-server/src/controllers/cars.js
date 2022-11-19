const knex = require('../database/dbConnection');

const listCars = async (req, res) => {
    try {
        const allActiveCars = await knex('cars').where({ active: true });

        return res.status(200).json(allActiveCars);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro no servidor.' });
    }
}

const registerCar = async (req, res) => {
    const { manufacturer, name, year, car_value, inventory } = req.body;

    if (!name || !manufacturer || !year || !car_value || !inventory) {
        return res.status(400).json({ message: 'Todos os dados são obrigatórios.' });
    }

    try {
        const existingCar = await knex('cars').where({ manufacturer, name, year }).first();
        if (existingCar) {
            const newInventoryValue = existingCar.inventory + inventory;

            await knex('cars').update({ inventory: newInventoryValue, active: true }).where({ manufacturer, name, year }).returning('*');

            return res.status(200).json({ message: 'Quantidade em estoque atualizada com sucesso.' });
        }

        await knex('cars').insert({ name, manufacturer, year, car_value, inventory }).returning('*');

        return res.status(201).json({ message: 'Carro cadastrado com sucesso.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro no servidor.' });
    }
}

const updateCar = async (req, res) => {
    const { id } = req.params;
    const { manufacturer, name, year, car_value } = req.body;

    try {
        const existingCar = await knex('cars').where({ id }).first();
        if (!existingCar) {
            return res.status(404).json({ message: 'Carro não encontrado.' });
        }

        await knex('cars').update({ manufacturer, name, year, car_value }).where({ id });

        return res.status(200).json({ message: 'Dados do carro atualizados com sucesso.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro no servidor.' });
    }
}

const deleteCar = async (req, res) => {
    const { id } = req.params;

    try {
        const existingCar = await knex('cars').where({ id }).first();
        if (!existingCar) {
            return res.status(404).json({ message: 'Carro não encontrado.' });
        }

        await knex('cars').update({ active: false }).where({ id }).returning('*');

        return res.status(200).json({ message: 'Carro excluído com sucesso.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro no servidor.' });
    }
}

module.exports = {
    listCars,
    registerCar,
    updateCar,
    deleteCar
}