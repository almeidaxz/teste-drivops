import NavBar from "../../components/NavBar";
import MonthlySales from "../../components/MonthlySales";
import api from '../../services/apiConnection';
import { useEffect, useState } from "react";
import SalesBySalesmen from "../../components/SalesBySalesmen";
import CarsAverage from "../../components/CarsAverage";

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
        <div className="w-[70%] flex justify-between">
          <SalesBySalesmen allSalesmen={allSalesmen} allSales={allSales} />
          <CarsAverage allCars={allCars} allSales={allSales} />
        </div>
      </main>
    </>
  )
}
