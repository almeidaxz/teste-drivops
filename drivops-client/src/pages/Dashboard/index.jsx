import { useEffect } from "react";
import CarsAverage from "../../components/Dashboard/CarsAverage";
import MonthlySales from "../../components/Dashboard/MonthlySales";
import SalesBySalesmen from "../../components/Dashboard/SalesBySalesmen";
import SaleTableRow from "../../components/Dashboard/SaleTableRow";
import NavBar from "../../components/NavBar";
import useAllCarsProvider from "../../hooks/useAllCarsProvider";
import useAllSalesmenProvider from "../../hooks/useAllSalesmenProvider";
import useAllSalesProvider from "../../hooks/useAllSalesProvider";
import api from '../../services/apiConnection';

export default function Dashboard() {
  const { allSales, setAllSales } = useAllSalesProvider();
  const { allCars, setAllCars } = useAllCarsProvider();
  const { allSalesmen, setAllSalesmen } = useAllSalesmenProvider();

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
      <main className="flex flex-col items-center justify-center mt-24">
        <MonthlySales allSales={allSales} />
        <div className="w-[70%] flex justify-between mb-10">
          <SalesBySalesmen allSalesmen={allSalesmen} allSales={allSales} />
          <CarsAverage allCars={allCars} allSales={allSales} />
        </div>
        <section className="w-full flex flex-col items-center mb-10">
          <button
            className="self-end mr-[15%] mb-4 px-6 py-2 bg-sky-400 font-bold rounded-lg"
          >
            Cadastrar Venda
          </button>
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
