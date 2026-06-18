import { Filter } from "lucide-react";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
}

export default function DateRangePicker({ startDate, endDate, onChange }: DateRangePickerProps) {
  return (
    <div className="date-range-picker">
      <Filter size={15} />
      <input type="date" value={startDate} onChange={(e) => onChange(e.target.value, endDate)} />
      <span className="date-sep">—</span>
      <input type="date" value={endDate} onChange={(e) => onChange(startDate, e.target.value)} />
    </div>
  );
}
