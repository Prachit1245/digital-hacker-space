
import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const DateConverter = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [isBS, setIsBS] = React.useState(false);

  // Note: This is a placeholder conversion - you'll need to implement actual BS-AD conversion logic
  const convertDate = (date: Date, toBS: boolean) => {
    // Placeholder conversion logic
    return {
      year: date.getFullYear() + (toBS ? 56.7 : -56.7),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  };

  const convertedDate = convertDate(date, isBS);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Date Converter</h2>
        <div className="flex items-center space-x-2">
          <Label htmlFor="bs-toggle">BS</Label>
          <Switch
            id="bs-toggle"
            checked={isBS}
            onCheckedChange={setIsBS}
          />
          <Label htmlFor="bs-toggle">AD</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Label className="mb-2 block">Select Date ({isBS ? 'AD' : 'BS'})</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => date && setDate(date)}
            className="rounded-md border"
          />
        </div>

        <div className="space-y-4">
          <div>
            <Label className="mb-2 block">Converted Date ({isBS ? 'BS' : 'AD'})</Label>
            <div className="text-2xl font-semibold text-neon-blue">
              {`${Math.floor(convertedDate.year)}/${convertedDate.month}/${convertedDate.day}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateConverter;
