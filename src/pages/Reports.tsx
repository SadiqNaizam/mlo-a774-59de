import React from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';

const sampleReportData = [
  {
    id: 'RFP-001',
    title: 'Enterprise CRM Solution',
    client: 'Innovate Inc.',
    value: 250000,
    status: 'Won',
    submittedDate: '2023-11-15',
  },
  {
    id: 'RFP-002',
    title: 'Cloud Migration Services',
    client: 'Tech Solutions Ltd.',
    value: 120000,
    status: 'Submitted',
    submittedDate: '2023-12-01',
  },
  {
    id: 'RFP-003',
    title: 'Data Analytics Platform',
    client: 'Global Data Corp',
    value: 350000,
    status: 'Lost',
    submittedDate: '2023-10-25',
  },
  {
    id: 'RFP-004',
    title: 'Cybersecurity Audit',
    client: 'SecureNet',
    value: 85000,
    status: 'Won',
    submittedDate: '2023-11-20',
  },
  {
    id: 'RFP-005',
    title: 'Website Redesign',
    client: 'Creative Minds',
    value: 45000,
    status: 'In Progress',
    submittedDate: '2023-12-05',
  },
];

const Reports: React.FC = () => {
  console.log('Reports page loaded');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-8 pt-20">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>RFP Reports</CardTitle>
                  <CardDescription>
                    Generate and export detailed reports on RFP performance.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="quarterly">
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select a report" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quarterly">Quarterly Performance</SelectItem>
                      <SelectItem value="win-loss">Win/Loss Analysis</SelectItem>
                      <SelectItem value="pipeline">Pipeline by Stage</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RFP ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleReportData.map((rfp) => (
                    <TableRow key={rfp.id}>
                      <TableCell className="font-medium">{rfp.id}</TableCell>
                      <TableCell>{rfp.title}</TableCell>
                      <TableCell>{rfp.client}</TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(rfp.value)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            rfp.status === 'Won'
                              ? 'default'
                              : rfp.status === 'Lost'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {rfp.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{rfp.submittedDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Reports;