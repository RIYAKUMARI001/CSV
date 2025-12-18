"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RunData } from "@/types/run-data";
import { TrendingUp, Trophy, Scale } from "lucide-react";

interface ChartsViewProps {
  data: RunData[];
  overallMetrics: any;
  perPersonMetrics: Record<string, any>;
}

export function ChartsView({ data, overallMetrics, perPersonMetrics }: ChartsViewProps) {
  // Prepare data for overall distance over time chart
  const distanceOverTimeData = data
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(run => ({
      date: run.date,
      miles: run.miles
    }));

  // Prepare data for per-person comparison
  const perPersonData = Object.entries(perPersonMetrics).map(([person, metrics]) => ({
    person,
    totalMiles: metrics.totalMiles,
    averageMiles: metrics.averageMiles,
    runs: metrics.totalRuns
  }));

  return (
    <div className="space-y-6">
      {/* Distance Over Time Chart */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
          <CardTitle className="flex items-center text-gray-800">
            <div className="bg-purple-100 p-2 rounded-lg mr-3">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            Progress Over Time
          </CardTitle>
          <p className="text-gray-600 text-sm mt-1">See how your running distance has evolved</p>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={distanceOverTimeData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="miles" 
                name="Miles Run" 
                stroke="#8884d8" 
                strokeWidth={3}
                activeDot={{ r: 8, fill: '#6366f1' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Per Person Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 rounded-t-lg">
            <CardTitle className="flex items-center text-gray-800">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <Trophy className="h-5 w-5 text-green-600" />
              </div>
              Total Miles by Runner
            </CardTitle>
            <p className="text-gray-600 text-sm mt-1">Who's covered the most ground?</p>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={perPersonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="person" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Legend />
                <Bar dataKey="totalMiles" name="Total Miles" fill="#82ca9d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-lg">
            <CardTitle className="flex items-center text-gray-800">
              <div className="bg-amber-100 p-2 rounded-lg mr-3">
                <Scale className="h-5 w-5 text-amber-600" />
              </div>
              Average Distance per Run
            </CardTitle>
            <p className="text-gray-600 text-sm mt-1">Consistency matters more than occasional bursts</p>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={perPersonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="person" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Legend />
                <Bar dataKey="averageMiles" name="Average Miles" fill="#ffc658" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}