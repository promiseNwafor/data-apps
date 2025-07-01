/**
 * Performance utilities for handling large datasets efficiently
 */

// Debounce function for search/filter inputs
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
}

// Throttle function for scroll events or frequent updates
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Chunk large arrays for processing
export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

// Virtual scrolling helper - calculate visible range
export function calculateVisibleRange(
  scrollTop: number,
  containerHeight: number,
  itemHeight: number,
  totalItems: number,
  overscan: number = 3
): { start: number; end: number } {
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleItems = Math.ceil(containerHeight / itemHeight);
  const end = Math.min(totalItems, start + visibleItems + overscan * 2);
  
  return { start, end };
}

// Memory-efficient data processing for large datasets
export function processDataInBatches<T, R>(
  data: T[],
  processor: (item: T) => R,
  batchSize: number = 100
): Promise<R[]> {
  return new Promise((resolve) => {
    const results: R[] = [];
    let currentIndex = 0;

    function processBatch() {
      const endIndex = Math.min(currentIndex + batchSize, data.length);
      
      for (let i = currentIndex; i < endIndex; i++) {
        results.push(processor(data[i]));
      }
      
      currentIndex = endIndex;
      
      if (currentIndex < data.length) {
        // Use setTimeout to yield control back to the main thread
        setTimeout(processBatch, 0);
      } else {
        resolve(results);
      }
    }
    
    processBatch();
  });
}

// Optimize aggregation for large datasets
export function optimizedGroupBy<T>(
  data: T[],
  keySelector: (item: T) => string | number,
  aggregator?: (items: T[]) => any
): Map<string | number, T[] | any> {
  const groups = new Map<string | number, T[]>();
  
  // Single pass grouping
  for (const item of data) {
    const key = keySelector(item);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(item);
  }
  
  // Apply aggregation if provided
  if (aggregator) {
    const aggregatedGroups = new Map();
    for (const [key, items] of groups) {
      aggregatedGroups.set(key, aggregator(items));
    }
    return aggregatedGroups;
  }
  
  return groups;
}

// Performance monitoring utility
export class PerformanceMonitor {
  private static marks = new Map<string, number>();
  
  static mark(name: string): void {
    this.marks.set(name, performance.now());
  }
  
  static measure(name: string, startMark: string): number {
    const startTime = this.marks.get(startMark);
    if (!startTime) {
      console.warn(`Start mark "${startMark}" not found`);
      return 0;
    }
    
    const duration = performance.now() - startTime;
    console.log(`${name}: ${duration.toFixed(2)}ms`);
    return duration;
  }
  
  static clear(): void {
    this.marks.clear();
  }
}