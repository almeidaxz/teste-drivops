import { createContext } from "react";
import useAllCarsProvider from "../hooks/useAllCarsProvider";

const AllCarsContext = createContext({});

export function AllCarsProvider({ children }) {
    const providerProps = useAllCarsProvider();

    return (
        <AllCarsContext.Provider value={providerProps}>
            {children}
        </AllCarsContext.Provider>
    )
}

export default AllCarsContext;