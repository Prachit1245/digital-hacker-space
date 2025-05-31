import React from 'react';
import { ExternalLink, MapPin, Calendar, Building2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

const JobsSection = () => {
  const jobs = [
    {
      title: 'IT Monitoring & Escalation Assistant',
      company: 'CIS',
      companyFull: 'CIS (US Company)',
      location: 'Parbat, Nepal (Remote)',
      startDate: 'May 1, 2025',
      endDate: 'Present',
      description: 'Responsible for monitoring IT systems and managing escalation procedures to ensure optimal system performance and quick resolution of technical issues. Handle critical system alerts, coordinate with technical teams, and maintain system uptime across enterprise infrastructure.',
      website: 'https://www.cisus.com/',
      logo: 'https://www.cisus.com/wp-content/uploads/2021/06/CIS-logo-1.png',
      skills: ['System Monitoring', 'Incident Management', 'Technical Support', 'Escalation Procedures']
    }
  ];

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = endDate === 'Present' ? new Date() : new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(diffDays / 365);
      const remainingMonths = Math.floor((diffDays % 365) / 30);
      return `${years} year${years > 1 ? 's' : ''} ${remainingMonths > 0 ? `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`.trim();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {jobs.map((job, index) => (
        <Card key={index} className="group hover:shadow-xl transition-all duration-500 border border-gray-200 hover:border-neon-blue/40 bg-gradient-to-br from-white to-gray-50/30 overflow-hidden">
          <CardHeader className="pb-6 bg-gradient-to-r from-blue-50/50 to-purple-50/30">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <div 
                  className="relative group/logo cursor-pointer"
                  onClick={() => window.open(job.website, '_blank')}
                >
                  <div className="w-16 h-16 bg-white rounded-xl border-2 border-gray-200 flex items-center justify-center shadow-sm group-hover/logo:shadow-lg group-hover/logo:border-neon-blue/50 transition-all duration-300 hover:scale-105">
                    <Avatar className="w-14 h-14">
                      <AvatarImage 
                        src={job.logo} 
                        alt={`${job.company} logo`}
                        className="object-contain p-1"
                      />
                      <AvatarFallback className="font-bold text-neon-blue text-lg bg-gradient-to-br from-blue-100 to-purple-100">
                        {job.company.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-neon-blue transition-colors duration-300 mb-2">
                    {job.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-gray-500" />
                      <span 
                        className="font-semibold text-gray-700 cursor-pointer hover:text-neon-blue transition-colors duration-200 flex items-center gap-1"
                        onClick={() => window.open(job.website, '_blank')}
                      >
                        {job.companyFull}
                        <ExternalLink 
                          size={14} 
                          className="text-gray-400 hover:text-neon-blue transition-colors duration-200"
                        />
                      </span>
                    </div>
                  </CardDescription>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-gray-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-gray-500" />
                      <span>{job.startDate} - {job.endDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">
                  {calculateDuration(job.startDate, job.endDate)}
                </div>
                <div className="mt-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                  {job.endDate}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-700 leading-relaxed mb-4 text-justify">
              {job.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, skillIndex) => (
                <span 
                  key={skillIndex}
                  className="px-3 py-1 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 text-gray-700 rounded-full text-xs font-medium border border-gray-200 hover:border-neon-blue/30 transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobsSection;
