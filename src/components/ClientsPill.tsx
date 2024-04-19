import React from 'react'

const styles = {
  primary: "bg-[#EAD3AA]",
  secondary: "bg-[#B39C844C]",
  terciary: "text-[#0B6BCB] bg-[#E3EFFB] border border-solid border-[#97C3F0]" 
}

const ClientsPill = ({title, value, style}) => {
  return (
    <div className={`flex rounded-xl font-semibold px-2 ${styles[style]}`}> {title}: {value}</div>
  )
}

export default ClientsPill


