
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Ruler } from "lucide-react";

const UnitConverter = () => {
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('ropani');
  const [result, setResult] = useState('');

  const conversions = {
    ropani: {
      toMetric: (val: number) => val * 508.72, // 1 Ropani = 508.72 square meters
      label: 'Ropani to Square Meters'
    },
    bigha: {
      toMetric: (val: number) => val * 6772.63, // 1 Bigha = 6772.63 square meters
      label: 'Bigha to Hectares'
    },
    tola: {
      toMetric: (val: number) => val * 11.664, // 1 Tola = 11.664 grams
      label: 'Tola to Grams'
    }
  };

  const handleConvert = () => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const converted = conversions[unit as keyof typeof conversions].toMetric(numValue);
      setResult(converted.toFixed(2));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Unit Converter</h2>
        <Ruler className="h-6 w-6 text-neon-blue" />
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="value">Value</Label>
          <Input
            id="value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
          />
        </div>

        <div>
          <Label htmlFor="unit">Unit</Label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="ropani">Ropani to Square Meters</option>
            <option value="bigha">Bigha to Hectares</option>
            <option value="tola">Tola to Grams</option>
          </select>
        </div>

        <Button onClick={handleConvert} className="w-full">
          Convert
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <Label>Result</Label>
            <p className="text-2xl font-semibold text-neon-blue">
              {result} {unit === 'ropani' ? 'm²' : unit === 'bigha' ? 'ha' : 'g'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitConverter;
