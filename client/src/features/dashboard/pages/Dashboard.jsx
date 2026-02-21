import React from 'react'
import StatCard from '../components/StatCard';

const Dashboard = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 p-4 @xl/main:p-6">
      
        <StatCard
          description="Total Revenue"
          value="$1,250.00"
          percentage="+12.5%"
          footerTitle="Trending up this month"
          footerSubtitle="Visitors for the last 6 months"
        />
        <StatCard
          description="Churn Rate"
          value="5.2%"
          percentage="-3%"
          footerTitle="Trending down this quarter"
          footerSubtitle="Customer retention dropped"
        />
        <StatCard
          description="Active Users"
          value="1,000"
          percentage="0%"
          footerTitle="No significant change"
          footerSubtitle="Stable compared to last period"
        />
        <StatCard
          description="Customer Satisfaction"
          value="85%"
          percentage="+5%"
          footerTitle="Trending up this week"
          footerSubtitle="Customer satisfaction increased"
        />

    </div>
  )
}

export default Dashboard
