"use client";

import { useState, useRef, DragEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, AlertCircle, Info } from "lucide-react";

interface UploadCardProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
  error: string | null;
}

export function UploadCard({ onFileUpload, isLoading, error }: UploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setFileName(file.name);
        onFileUpload(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setFileName(file.name);
        onFileUpload(file);
      }
    }
  };

  const validateFile = (file: File): boolean => {
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      alert("Please upload a CSV file");
      return false;
    }
    return true;
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className={`border-2 ${isDragging ? "border-blue-500 border-dashed bg-blue-50" : "border-gray-200"} transition-all duration-200`}>
      <CardHeader>
        <CardTitle className="flex items-center text-gray-800">
          <span className="bg-blue-100 p-2 rounded-lg mr-3">
            <Upload className="h-5 w-5 text-blue-600" />
          </span>
          Upload Running Data
        </CardTitle>
        <CardDescription className="text-gray-600">
          Share your running journey with us! Upload a CSV file with your run details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4 animate-pulse">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragging 
              ? "border-blue-500 bg-blue-50 scale-[1.02]" 
              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv,text/csv"
            className="hidden"
            disabled={isLoading}
          />
          
          <div className="mx-auto bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>
          
          <div className="mt-4">
            <Button 
              disabled={isLoading} 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Processing Your Data...
                </>
              ) : (
                "Choose CSV File"
              )}
            </Button>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            or simply drag and drop your file here
          </p>
          
          {fileName && (
            <div className="mt-4 inline-flex items-center justify-center text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-full">
              <FileText className="mr-2 h-4 w-4 text-blue-500" />
              <span className="font-medium truncate max-w-xs">{fileName}</span>
            </div>
          )}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
            <div className="bg-gray-200 p-1 rounded mr-2">
              <Info className="h-4 w-4 text-gray-600" />
            </div>
            Expected CSV Format
          </h4>
          <pre className="mt-2 bg-white p-3 rounded text-xs overflow-x-auto border border-gray-200 font-mono">
            date,person,miles{"\n"}
            2023-01-15,John Doe,3.5{"\n"}
            2023-01-16,Jane Smith,4.2
          </pre>
          <p className="mt-2 text-xs text-gray-600">
            Make sure your file has these exact column names in the first row
          </p>
        </div>
      </CardContent>
    </Card>  );
}