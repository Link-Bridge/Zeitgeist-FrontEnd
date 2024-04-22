import React from 'react'
import ClientsCard from './ClientsCard'

const clients = [
    {
        id:1,
        name: "Pollman México",
        accountingHours: 20,
        legalHours: 15,
        chargeableHours: 10,
        totalProjects: 5,
    },
    {
        id:2,
        name: "Pollman México",
        accountingHours: 20,
        legalHours: 15,
        chargeableHours: 10,
        totalProjects: 5,
    },
    {
        id:3,
        name: "Pollman México",
        accountingHours: 20,
        legalHours: 15,
        chargeableHours: 10,
        totalProjects: 5,
    },
    {
        id:4,
        name: "Pollman México",
        accountingHours: 20,
        legalHours: 15,
        chargeableHours: 10,
        totalProjects: 5,
    },
    {
        id:5,
        name: "Pollman México",
        accountingHours: 20,
        legalHours: 15,
        chargeableHours: 10,
        totalProjects: 5,
    },
    {
        id:6,
        name: "Pollman México",
        accountingHours: 20,
        legalHours: 15,
        chargeableHours: 10,
        totalProjects: 5,
    },
]


const CardsGrid = () => {
  return (
    <div className='flex flex-col w-full'>
        <section className='flex flex-row justify-end p-5 gap-6'>
            <button>Not Archived</button>
            <button className='bg-[#9C844C] text-white rounded-lg'>+ New Client</button>
            
        </section>
        <section className='flex justify-between flex-row flex-wrap gap-3 bg-white rounded-xl shadow-md p-7'>
            {clients.map((client) => (
                <ClientsCard 
                    name={client.name}
                    accountingHours= {client.accountingHours}
                    legalHours= {client.legalHours}
                    chargeableHours= {client.chargeableHours}
                    totalProjects= {client.totalProjects}
                />
            ))}
        </section>
    </div>
  )
}

export default CardsGrid