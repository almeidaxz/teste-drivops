import { createContext } from "react";
import useAllSalesmenProvider from "../hooks/useAllSalesmenProvider";

const AllSalesmenContext = createContext({});

export function AllSalesmenProvider({ children }) {
    const providerProps = useAllSalesmenProvider();

    return (
        <AllSalesmenContext.Provider value={providerProps}>
            {children}
        </AllSalesmenContext.Provider>
    )
}

export default AllSalesmenContext;