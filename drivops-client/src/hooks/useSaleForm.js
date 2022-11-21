import { useContext } from "react";
import SaleFormContext from '../contexts/SaleFormContext';

export default function useSaleForm() {
    return useContext(SaleFormContext);
}