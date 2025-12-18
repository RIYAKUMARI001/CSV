"use client";

import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RunData } from "@/types/run-data";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Clipboard } from "lucide-react";

interface DataTableProps {
  data: RunData[];
}

type SortField = keyof RunData;
type SortDirection = 'asc' | 'desc';

export function DataTable({ data }: DataTableProps) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-lg">
        <CardTitle className="flex items-center text-gray-800">
          <div className="bg-amber-100 p-2 rounded-lg mr-3">
            <Clipboard className="h-5 w-5 text-amber-600" />
          </div>
          Detailed Run Records
        </CardTitle>
        <p className="text-gray-600 text-sm mt-1">All your running data in one place</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[120px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('date')}
                    className="hover:bg-gray-100 font-semibold text-gray-700 py-2 px-4 rounded-lg"
                  >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('person')}
                    className="hover:bg-gray-100 font-semibold text-gray-700 py-2 px-4 rounded-lg"
                  >
                    Runner
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('miles')}
                    className="hover:bg-gray-100 font-semibold text-gray-700 py-2 px-4 rounded-lg"
                  >
                    Miles
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((run, index) => (
                <TableRow 
                  key={index} 
                  className="hover:bg-blue-50 transition-colors"
                >
                  <TableCell className="font-medium text-gray-800 py-3 px-4">
                    {run.date}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-gray-700">
                    {run.person}
                  </TableCell>
                  <TableCell className="text-right py-3 px-4 font-medium text-gray-800">
                    {run.miles}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {data.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No running data available. Upload a CSV file to see your records here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}