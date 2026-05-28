import React from 'react'
import StatCards from '../components/StatCard';
import { RevenueBarChart } from '../components/RevenueChart';
import { RecentInvoices } from '../components/RecentInvoices';

const Dashboard = () => {
  return (
    <div className="flex flex-col space-y-4">
      <StatCards />
      <div className="px-4 flex flex-col gap-6">
        <RevenueBarChart />
        <RecentInvoices />
      </div>
    </div>
  )
}

export default Dashboard
