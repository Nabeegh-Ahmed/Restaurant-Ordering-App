import React from "react"

interface TagProps {
    bgVariant: string,
    textVariant: string,
    text: string,
}
const SearchTag: React.FC<TagProps> = ({ textVariant, bgVariant, text }) => {
    return (
        <div className={`p-2 px-3 w-fit rounded-3xl bg-${bgVariant}  text-${textVariant} `}>{text}</div>
    )
}

export default SearchTag