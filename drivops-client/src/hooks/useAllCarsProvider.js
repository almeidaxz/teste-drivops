import { useState } from "react";

export default function useAllCarsProvider() {
    const [allCars, setAllCars] = useState([]);

    return {
        allCars,
        setAllCars
    }
}