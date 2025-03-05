import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import axios from 'axios';

// Types for our data
interface Client{
  id: string;  // Changed from number to string to match UUID
  name?: string;
  userId?: string;
  user?: {
    name?: string;
  };
}
interface LinkedinAnalysis {
  description: string;
  real_estate_assessment: string;
}

interface ClientsSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientsSection: React.FC<ClientsSectionProps> = ({ isOpen, onClose }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [linkedinAnalysis, setLinkedinAnalysis] = useState<LinkedinAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch users when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchUsers = async () => {
        try {
          // Fetch users from the new API route
          const response = await axios.get('/api/get-clients');
          setClients(response.data);
        } catch (err) {
          console.error('Error fetching clients:', err);
          setError('Failed to load clients');
        }
      };

      fetchUsers();
    }
  }, [isOpen]);

  // Analyze LinkedIn profile
  const analyzeLinkedinProfile = async (client: Client) => {
    setIsLoading(true);
    setSelectedClient(client);
    setError(null);

    try {
      // Split full name into first and last name
      const [firstName, lastName] = client.name?.split(' ');

      // Call FastAPI endpoint
      const response = await axios.post('http://127.0.0.1:8000/analyze_customer', {
        first_name: firstName,
        last_name: lastName || ''
      });

      setLinkedinAnalysis(response.data);
    } catch (err) {
      console.error('LinkedIn Analysis Error:', err);
      setError('Failed to analyze LinkedIn profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset state when modal closes
  const handleClose = () => {
    onClose();
    setSelectedClient(null);
    setLinkedinAnalysis(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
    <DialogContent className="min-w-5xl bg-slate-900 border-slate-700 text-slate-100">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-teal-400">Clients Dashboard</DialogTitle>
      </DialogHeader>

        {/* Users Table */}
        <Card className=" bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-200">Client List</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-700">
                <TableRow>
                  <TableHead className="text-slate-200">ID</TableHead>
                  <TableHead className="text-slate-200">Name</TableHead>
                  <TableHead className="text-slate-200">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id} className="hover:bg-slate-700/50 transition-colors">
                    <TableCell className="text-slate-300">{client.id}</TableCell>
                    <TableCell className="text-slate-300">{client.name || 'Unnamed Client'}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => analyzeLinkedinProfile(client)}
                        className="bg-blue-600 hover:bg-blue-700 text-slate-100"
                        disabled={!client.name}
                      >
                        Analyze Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* LinkedIn Analysis Modal */}
        {selectedClient && linkedinAnalysis && (
  <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
    <DialogContent className="min-w-[800px] max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 text-slate-100">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-teal-400">
          LinkedIn Profile Analysis
        </DialogTitle>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* User Details */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-200">User Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300">Name: {selectedClient.name}</p>
          </CardContent>
        </Card>

        {/* Real Estate Assessment */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-200">
              Real Estate Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-[300px] overflow-y-auto">
            <p className="text-slate-300">{linkedinAnalysis.real_estate_assessment}</p>
          </CardContent>
        </Card>

        {/* Add Profile Description if available */}
        {linkedinAnalysis.description && (
          <Card className="md:col-span-2 bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-200">
                Profile Description
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[300px] overflow-y-auto">
              <p className="text-slate-300">{linkedinAnalysis.description}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DialogContent>
  </Dialog>
)}
      </DialogContent>
    </Dialog>
  );
};

export default ClientsSection;