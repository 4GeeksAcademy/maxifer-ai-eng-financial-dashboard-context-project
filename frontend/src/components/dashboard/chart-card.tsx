import { type ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface ChartCardProps {
  title: string
  description: string
  loading?: boolean
  children?: ReactNode
}

export function ChartCard({ title, description, loading, children }: ChartCardProps) {
  return (
    <Card className="min-w-0 border-border/60">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? <Skeleton className="h-[280px] w-full rounded-lg" /> : children}
      </CardContent>
    </Card>
  )
}

export function ChartsLoading() {
  return (
    <>
      <ChartCard
        title="Income vs. Outcome"
        description="Monthly revenue and expenditure evolution"
        loading
      />
      <ChartCard
        title="Profit Margin %"
        description="Monthly profit as a percentage of total income"
        loading
      />
    </>
  )
}
