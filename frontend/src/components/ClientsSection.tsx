import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import axios from 'axios';

// Types for our data
interface User {
  id: number;
  name: string;
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
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [linkedinAnalysis, setLinkedinAnalysis] = useState<LinkedinAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch users when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchUsers = async () => {
        try {
          // Fetch users from the new API route
          const response = await axios.get('/api/get-users');
          setUsers(response.data);
        } catch (err) {
          console.error('Error fetching users:', err);
          setError('Failed to load users');
        }
      };

      fetchUsers();
    }
  }, [isOpen]);

  // Analyze LinkedIn profile
  const analyzeLinkedinProfile = async (user: User) => {
    setIsLoading(true);
    setSelectedUser(user);
    setError(null);

    try {
      // Split full name into first and last name
      const [firstName, lastName] = user.name.split(' ');

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
    setSelectedUser(null);
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
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-slate-700/50 transition-colors">
                    <TableCell className="text-slate-300">{user.id}</TableCell>
                    <TableCell className="text-slate-300">{user.name}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => analyzeLinkedinProfile(user)}
                        className="bg-blue-600 hover:bg-blue-700 text-slate-100"
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
        {selectedUser && linkedinAnalysis && (
          <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
            <DialogContent className="min-w-5xl bg-slate-900 border-slate-700 text-slate-100">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-teal-400">
                  LinkedIn Profile Analysis
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* User Details */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-200">User Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">Name: {selectedUser.name}</p>
                  </CardContent>
                </Card>

                {/* Profile Description */}
                

                {/* Real Estate Assessment */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-200">
                      Real Estate Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">{linkedinAnalysis.real_estate_assessment}</p>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ClientsSection;