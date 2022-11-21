import { createContext } from "react";
import useSaleFormProvider from "../hooks/useSaleFormProvider";

const SaleFormContext = createContext({});

export function SaleFormProvider({ children }) {
    const providerProps = useSaleFormProvider();

    return (
        <SaleFormContext.Provider value={providerProps}>
            {children}
        </SaleFormContext.Provider>
    )
}

export default SaleFormContext;