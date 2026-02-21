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

export default function StatCard({
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

