"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footprints, MapPin, Ruler, ArrowDown, ArrowUp, User } from "lucide-react";

interface MetricsDisplayProps {
  overallMetrics: any;
  perPersonMetrics: Record<string, any>;
}

export function MetricsDisplay({ overallMetrics, perPersonMetrics }: MetricsDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Overall Metrics */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
          <CardTitle className="flex items-center text-gray-800">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            Overall Team Metrics
          </CardTitle>
          <p className="text-gray-600 text-sm mt-1">Combined stats for all runners</p>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-6">
          <MetricCard 
            title="Total Runs" 
            value={overallMetrics.totalRuns || 0} 
            description="All recorded runs"
            icon={<Footprints className="h-4 w-4" />}
          />
          <MetricCard 
            title="Total Miles" 
            value={overallMetrics.totalMiles || 0} 
            description="Sum of all distances"
            icon={<MapPin className="h-4 w-4" />}
          />
          <MetricCard 
            title="Average" 
            value={overallMetrics.averageMiles || 0} 
            description="Miles per run"
            icon={<Ruler className="h-4 w-4" />}
          />
          <MetricCard 
            title="Min Distance" 
            value={overallMetrics.minMiles || 0} 
            description="Shortest run"
            icon={<ArrowDown className="h-4 w-4" />}
          />
          <MetricCard 
            title="Max Distance" 
            value={overallMetrics.maxMiles || 0} 
            description="Longest run"
            icon={<ArrowUp className="h-4 w-4" />}
          />
        </CardContent>
      </Card>

      {/* Per Person Metrics */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <div className="bg-purple-100 p-2 rounded-lg mr-3 text-purple-700">
            <User className="h-5 w-5" />
          </div>
          Individual Runner Stats
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(perPersonMetrics).map(([person, metrics]) => (
            <Card key={person} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-gray-800">{person}</CardTitle>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {metrics.totalRuns} runs
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <MetricCard 
                  title="Total Miles" 
                  value={metrics.totalMiles || 0} 
                  icon={<MapPin className="h-4 w-4" />}
                />
                <MetricCard 
                  title="Average" 
                  value={metrics.averageMiles || 0} 
                  icon={<Ruler className="h-4 w-4" />}
                />
                <MetricCard 
                  title="Min Distance" 
                  value={metrics.minMiles || 0} 
                  icon={<ArrowDown className="h-4 w-4" />}
                />
                <MetricCard 
                  title="Max Distance" 
                  value={metrics.maxMiles || 0} 
                  icon={<ArrowUp className="h-4 w-4" />}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
function MetricCard({ title, value, description, icon }: { 
  title: string; 
  value: number | string; 
  description?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-gray-50 p-4 hover:bg-gray-100 transition-colors">
      <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      {description && (
        <div className="text-xs text-gray-400 mt-1">{description}</div>
      )}
    </div>
  );
}
