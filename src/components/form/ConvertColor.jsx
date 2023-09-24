import React from 'react'

export const ConvertColor = ({item,className}) => {
  return (
    
    <div className={className} style={{background:`${item?item:"null"}` ,color:`${item?item:"null"}`}}></div>
  )
}