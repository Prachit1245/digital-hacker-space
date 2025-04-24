
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

// Mapping constants for BS-AD conversion
const BS_MONTHS_DAYS = {
  2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  // ... extending with more years would make this more complete
};

// First day of BS 2000 is 1943-04-14 in AD
const BS_START_DATE = new Date(1943, 3, 14);  

const DateConverter = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [isBS, setIsBS] = useState(false);
  const [convertedDate, setConvertedDate] = useState<{year: number, month: number, day: number}>({
    year: 0,
    month: 0,
    day: 0
  });

  // Convert AD to BS
  const adToBS = (adDate: Date): {year: number, month: number, day: number} => {
    // For demo purposes, using a simplified conversion logic
    // In a real app, this would need a more complex algorithm with precise mappings
    
    // Simplified conversion: AD date to BS date (approximate)
    const yearDiff = 56.7; // Average difference between BS and AD years
    const adYear = adDate.getFullYear();
    const adMonth = adDate.getMonth() + 1;
    const adDay = adDate.getDate();
    
    const bsYear = Math.floor(adYear + yearDiff);
    // Month and day conversion would be more complex in reality
    return {
      year: bsYear,
      month: adMonth,
      day: adDay
    };
  };

  // Convert BS to AD
  const bsToAD = (bsYear: number, bsMonth: number, bsDay: number): Date => {
    // For demo purposes, using a simplified conversion logic
    // In a real app, this would use a more complex algorithm
    
    const yearDiff = 56.7; // Average difference
    const adYear = Math.floor(bsYear - yearDiff);
    
    // This is simplified - a real converter would need to account for different
    // month lengths and starting points
    return new Date(adYear, bsMonth - 1, bsDay);
  };

  // Update converted date when input changes
  React.useEffect(() => {
    try {
      if (isBS) {
        // Convert AD to BS
        const bsDate = adToBS(date);
        setConvertedDate(bsDate);
      } else {
        // Convert BS to AD (assuming input is in BS)
        // For demo, we'll use current date values
        const adDate = bsToAD(2080, date.getMonth() + 1, date.getDate());
        const adYear = adDate.getFullYear();
        const adMonth = adDate.getMonth() + 1;
        const adDay = adDate.getDate();
        
        setConvertedDate({
          year: adYear,
          month: adMonth,
          day: adDay
        });
      }
    } catch (error) {
      toast({
        title: "Conversion Error",
        description: "Unable to convert the date. Please try another date.",
        variant: "destructive"
      });
    }
  }, [date, isBS]);

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
            className="rounded-md border pointer-events-auto"
          />
          <div className="mt-2 text-gray-600">
            Selected date: {format(date, 'yyyy/MM/dd')}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="mb-2 block">Converted Date ({isBS ? 'BS' : 'AD'})</Label>
            <div className="text-2xl font-semibold text-neon-blue">
              {`${convertedDate.year}/${String(convertedDate.month).padStart(2, '0')}/${String(convertedDate.day).padStart(2, '0')}`}
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Note: This is a simplified conversion for demonstration purposes.
              A full implementation would use a complete calendar mapping algorithm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateConverter;
