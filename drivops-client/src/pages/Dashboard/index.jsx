import NavBar from "../../components/NavBar";
import MonthlySales from "../../components/MonthlySales";
import api from '../../services/apiConnection';
import { useEffect, useState } from "react";
import SalesBySalesmen from "../../components/SalesBySalesmen";

export default function Dashboard() {
  const [allSales, setAllSales] = useState([]);
  const [allSalesmen, setAllSalesmen] = useState([]);

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

  useEffect(() => {
    getAllSales();
    getAllSalesmen();
  }, []);

  return (
    <>
      <NavBar />
      <main className="flex flex-col items-center mt-32">
        <MonthlySales allSales={allSales} />
        <h1>DASHBOARD</h1>
        <div>
          <SalesBySalesmen allSalesmen={allSalesmen} allSales={allSales} />
        </div>
      </main>
    </>
  )
}
