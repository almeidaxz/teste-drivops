import { createContext } from "react";
import useAllSalesProvider from "../hooks/useAllSalesProvider";

const AllSalesContext = createContext({});

export function AllSalesProvider({ children }) {
    const providerProps = useAllSalesProvider();

    return (
        <AllSalesContext.Provider value={providerProps}>
            {children}
        </AllSalesContext.Provider>
    )
}

export default AllSalesContext;