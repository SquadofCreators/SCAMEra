import React from 'react'
import AnalyticsCard from '../components/AnalyticsCard'
import { analyticsData } from '../constants/AnalyticsData'

function Analytics() {

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Analytics</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          analyticsData.map((data, index) => (
            <AnalyticsCard key={index} data={data} />
          ))
        }
      </div>
    </div>
  )
}

export default Analytics