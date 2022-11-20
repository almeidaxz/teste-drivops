import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

export default function SalesBySalesmen({ allSalesmen, allSales }) {
    const [resultData, setResultData] = useState([]);

    const filterBySalesmenSales = () => {
        const sortedByMonth = allSales?.sort((a, b) => {
            return new Date(a?.sell_date) > new Date(b?.sell_date) ? 1 : -1;
        });

        const filterSalesBySalesmen = _.groupBy(sortedByMonth, (item) => {
            return item?.salesman_id
        });

        _.map(filterSalesBySalesmen, (value, key) => {
            filterSalesBySalesmen[key] = _.groupBy(value, (v) => {
                return new Date(v?.sell_date).toLocaleString('en-US', { month: 'short' });
            });
        });

        const filteredResult = _.map(filterSalesBySalesmen, (value, key) => {
            return _.map(value, (v, k) => {
                return {
                    salesman: key,
                    month: k,
                    value: _.sumBy(value[k], (v) => v?.sale_value)
                }
            });
        });
        const flattenData = _.flatten(filteredResult);

        const fullData = [];
        flattenData?.map((item) => {
            const salesmanName = allSalesmen?.find((salesman) => {
                return Number(item?.salesman) === salesman?.id;
            });

            fullData.push({
                month: item?.month,
                [salesmanName?.name]: item?.value
            });
        });

        const groupByMonth = _.groupBy(fullData, (value) => {
            return value?.month;
        });
        let uniqueData = [];
        _.map(groupByMonth, (value) => {
            return value?.sort((a, b) => {
                uniqueData = [...uniqueData, _.merge(a, b)];
            })
        });

        setResultData(uniqueData);
    }

    useEffect(() => {
        filterBySalesmenSales();
    }, [allSalesmen, allSales]);

    return (
        <BarChart width={530} height={250} data={resultData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {resultData.map((item, index) => {
                const salesmenList = Object.keys(item).filter((item) => {
                    return item !== 'month';
                });

                return <Bar key={resultData.month} dataKey={salesmenList[index]} fill="#8884d8" />
            })}
        </BarChart>
    )
}