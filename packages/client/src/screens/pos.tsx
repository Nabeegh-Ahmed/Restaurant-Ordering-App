import POSLayout from "../layouts/posLayout"
import {BsCupFill} from "react-icons/bs"

const POS = () => {
    return (
        <POSLayout>
            <div className="my-4"></div>
            <div className="flex space-x-2">
                <div className="flex space-x-4 w-3/4">
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                </div>
                <div className="w-1/4">
                    <h1 className="text-xl font-medium">Current Order</h1>
                    <OrderItem />
                </div>
            </div>
        </POSLayout>
    )
}

const OrderItem = () => {
    return (
        <div className="w-full rounded-md bg-sub-text bg-opacity-10 flex p-2 items-center space-x-2">
            <div className="bg-white !rounded-full w-[25px] text-center text-secondary">1</div>
            <div>Sting 0.5L Red</div>
            <div className="text-subtext">x4</div>
        </div>
    )
}


const CategoryCard = () => {
    return (
        <div 
            className={`p-4 bg-sub-text bg-opacity-10  
                hover:bg-opacity-30  rounded-lg hover:rounded-md 
                shadow-lg w-full lg:w-1/4 flex flex-col justify-between h-[150px]`}>
            <BsCupFill size={22} className="text-white" />
            <div>
                <h1 className="text-2xl font-medium my-0">Drinks</h1>
                <p className="text-sub-text">13 items</p>
            </div>
        </div>
    )
}

export default POS