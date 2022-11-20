import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import _ from 'lodash';
import { useEffect, useState } from 'react';

export default function MonthlySales({ allSales }) {
    const [salesByMonth, setSalesByMonth] = useState([]);

    const filterValueByMonth = () => {
        const sortedByMonth = allSales.sort((a, b) => {
            return new Date(a.sell_date) > new Date(b.sell_date) ? 1 : -1;
        });

        const filterSalesByMonth = _.groupBy(sortedByMonth, (value) => {
            return new Date(value?.sell_date).toLocaleString('en-US', { month: 'short' });
        });

        const filterResultData = _.map(filterSalesByMonth, (value, key) => {
            return {
                month: key,
                value: _.sumBy(filterSalesByMonth[key], (v) => v?.sale_value)
            }
        });
        setSalesByMonth(filterResultData);
    }

    useEffect(() => {
        filterValueByMonth();
    }, [allSales]);

    return (
        <>
            <h1 className='mb-6 font-bold'>VENDAS MENSAIS</h1>
            <ResponsiveContainer width="70%" height={250}>
                <LineChart
                    data={salesByMonth}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey='month' />
                    <YAxis dataKey='value' />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}