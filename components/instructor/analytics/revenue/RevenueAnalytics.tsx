import React, { useState } from 'react';
import { RevenueOverview } from './RevenueOverview';
import { PayoutHistory } from './PayoutHistory';
import { RevenueBreakdown } from './RevenueBreakdown';

export function RevenueAnalytics() {
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'year'>('month');

  return (
    <div className="space-y-8">
      <RevenueOverview 
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />
      <RevenueBreakdown />
      <PayoutHistory />
    </div>
  );
}