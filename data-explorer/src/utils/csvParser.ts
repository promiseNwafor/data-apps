export interface DataRow {
  [key: string]: string | number;
}

export function parseCSV(csvString: string): DataRow[] {
  if (!csvString.trim()) {
    return [];
  }

  const lines = csvString.trim().split('\n');
  if (lines.length < 2) {
    return [];
  }

  const headers = lines[0].split(',').map(header => header.trim());
  const data: DataRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(value => value.trim());
    
    if (values.length !== headers.length) {
      console.warn(`Row ${i} has ${values.length} values but expected ${headers.length}`);
      continue;
    }

    const row: DataRow = {};
    headers.forEach((header, index) => {
      const value = values[index];
      // Try to convert to number if it looks like a number
      const numericValue = Number(value);
      row[header] = !isNaN(numericValue) && value !== '' ? numericValue : value;
    });

    data.push(row);
  }

  return data;
}

export function getColumnNames(data: DataRow[]): string[] {
  if (data.length === 0) return [];
  return Object.keys(data[0]);
}

export function getColumnType(data: DataRow[], columnName: string): 'string' | 'number' {
  if (data.length === 0) return 'string';
  
  const sampleValue = data[0][columnName];
  return typeof sampleValue === 'number' ? 'number' : 'string';
}