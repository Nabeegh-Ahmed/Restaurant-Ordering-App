

const ProductCard = () => {
    return (
        <div className="p-2 lg:mr-2 mt-2 bg-sub-text hover:bg-opacity-30 bg-opacity-10 rounded-lg group transition-all ease-in-out delay-20 shadow-lg">
            <div className="w-full  bg-sub-text rounded-lg h-[240px] shadow-md"></div>
            <div className="flex justify-between mt-2">
                <div><h1 className="text-lg font-medium">Watermelon Sugar High and foes high</h1></div>
                <div><p className="bg-primary rounded-md px-1 mt-1">$2000</p></div>
            </div>
            
            <div className="text-sub-text">Monal Rooftop</div>

        </div>
    )
}

export default ProductCard