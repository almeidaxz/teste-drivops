import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

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
        <div className='flex flex-col w-[45%] items-center'>
            <ResponsiveContainer height={250} className='mb-6'>
                <BarChart
                    data={resultData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    {resultData.map((item, index) => {
                        const salesmenList = Object.keys(item).filter((item) => {
                            return item !== 'month';
                        });
                        const randomColor = Math.floor(Math.random() * 16777215).toString(16);

                        return <Bar key={`${salesmenList[index]}-${resultData.month}`} dataKey={salesmenList[index]} fill={`#${randomColor}`} />
                    })}
                </BarChart>
            </ResponsiveContainer>
            <h1 className='font-bold'>VENDAS POR VENDEDOR</h1>
        </div>

    )
}