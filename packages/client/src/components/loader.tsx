import React from "react";

const Loader: React.FC<any> = () => {
    return (
        <div className={`animate-spin rounded-full border-primary border-r-4 border-b-4 w-full h-full `}></div>
    );
};

export default Loader;