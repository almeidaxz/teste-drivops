import { useState } from "react";

export default function useSaleFormProvider() {
    const [saleForm, setSaleForm] = useState({
        sale_value: null,
        car_id: null,
        salesman_id: null,
        sell_date: null,
        cars_amount: null,
        errors: {
            sale_value: '',
            car_id: '',
            salesman_id: '',
            sell_date: '',
            cars_amount: ''
        }
    });

    return {
        saleForm,
        setSaleForm
    }
}