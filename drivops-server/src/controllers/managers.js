const knex = require('../database/dbConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createManagerAccount = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingEmail = await knex('managers').where({ email }).first();
        if (existingEmail) {
            return res.status(400).json({ message: 'Já existe usuário com esse E-mail cadastrado.' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        await knex('managers').insert({
            name,
            email,
            password: encryptedPassword
        });

        return res.status(201).json({ message: "Cadastro realizado com sucesso" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro no servidor.' });
    }
}

const managerLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'E-mail e senha obrigatórios.' });
    }

    try {
        const existingAccount = await knex('managers').where({ email }).first();
        if (!existingAccount) {
            return res.status(404).json({ message: 'Conta não cadassatrada.' });
        }

        const decryptPassword = await bcrypt.compare(password, existingAccount.password);
        if (!decryptPassword) {
            return res.status(401).json({ message: 'Usuário e/ou senha inválidos.' });
        }

        const token = jwt.sign(
            { id: existingAccount.id, username: existingAccount.name },
            process.env.JWT_PASSWORD,
            { expiresIn: '1h' }
        )

        const { password: _, ...logedAccount } = existingAccount;

        return res.status(200).json({ logedAccount, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro no servidor.' });
    }
}

module.exports = {
    createManagerAccount,
    managerLogin
}