import { useState } from "react";

export default function useAllSalesmenProvider() {
    const [allSalesmen, setAllSalesmen] = useState([]);

    return {
        allSalesmen,
        setAllSalesmen
    }
}