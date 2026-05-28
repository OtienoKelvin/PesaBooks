import { IconTrendingDown, IconTrendingUp, IconMinus } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function StatCard({
    description,
    value,
    percentage,
    footerTitle,
    footerSubtitle,

}) {
    // Normalize percentage string into a number
  const numericValue = parseFloat(percentage.replace("%", ""))

  let TrendIcon
  let badgeColor

  if (numericValue > 0) {
    TrendIcon = IconTrendingUp
    badgeColor = "text-green-600"
  } else if (numericValue < 0) {
    TrendIcon = IconTrendingDown
    badgeColor = "text-red-600"
  } else {
    TrendIcon = IconMinus
    badgeColor = "text-gray-500"
  }


  return (
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{description}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={badgeColor}>
              <TrendIcon className="size-4" />
              {percentage}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {footerTitle} <TrendIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {footerSubtitle}
          </div>
        </CardFooter>
      </Card>
  )
}

function StatCards() {
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
  )}

export default StatCards 