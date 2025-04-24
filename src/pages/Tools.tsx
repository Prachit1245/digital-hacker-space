
import React from 'react';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DateConverter from '@/components/tools/DateConverter';
import TypingPractice from '@/components/tools/TypingPractice';
import UnitConverter from '@/components/tools/UnitConverter';

const Tools = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Tools | Prachit Regmi";
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden relative">
      <div className="absolute inset-0 circuit-bg opacity-5 z-[-1]"></div>
      
      <Navbar />
      
      <section className="py-20 px-4 sm:px-6 relative mt-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800">Useful Tools</h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl">
            A collection of handy utilities for Nepali users, from date conversion to typing practice.
          </p>
          
          <Tabs defaultValue="dateconverter" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
              <TabsTrigger value="dateconverter">Date Converter</TabsTrigger>
              <TabsTrigger value="typing">Typing Practice</TabsTrigger>
              <TabsTrigger value="units">Unit Converter</TabsTrigger>
            </TabsList>
            <TabsContent value="dateconverter">
              <DateConverter />
            </TabsContent>
            <TabsContent value="typing">
              <TypingPractice />
            </TabsContent>
            <TabsContent value="units">
              <UnitConverter />
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <footer className="py-8 px-4 sm:px-6 border-t border-gray-200 relative bg-white">
        <div className="absolute inset-0 circuit-bg opacity-5 z-[-1]"></div>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 mb-4">
            © {new Date().getFullYear()} Prachit Regmi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Tools;
