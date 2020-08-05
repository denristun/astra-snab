import React, { FunctionComponent } from 'react'

import './styles.scss'



type CellProps = {
    text: string,
    // type: string
  }
  

const Cell: FunctionComponent<CellProps> = ({text}) => {
    return (
    <div className='cell'>{ text }</div>
    )

}

export default Cell