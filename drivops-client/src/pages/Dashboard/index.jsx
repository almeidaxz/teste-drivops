import NavBar from "../../components/NavBar";
import MonthlySales from "../../components/Dashboard/MonthlySales";
import api from '../../services/apiConnection';
import { useEffect, useState } from "react";
import SalesBySalesmen from "../../components/Dashboard/SalesBySalesmen";
import CarsAverage from "../../components/Dashboard/CarsAverage";
import SaleTableRow from "../../components/Dashboard/SaleTableRow";

export default function Dashboard() {
  const [allSales, setAllSales] = useState([]);
  const [allSalesmen, setAllSalesmen] = useState([]);
  const [allCars, setAllCars] = useState([]);

  const getAllSales = async () => {
    const { data } = await api.get('/sales/list');
    data.map((sale) => {
      sale.sale_value = sale.sale_value / 100;
    });

    setAllSales(data);
  }
  const getAllSalesmen = async () => {
    const { data } = await api.get('/salesmen/list');

    setAllSalesmen(data);
  }
  const getAllCars = async () => {
    const { data } = await api.get('/cars/list');

    setAllCars(data);
  }

  useEffect(() => {
    getAllSales();
    getAllSalesmen();
    getAllCars();
  }, []);

  return (
    <>
      <NavBar />
      <main className="flex flex-col items-center justify-center mt-32">
        <MonthlySales allSales={allSales} />
        <div className="w-[70%] flex justify-between mb-6">
          <SalesBySalesmen allSalesmen={allSalesmen} allSales={allSales} />
          <CarsAverage allCars={allCars} allSales={allSales} />
        </div>
        <section className="w-full flex flex-col items-center mb-8">
          <table className="table-auto w-[70%] text-start">
            <thead className="th h-14 bg-fuchsia-400">
              <tr>
                <th className="rounded-l-lg">Imagem</th>
                <th>Veículo</th>
                <th>Vendedor</th>
                <th>Quantidade</th>
                <th>Valor</th>
                <th className="rounded-r-lg">Editar/Excluir</th>
              </tr>
            </thead>
            <tbody>
              {allSales.map((sale) => {
                return <SaleTableRow key={sale.id} sale={sale} allCars={allCars} allSalesmen={allSalesmen} />
              })}
            </tbody>
          </table>
        </section>
      </main>
    </>
  )
}
