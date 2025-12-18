import Papa from 'papaparse';
import { RunData, PersonMetrics } from '@/types/run-data';

export function processData(file: File): Promise<{ allData: RunData[], personMetrics: Record<string, PersonMetrics> }> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          // Validate headers
          const headers = results.meta.fields || [];
          if (!headers.includes('date') || !headers.includes('person') || !headers.includes('miles')) {
            throw new Error('CSV must contain columns: date, person, miles');
          }

          // Process data
          const allData: RunData[] = [];
          const personData: Record<string, RunData[]> = {};

          results.data.forEach((row: any) => {
            // Skip empty rows
            if (!row.date && !row.person && !row.miles) return;

            // Validate data
            if (!row.date || !row.person || row.miles === undefined) {
              throw new Error(`Row missing required data: ${JSON.stringify(row)}`);
            }

            // Validate date format (YYYY-MM-DD)
            if (!/^\d{4}-\d{2}-\d{2}$/.test(row.date)) {
              throw new Error(`Invalid date format: ${row.date}. Expected YYYY-MM-DD`);
            }

            // Validate miles is a number
            const miles = parseFloat(row.miles);
            if (isNaN(miles)) {
              throw new Error(`Invalid miles value: ${row.miles}. Must be a number`);
            }

            const runData: RunData = {
              date: row.date,
              person: row.person,
              miles: miles
            };

            allData.push(runData);

            // Group by person
            if (!personData[row.person]) {
              personData[row.person] = [];
            }
            personData[row.person].push(runData);
          });

          // Calculate per-person metrics
          const personMetrics: Record<string, PersonMetrics> = {};
          Object.keys(personData).forEach(person => {
            const runs = personData[person];
            const milesArray = runs.map(run => run.miles);
            const totalMiles = milesArray.reduce((sum, miles) => sum + miles, 0);
            
            personMetrics[person] = {
              totalRuns: runs.length,
              totalMiles: parseFloat(totalMiles.toFixed(2)),
              averageMiles: parseFloat((totalMiles / runs.length).toFixed(2)),
              minMiles: Math.min(...milesArray),
              maxMiles: Math.max(...milesArray)
            };
          });

          resolve({ allData, personMetrics });
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(new Error(`Failed to parse CSV: ${error.message}`));
      }
    });
  });
}

export function calculateMetrics(data: RunData[]): any {
  if (data.length === 0) return {};

  const milesArray = data.map(run => run.miles);
  const totalMiles = milesArray.reduce((sum, miles) => sum + miles, 0);
  
  return {
    totalRuns: data.length,
    totalMiles: parseFloat(totalMiles.toFixed(2)),
    averageMiles: parseFloat((totalMiles / data.length).toFixed(2)),
    minMiles: Math.min(...milesArray),
    maxMiles: Math.max(...milesArray)
  };
}