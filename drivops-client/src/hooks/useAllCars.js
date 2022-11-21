import { useContext } from "react";
import AllCarsContext from '../contexts/AllCarsContext';

export default function useAllCars() {
    return useContext(AllCarsContext);
}