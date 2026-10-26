import { IncomeOutcomeChart } from './income-outcome-chart'
import { ProfitPercentChart } from './profit-percent-chart'
import { type MonthlyDataPoint } from '@/lib/financial-types'

export default function FinancialCharts({ data, loading }: { data: MonthlyDataPoint[]; loading: boolean }) {
  return (
    <>
      <IncomeOutcomeChart data={data} loading={loading} />
      <ProfitPercentChart data={data} loading={loading} />
    </>
  )
}
