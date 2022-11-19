const express = require('express');
const routes = express.Router();

const { createManagerAccount, managerLogin } = require('./controllers/managers');
const { listSalesmen, registerSalesmen, updateSalesman, deleteSalesman } = require('./controllers/salesmen');
const { listCars, registerCar, updateCar, deleteCar } = require('./controllers/cars');
const { listSales, registerSale, updateSale, deleteSale } = require('./controllers/sales');

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Servidor ativo' });
});

routes.post('/signup', createManagerAccount);
routes.post('/login', managerLogin);
routes.get('/salesmen/list', listSalesmen);
routes.post('/salesmen/register', registerSalesmen);
routes.put('/salesmen/update/:id', updateSalesman);
routes.delete('/salesmen/delete/:id', deleteSalesman);
routes.get('/cars/list', listCars);
routes.post('/cars/register', registerCar);
routes.put('/cars/update/:id', updateCar);
routes.delete('/cars/delete/:id', deleteCar);
routes.get('/sales/list', listSales);
routes.post('/sales/register', registerSale);
routes.put('/sales/update/:id', updateSale);
routes.delete('/sales/delete:/id', deleteSale);

module.exports = routes;