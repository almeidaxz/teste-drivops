const knex = require('../database/dbConnection');

const listSalesmen = async (req, res) => {
    try {
        const allActiveSalesmen = await knex('salesmen').where({ active: true });

        return res.status(200).json(allActiveSalesmen);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro no servidor.' });
    }
}

const registerSalesmen = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'O nome e e-mail do vendedor são obrigatórios.' });
    }

    try {
        const existingSalesman = await knex('salesmen').where({ email }).first();
        if (existingSalesman && !existingSalesman.active) {
            await knex('salesmen').update({ active: true }).where({ email });
            return res.status(403).json({ message: 'Vendedor cadastrado com sucesso.' });
        }
        if (existingSalesman && existingSalesman.active) {
            return res.status(403).json({ message: 'Vendedor já cadastrado.' });
        }

        const isManagerEmail = await knex('managers').where({ email });
        if (isManagerEmail.length) {
            return res.status(403).json({ message: 'O gestor não pode ser cadastrado como vendedor.' });
        }

        await knex('salesmen').insert({ name, email }).returning('*');

        return res.status(201).json({ message: 'Vendedor cadastrado com sucesso.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro no servidor.' });
    }
}

const updateSalesman = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'O nome e email do vendedor são obrigatórios.' });
    }

    try {
        const existingSalesman = await knex('salesmen').where({ id }).first();
        if (!existingSalesman) {
            return res.status(404).json({ message: 'Vendedor não encontrado.' });
        }

        await knex('salesmen').update({ name, email }).where({ id }).returning('*');

        return res.status(200).json({ message: 'Dados do vendedor atualizados com sucesso.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro no servidor.' });
    }
}

const deleteSalesman = async (req, res) => {
    const { id } = req.params;

    try {
        const existingSalesman = await knex('salesmen').where({ id }).first();
        if (!existingSalesman) {
            return res.status(404).json({ message: 'Vendedor não encontrado.' });
        }

        await knex('salesmen').update({ active: false }).where({ id }).returning('*');

        return res.status(200).json({ message: 'Vendedor excluído com sucesso.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro no servidor.' });
    }
}

module.exports = {
    listSalesmen,
    registerSalesmen,
    updateSalesman,
    deleteSalesman
}