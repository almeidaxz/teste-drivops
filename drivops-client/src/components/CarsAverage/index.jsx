import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function CarsAverage({ allSales, allCars }) {
    const [resultData, setResultData] = useState([]);

    const filterByCarAverage = () => {
        const sortedByMonth = allSales?.sort((a, b) => {
            return new Date(a?.sell_date) > new Date(b?.sell_date) ? 1 : -1;
        });

        const filterSalesByCars = _.groupBy(sortedByMonth, (item) => {
            return item?.car_id
        });

        _.map(filterSalesByCars, (value, key) => {
            filterSalesByCars[key] = _.groupBy(value, (v) => {
                return new Date(v?.sell_date).toLocaleString('en-US', { month: 'short' });
            });
        });

        const filteredResult = _.map(filterSalesByCars, (value, key) => {
            return _.map(value, (v, k) => {
                return {
                    car: key,
                    month: k,
                    value: Number(_.meanBy(value[k], (v) => v?.sale_value).toFixed())
                }
            });
        });
        const flattenData = _.flatten(filteredResult);

        const fullData = [];
        flattenData?.map((item) => {
            const selectedCar = allCars?.find((car) => {
                return Number(item?.car) === car?.id;
            });
            const carNameWithYear = `${selectedCar?.name} ${selectedCar?.year}`;

            fullData.push({
                month: item?.month,
                [carNameWithYear]: item?.value
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
        filterByCarAverage();
    }, [allSales, allCars]);

    return (
        <div className='flex flex-col w-[45%] items-center'>
            <ResponsiveContainer height={250} className='mb-6'>
                <AreaChart
                    data={resultData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
{                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>}
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    {resultData.map((item, index) => {
                        const carsAverageList = Object.keys(item).filter((item) => {
                            return item !== 'month';
                        });
                        const randomColor = Math.floor(Math.random() * 16777215).toString(16);

                        return <Area key={`${carsAverageList[index]}-${carsAverageList.month}`} dataKey={carsAverageList[index]} fill={`#${randomColor}`} />
                    })}
                </AreaChart>
            </ResponsiveContainer>
            <h1 className='font-bold'>VALOR MÉDIO POR CARROS</h1>
        </div>
    )
}