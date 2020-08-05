import React from 'react'
import './styles.css'


const Loader: React.FC = () => {
    return (
        <div className="loader__wrapper"><div className="lds-dual-ring"></div></div>
    )
}

export default Loader