
import React from 'react';
import { ExternalLink, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const JobsSection = () => {
  const jobs = [
    {
      title: 'IT Monitoring & Escalation Assistant',
      company: 'CIS',
      companyFull: 'CIS',
      location: 'Nepal',
      period: 'Current',
      description: 'Responsible for monitoring IT systems and managing escalation procedures to ensure optimal system performance and quick resolution of technical issues.',
      website: 'https://www.cisus.com/',
      logo: 'https://www.cisus.com/wp-content/uploads/2021/06/CIS-logo-1.png'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      {jobs.map((job, index) => (
        <Card key={index} className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-neon-blue/30">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => window.open(job.website, '_blank')}
                >
                  <img 
                    src={job.logo} 
                    alt={`${job.company} logo`}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = job.company.charAt(0);
                        parent.className += ' font-bold text-neon-blue text-lg';
                      }
                    }}
                  />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-neon-blue transition-colors">
                    {job.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <span 
                      className="font-medium text-gray-700 cursor-pointer hover:text-neon-blue transition-colors"
                      onClick={() => window.open(job.website, '_blank')}
                    >
                      {job.company}
                    </span>
                    <ExternalLink 
                      size={14} 
                      className="text-gray-400 cursor-pointer hover:text-neon-blue transition-colors"
                      onClick={() => window.open(job.website, '_blank')}
                    />
                  </CardDescription>
                </div>
              </div>
              <div className="text-right text-sm text-gray-500">
                <div className="flex items-center gap-1 mb-1">
                  <Calendar size={14} />
                  <span>{job.period}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">{job.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobsSection;
