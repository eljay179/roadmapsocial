export interface RoadmapItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'not-started' | 'in-progress' | 'completed';
  date: {
    year: number;
    quarter: 1 | 2 | 3 | 4;
    month: string;
  };
}

export interface TimelineMarker {
  year: number;
  quarter: number;
  month: string;
  items: RoadmapItem[];
}