"use client";

import { useState, useCallback } from "react";
import { UploadCard } from "@/components/dashboard/upload-card";
import { DataTable } from "@/components/dashboard/data-table";
import { MetricsDisplay } from "@/components/dashboard/metrics-display";
import { ChartsView } from "@/components/dashboard/charts-view";
import { processData, calculateMetrics } from "@/lib/data-processing";
import { RunData } from "@/types/run-data";
import { TrendingUp, Users, BarChart3, Database, Clipboard, Star, Check, Heart, Calendar, Ruler, Upload } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState<RunData[]>([]);
  const [metrics, setMetrics] = useState<any>({});
  const [perPersonMetrics, setPerPersonMetrics] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = useCallback((file: File) => {
    setIsLoading(true);
    setError(null);
    
    processData(file)
      .then(({ allData, personMetrics }) => {
        setData(allData);
        setMetrics(calculateMetrics(allData));
        setPerPersonMetrics(personMetrics);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to process CSV file");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <header className="mb-8 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full mb-4">
            <h1 className="text-2xl font-bold flex items-center"><TrendingUp className="mr-2" /> Runner Dashboard</h1>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Track Your Running Journey</h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto text-lg">
            Upload your CSV running data and discover insights about your progress. 
            Perfect for runners who love data!
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Upload Your Data</h2>
              </div>
              <UploadCard onFileUpload={handleFileUpload} isLoading={isLoading} error={error} />
            </div>
            
            {data.length > 0 && (
              <>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <BarChart3 className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Your Running Insights</h2>
                  </div>
                  <MetricsDisplay 
                    overallMetrics={metrics} 
                    perPersonMetrics={perPersonMetrics} 
                  />
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 p-2 rounded-lg mr-3">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Visualize Progress</h2>
                  </div>
                  <ChartsView 
                    data={data} 
                    overallMetrics={metrics} 
                    perPersonMetrics={perPersonMetrics} 
                  />
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-100 p-2 rounded-lg mr-3">
                      <Clipboard className="h-6 w-6 text-amber-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Detailed Records</h2>
                  </div>
                  <DataTable data={data} />
                </div>
              </>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-2">
                  <Clipboard className="h-5 w-5 text-blue-600" />
                </div>
                How to Get Started
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                    <Database className="h-3 w-3" />
                  </div>
                  <p className="text-gray-600">Prepare a CSV with columns: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">date, person, miles</code></p>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                    <Calendar className="h-3 w-3" />
                  </div>
                  <p className="text-gray-600">Format dates as <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">YYYY-MM-DD</code> (e.g., 2023-01-15)</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                    <Ruler className="h-3 w-3" />
                  </div>
                  <p className="text-gray-600">Enter miles as numbers (e.g., <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">3.5</code>)</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                    <Upload className="h-3 w-3" />
                  </div>
                  <p className="text-gray-600">Upload and explore your running insights!</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Pro tip:</span> Try our sample file to see how it works! 
                  Just download <a href="/sample-running-data.csv" className="underline font-medium">sample-running-data.csv</a> and upload it.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-2">
                  <Star className="h-5 w-5" />
                </div>
                Why Runners Love This
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-green-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <span>Spot trends in your running habits</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <span>Compare progress with friends or over time</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <span>Set and track meaningful goals</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <span>No complicated setup - just upload and go!</span>
                </li>
              </ul>
              
              <div className="mt-6 text-center text-sm text-blue-100">
                Made with <Heart className="inline h-4 w-4" /> for runners everywhere
              </div>
            </div>
          </div>
        </div>
        
        {data.length === 0 && (
          <div className="mt-12 text-center py-12">
            <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-full">
              <h3 className="text-xl font-bold">Ready to Analyze Your Runs?</h3>
              <p className="mt-2 opacity-90">Upload your CSV file to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>  );
}