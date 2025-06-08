"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock portfolio data
const portfolioData = {
  name: "My Investment Portfolio",
  totalValue: 5280.42,
  assets: [
    { symbol: "AAPL", name: "Apple Inc.", quantity: 2, value: 350.2 },
    { symbol: "MSFT", name: "Microsoft Corp.", quantity: 1, value: 280.75 },
    { symbol: "AMZN", name: "Amazon.com Inc.", quantity: 3, value: 420.3 },
    { symbol: "GOOGL", name: "Alphabet Inc.", quantity: 1, value: 310.15 },
    { symbol: "VTI", name: "Vanguard Total Stock Market ETF", quantity: 5, value: 1100.5 },
  ],
  performance: {
    day: [
      { time: "9:30", value: 5250.1 },
      { time: "10:30", value: 5245.3 },
      { time: "11:30", value: 5260.75 },
      { time: "12:30", value: 5255.2 },
      { time: "13:30", value: 5270.4 },
      { time: "14:30", value: 5275.8 },
      { time: "15:30", value: 5280.42 },
    ],
    week: [
      { time: "Mon", value: 5180.2 },
      { time: "Tue", value: 5210.45 },
      { time: "Wed", value: 5230.1 },
      { time: "Thu", value: 5245.75 },
      { time: "Fri", value: 5280.42 },
    ],
    month: [
      { time: "Week 1", value: 5050.3 },
      { time: "Week 2", value: 5120.75 },
      { time: "Week 3", value: 5190.2 },
      { time: "Week 4", value: 5280.42 },
    ],
    year: [
      { time: "Jan", value: 4800.1 },
      { time: "Feb", value: 4850.3 },
      { time: "Mar", value: 4920.75 },
      { time: "Apr", value: 5000.2 },
      { time: "May", value: 5080.4 },
      { time: "Jun", value: 5150.8 },
      { time: "Jul", value: 5200.42 },
      { time: "Aug", value: 5280.42 },
    ],
  },
}

export default function PortfolioPage() {
  const [timeframe, setTimeframe] = useState("day")

  const performanceData = portfolioData.performance[timeframe as keyof typeof portfolioData.performance]

  // Calculate performance metrics
  const firstValue = performanceData[0].value
  const lastValue = performanceData[performanceData.length - 1].value
  const change = lastValue - firstValue
  const percentChange = (change / firstValue) * 100
  const isPositive = change >= 0

  return (
    <div className="p-4 space-y-6 flex flex-col items-center">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-purple-800">{portfolioData.name}</h1>

        <Card className="shadow-sm mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-bold">${portfolioData.totalValue.toFixed(2)}</CardTitle>
            <div className={`text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {isPositive ? "+" : ""}
              {change.toFixed(2)} ({isPositive ? "+" : ""}
              {percentChange.toFixed(2)}%)
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="day" onValueChange={setTimeframe}>
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>

              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                    <YAxis
                      domain={["auto", "auto"]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      width={60}
                      tickFormatter={(value) => `$${value.toFixed(0)}`}
                    />
                    <Tooltip
                      formatter={(value) => [`$${typeof value === 'number' ? value.toFixed(2) : value}`, "Value"]}
                      labelFormatter={(label) => `Time: ${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-6">
          <h2 className="text-lg font-medium mb-3">Your Assets</h2>
          <div className="space-y-3">
            {portfolioData.assets.map((asset) => (
              <Card key={asset.symbol} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{asset.symbol}</div>
                      <div className="text-sm text-gray-500">{asset.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${asset.value.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">
                        {asset.quantity} {asset.quantity === 1 ? "share" : "shares"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
