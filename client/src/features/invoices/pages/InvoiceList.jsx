import React from 'react'
import { InvoiceTable } from '../components/InvoiceTable'
//import { DataTable } from '../components/data-table/DataTable'

const InvoiceList = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Invoice List</h1>
      <InvoiceTable/>
    </div>
  )
}

export default InvoiceList
