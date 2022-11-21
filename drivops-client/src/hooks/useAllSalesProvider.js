import { useState } from "react";

export default function useAllSalesProvider() {
    const [allSales, setAllSales] = useState([]);

    return {
        allSales,
        setAllSales
    }
}