import { useContext } from "react";
import AllSalesmenContext from '../contexts/AllSalesmenContext';

export default function useAllSalesmen() {
    return useContext(AllSalesmenContext);
}