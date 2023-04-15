import { BiSearchAlt } from "react-icons/bi" 
import GlassBox from "../glassBox"
import Tag from "../searchTag"

const SearchBar = () => {
    return (
        <>

            <GlassBox>
                <div className="p-1 flex items-center px-2 w-full">
                    <BiSearchAlt size={26} className="peer-focus:text-white text-gray-400"/>
                    <input type="text" className="peer bg-transparent p-2 focus:outline-none w-full" placeholder="Search for products or restaurants"/>
                </div>
            </GlassBox>


        </>
    )
}
export default SearchBar