"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { getAttendanceCountsByDepartment } from "@/app/services/adminFirestoreService"
import { useState,useEffect } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
// const chartData = 
//   [
//     {
//         "department": "Business Administration",
//         "trueCount": 1,
//         "falseCount": 1
//     },
//     {
//         "department": "Health Sciences",
//         "trueCount": 0,
//         "falseCount": 0
//     },
//     {
//         "department": "Engineering",
//         "trueCount": 0,
//         "falseCount": 1
//     },
//     {
//         "department": "Information Communication Technology",
//         "trueCount": 39,
//         "falseCount": 42
//     }
// ]


const chartConfig = {
 present: {
      label: "Present",
      color: "hsl(var(--chart-1))",
    },
    absent: {
      label: "Absent",
      color: "hsl(var(--chart-2))",
    },


}

export function AdminBarChart() {
  const [chartData, setChartData] = useState([]);

  const getAndSetChartData = async () => {
    const getData = await getAttendanceCountsByDepartment();

    const formattedData = getData.map(dept => ({
      department: dept.department,
      present: dept.trueCount,
      absent: dept.falseCount
    }));

    setChartData(formattedData);
  };

  useEffect(() => {
    getAndSetChartData();
  }, []);

  return (
    <Card className="xl:col-span-2 " x-chunk="dashboard-01-chunk-4">
      <CardHeader>
        <CardTitle>Bar Chart - Attendance</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig} className="h-96 w-full p-6">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="department" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="present" fill="var(--chart-1)" radius={4} />
            <Bar dataKey="absent" fill="var(--chart-2)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      
      </CardFooter>
    </Card>
  );
}
