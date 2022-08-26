import Loader from "../Loader/Loader";
import "./WithLoader.scss"
import React from "react";


export type WithLoaderProps = React.PropsWithChildren<{
    loading: boolean;
}>;

export const WithLoader: React.FC<WithLoaderProps> = ({loading, children}) => {

    return(
            <div className="WithLoader">
                {children}
                {loading && <Loader loading={loading} className="content"/> }
            </div>
    )
};


WithLoader.defaultProps = {
    loading: true
}

export default WithLoader;