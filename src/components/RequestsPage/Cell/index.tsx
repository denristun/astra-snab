import React, { FunctionComponent } from 'react'

import useStyles from './styles'

// const classes = useStyles()

type CellProps = {
    text: string,
  }
  

const Cell: FunctionComponent<CellProps> = ({text}) => {
    return (
    <div >{ text }</div>
    )

}

export default Cell