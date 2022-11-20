import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import _ from 'lodash';
import { useEffect, useState } from 'react';

export default function SalesBySalesmen({ allSalesmen, allSales }) {

    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300
        }
    ]

    const filterBySalesmenSales = () => {
        const sortedByMonth = allSales.sort((a, b) => {
            return new Date(a.sell_date) > new Date(b.sell_date) ? 1 : -1;
        });

        const filterSalesBySalesmen = _.groupBy(sortedByMonth, (item) => {
            return item?.salesman_id
        });

        _.map(filterSalesBySalesmen, (value, key) => {
            filterSalesBySalesmen[key] = _.groupBy(value, (value) => {
                return new Date(value?.sell_date).toLocaleString('en-US', { month: 'short' });
            });
        });

        let totalValueByMonth = _.map(filterSalesBySalesmen, (value, key) => {
            return _.map(value, (v, key) => {
                return _.map(v, (v2) => {
                    return {
                        [key]: v2.sale_value
                    }
                });
            });
        });
        totalValueByMonth = _.flattenDepth(totalValueByMonth, 2);
        
        totalValueByMonth = _.map(totalValueByMonth, (value, key) => {
            // console.log(value);
        });

        // const filterResultData = _.map(filterSalesBySalesmen, (value, key) => {
        //     return {
        //         salesman: allSalesmen?.find((salesman) => {
        //             return salesman?.id === Number(key);
        //         }).name,
        //         value: _.sumBy(filterSalesBySalesmen[key], (v) => v?.sale_value)
        //     }
        // });

        // console.log(filterResultData);

    }

    useEffect(() => {
        filterBySalesmenSales();
    }, [allSalesmen, allSales]);

    return (
        <BarChart width={530} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
    )
}