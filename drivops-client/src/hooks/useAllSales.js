import { useContext } from "react";
import AllSalesContext from '../contexts/AllSalesContext';

export default function useAllSales() {
    return useContext(AllSalesContext);
}