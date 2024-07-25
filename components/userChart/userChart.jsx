"use client"
import React, { useEffect, useState } from 'react';

import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart,Tooltip  } from "recharts"
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,
} from "@/components/ui/card"
import {ChartConfig,ChartContainer,ChartTooltip,ChartTooltipContent,} from "@/components/ui/chart"
import { getUserCounts } from '@/app/services/adminFirestoreService';

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} 


const UserChart = () => {
    const [cardData, setCardData] = useState([]);
    const [chartData, setChartData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { cardData, chartData } = await getUserCounts();
          setCardData(cardData);
          setChartData(chartData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const chartConfig = {
      visitors: {
        label: "Visitors",
      },
      students: {
        label: "Students",
        color: "[#6418C3]",
      },
      lecturers: {
        label: "Lecturers",
        color: "hsl(var(--chart-2))",
      },
      admins: {
        label: "Admins",
        color: "hsl(var(--chart-3))",
      },
    };
  
    const totalVisitors = React.useMemo(() => {
      return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [chartData]);
  
    return (
      <Card className="flex flex-col ">
        <CardHeader className="items-center pb-0">
          <CardTitle>User Roles Distribution </CardTitle>
          <CardDescription>Distribution of user roles within the system</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-[500px]"
          >
            <PieChart>
              <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Users
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
          This chart shows the percentage of students, lecturers, and admins within the system 
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total users
          </div>
        </CardFooter>
      </Card>
    );
}

export default UserChart;
