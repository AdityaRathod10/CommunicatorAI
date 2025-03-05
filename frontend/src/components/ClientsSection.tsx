import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { 
  GraduationCap, 
  DollarSign, 
  Target, 
  Briefcase, 
  AlignLeft, 
  BookOpen 
} from 'lucide-react';
import axios from 'axios';

interface Client {
  id: string;
  name?: string;
}

interface LinkedinAnalysis {
  description: string;
  real_estate_assessment: string;
  skills: string[];
  education: string[];
  investment_potential: number;
  experience_years: number;
}

export const ClientsSection: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void 
}> = ({ isOpen, onClose }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [linkedinAnalysis, setLinkedinAnalysis] = useState<LinkedinAnalysis | null>(null);

  // Fetch clients
  useEffect(() => {
    if (isOpen) {
      const fetchClients = async () => {
        try {
          const response = await axios.get('/api/get-clients');
          setClients(response.data);
        } catch (err) {
          console.error('Error fetching clients:', err);
        }
      };
      fetchClients();
    }
  }, [isOpen]);

  // Analyze LinkedIn profile
  const analyzeLinkedinProfile = async (client: Client) => {
    try {
      const [firstName, lastName] = client.name?.split(' ');
      const response = await axios.post('http://127.0.0.1:8000/analyze_customer', {
        first_name: firstName,
        last_name: lastName || ''
      });
      setSelectedClient(client);
      setLinkedinAnalysis(response.data);
    } catch (err) {
      console.error('LinkedIn Analysis Error:', err);
    }
  };

  // Skills Chart Data
  const skillChartData = linkedinAnalysis?.skills.map((skill, index) => ({
    name: skill,
    value: index + 1
  })) || [];

  // Investment Potential Chart Data
  const investmentData = [
    { name: 'Investment Potential', value: linkedinAnalysis?.investment_potential || 0 },
    { name: 'Remaining', value: 100 - (linkedinAnalysis?.investment_potential || 0) }
  ];

  const COLORS = ['#0088FE', '#DDDDDD'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[60vw] max-h-[95vh] bg-slate-900 border-slate-700 text-slate-100 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-teal-400">
            Client Insights Dashboard
          </DialogTitle>
        </DialogHeader>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Client List */}
          <Card className="col-span-3 bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-200 flex items-center">
                <Briefcase className="mr-2 text-teal-400" /> Clients
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {clients.map((client) => (
                  <div 
                    key={client.id} 
                    className="flex justify-between items-center p-3 hover:bg-slate-700 transition-colors"
                  >
                    <span className="text-slate-300">{client.name}</span>
                    <Button 
                      size="sm"
                      onClick={() => analyzeLinkedinProfile(client)}
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      Analyze
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          {linkedinAnalysis && (
            <>
              {/* Description */}
              <Card className="col-span-6 bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-200 flex items-center">
                    <AlignLeft className="mr-2 text-teal-400" /> Profile Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{linkedinAnalysis.description}</p>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="col-span-3 bg-slate-800 border-slate-700 grid grid-cols-2 gap-2 p-4">
                <div className="flex flex-col items-center bg-slate-700 p-3 rounded">
                  <GraduationCap className="text-teal-400 mb-2" />
                  <span className="text-slate-300 text-sm">Experience</span>
                  <strong className="text-white">{linkedinAnalysis.experience_years} Years</strong>
                </div>
                <div className="flex flex-col items-center bg-slate-700 p-3 rounded">
                  <DollarSign className="text-teal-400 mb-2" />
                  <span className="text-slate-300 text-sm">Investment</span>
                  <strong className="text-white">{linkedinAnalysis.investment_potential}/100</strong>
                </div>

                <div className="flex flex-col items-center bg-slate-700 p-3 rounded col-span-2">
                  <Target className="text-teal-400 mb-2" />
                  <span className="text-slate-300 text-sm">Education</span>
                  <div className="text-white text-center">
                    {linkedinAnalysis.education.join(', ')}
                  </div>
                </div>
              </Card>

              {/* Skills Chart */}
              <Card className="col-span-6 bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-200 flex items-center">
                    <BookOpen className="mr-2 text-teal-400" /> Skills Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={skillChartData}>
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          color: '#cbd5e1',
                          border: 'none'
                        }} 
                      />
                      <Bar dataKey="value" fill="#14b8a6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Investment Potential */}
              <Card className="col-span-6 bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-200 flex items-center">
                    <DollarSign className="mr-2 text-teal-400" /> Investment Potential
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={investmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="white"
                        dataKey="value"
                      >
                        {investmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          color: '#ffffff',
                          border: 'none'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientsSection;