
import React from 'react';
import { Shield, CheckCircle, Users, Award } from 'lucide-react';

const TrustSection = () => {
  const companies = [
    { name: 'FlutterWave', logo: 'FW' },
    { name: 'Paystack', logo: 'PS' },
    { name: 'Kuda Bank', logo: 'KB' },
    { name: 'PiggyVest', logo: 'PV' },
    { name: 'Bamboo', logo: 'BM' },
    { name: 'Carbon', logo: 'CB' }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Verified Users' },
    { icon: Shield, value: '99.9%', label: 'Success Rate' },
    { icon: CheckCircle, value: '24/7', label: 'Support' },
    { icon: Award, value: 'ISO 27001', label: 'Certified' }
  ];

  return (
    <div className="py-16 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        {/* Trust Statement */}
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Trusted by Leading African Fintech Companies
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join 30+ innovative companies building the future of African finance with our secure KYC solutions
          </p>
        </div>

        {/* Company Logos */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 mb-16">
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                {company.logo}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrustSection;
