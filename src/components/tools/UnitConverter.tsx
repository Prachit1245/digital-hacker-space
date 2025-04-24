
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type ConversionType = 'ropani' | 'bigha' | 'tola';

interface ConversionFactor {
  factor: number;
  fromUnit: string;
  toUnit: string;
  description: string;
}

const CONVERSION_FACTORS: Record<ConversionType, ConversionFactor> = {
  ropani: {
    factor: 508.72, // 1 Ropani = 508.72 square meters
    fromUnit: 'Ropani',
    toUnit: 'Square Meters',
    description: '1 Ropani = 508.72 m²'
  },
  bigha: {
    factor: 0.677263, // 1 Bigha = 0.677263 hectares
    fromUnit: 'Bigha',
    toUnit: 'Hectares',
    description: '1 Bigha = 0.677263 hectares'
  },
  tola: {
    factor: 11.664, // 1 Tola = 11.664 grams
    fromUnit: 'Tola',
    toUnit: 'Grams',
    description: '1 Tola = 11.664 grams'
  }
};

const UnitConverter = () => {
  const [value, setValue] = useState<string>('1');
  const [unit, setUnit] = useState<ConversionType>('ropani');
  const [result, setResult] = useState<string>('');
  const [isReverse, setIsReverse] = useState<boolean>(false);

  // Handle conversion when inputs change
  useEffect(() => {
    handleConvert();
  }, [value, unit, isReverse]);

  const handleConvert = () => {
    try {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        setResult('');
        return;
      }

      const conversionInfo = CONVERSION_FACTORS[unit];
      let converted: number;
      
      if (isReverse) {
        // Convert from metric to Nepali units
        converted = numValue / conversionInfo.factor;
      } else {
        // Convert from Nepali units to metric
        converted = numValue * conversionInfo.factor;
      }
      
      setResult(converted.toFixed(4));
    } catch (error) {
      toast({
        title: "Conversion Error",
        description: "Please enter a valid number.",
        variant: "destructive"
      });
    }
  };

  // Toggle conversion direction
  const toggleDirection = () => {
    setIsReverse(!isReverse);
  };

  // Get current units based on direction
  const fromUnit = isReverse 
    ? CONVERSION_FACTORS[unit].toUnit 
    : CONVERSION_FACTORS[unit].fromUnit;
    
  const toUnit = isReverse 
    ? CONVERSION_FACTORS[unit].fromUnit 
    : CONVERSION_FACTORS[unit].toUnit;

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Unit Converter</h2>
        <Calculator className="h-6 w-6 text-neon-blue" />
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="value">{`Value (${fromUnit})`}</Label>
          <Input
            id="value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
          />
        </div>

        <div>
          <Label htmlFor="unit">Unit Type</Label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value as ConversionType)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="ropani">Ropani ↔ Square Meters</option>
            <option value="bigha">Bigha ↔ Hectares</option>
            <option value="tola">Tola ↔ Grams</option>
          </select>
        </div>

        <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs" 
            onClick={toggleDirection}
          >
            {`${fromUnit} → ${toUnit}`} (Click to reverse)
          </Button>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <Label>Result</Label>
            <p className="text-2xl font-semibold text-neon-blue">
              {result} {toUnit}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {CONVERSION_FACTORS[unit].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitConverter;
