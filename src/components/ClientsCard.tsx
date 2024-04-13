import React from 'react'
import ClientsPill from './ClientsPill'

const ClientsCard = ({name, accountingHours, legalHours, chargeableHours, totalProjects}) => {
  return (
    <div className='flex bg-[#EFEFEF] p-5 rounded-xl flex-col min-w-[280px] w-full max-w-[420px]'>
        <header className='mb-3 text-xl'>
            {name}
        </header>
        <div className='grid grid-cols-2 gap-2'>
            <ClientsPill title={"Accounting Hours"} value={accountingHours} style={"primary"}/>
            <ClientsPill title={"Legal Hours"} value={legalHours} style={"primary"}/>
            <ClientsPill title={"Chargeable Hours"} value={chargeableHours} style={"secondary"}/>
            <ClientsPill title={"Total Projects"} value={totalProjects} style={"terciary"}/>
            
        </div>
    </div>
    
  )
}

export default ClientsCard