export interface RunData {
  date: string;
  person: string;
  miles: number;
}

export interface PersonMetrics {
  totalRuns: number;
  totalMiles: number;
  averageMiles: number;
  minMiles: number;
  maxMiles: number;
}