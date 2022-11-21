import { useEffect } from 'react';
import DummyCarAvatar from '../../../assets/car-dummy.jpg';
import { Pencil, Trash } from 'phosphor-react';
import { formatValue } from '../../../utils/format';

export default function SaleTableRow({ sale, allSalesmen, allCars }) {
    const selectedCar = allCars?.find((car) => {
        return car?.id === sale?.car_id
    });
    const carNameAndYear = `${selectedCar.name} ${selectedCar.year}`;

    const selectedSalesman = allSalesmen?.find((salesman) => {
        return salesman?.id === sale?.salesman_id
    });
    const salesmanName = selectedSalesman.name;

    console.log(sale);

    const handleEdit = async () => {
        console.log('edit');
    }
    const handleDelete = async () => {
        console.log('delete');
    }

    useEffect(() => {
    }, [sale, allSalesmen, allCars]);

    return (
        <tr className="h-8 text-center">
            <td>
                {selectedCar?.image_url ?
                    <img className='w-12 mx-auto' src={selectedCar?.image_url} alt="car image" />
                    :
                    <img className='h-16 mx-auto' src={DummyCarAvatar} alt="car image" />
                }
            </td>
            <td>{carNameAndYear}</td>
            <td>{salesmanName}</td>
            <td>{sale.cars_amount}</td>
            <td>{formatValue(sale.sale_value)}</td>
            <td className='flex justify-center py-6 gap-6'>
                <Pencil
                    onClick={handleEdit}
                    size={20}
                    className='cursor-pointer'
                    color='#6fb2dc'
                    weight='bold'
                />
                <Trash
                    onClick={handleDelete}
                    size={20}
                    className='cursor-pointer'
                    color="#dc6f6f"
                    weight="bold"
                />
            </td>
        </tr>
    )
}