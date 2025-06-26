import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Search, ListFilter } from 'lucide-react';

type RFPStatus = 'Submitted' | 'Won' | 'Lost' | 'Draft';

interface RFP {
  id: string;
  title: string;
  client: string;
  value: number;
  dueDate: string;
  status: RFPStatus;
}

const rfpData: RFP[] = [
  { id: 'RFP001', title: 'Enterprise Software Overhaul', client: 'Innovate Corp', value: 150000, dueDate: '2024-10-15', status: 'Submitted' },
  { id: 'RFP002', title: 'Cloud Migration Services', client: 'DataStream LLC', value: 75000, dueDate: '2024-09-30', status: 'Won' },
  { id: 'RFP003', title: 'Marketing Campaign Analytics', client: 'MarketMinds', value: 45000, dueDate: '2024-09-20', status: 'Lost' },
  { id: 'RFP004', title: 'New Website Design & Dev', client: 'Creative Solutions', value: 90000, dueDate: '2024-11-01', status: 'Draft' },
  { id: 'RFP005', title: 'IT Support Contract', client: 'Global Tech', value: 120000, dueDate: '2024-10-25', status: 'Submitted' },
  { id: 'RFP006', title: 'HR Platform Implementation', client: 'PeopleFirst Inc.', value: 85000, dueDate: '2024-08-30', status: 'Won' },
];

const getBadgeVariant = (status: RFPStatus): 'default' | 'destructive' | 'secondary' | 'outline' => {
  switch (status) {
    case 'Won':
      return 'default'; // Typically green in shadcn themes
    case 'Lost':
      return 'destructive';
    case 'Submitted':
      return 'secondary';
    case 'Draft':
      return 'outline';
    default:
      return 'secondary';
  }
};

const RFPList = () => {
  console.log('RFPList page loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilters, setStatusFilters] = useState({
    Submitted: true,
    Won: true,
    Lost: true,
    Draft: true,
  });

  const filteredRfps = useMemo(() => {
    return rfpData
      .filter(rfp => {
        const selectedStatuses = Object.entries(statusFilters)
          .filter(([, isSelected]) => isSelected)
          .map(([status]) => status);
        return selectedStatuses.includes(rfp.status);
      })
      .filter(rfp =>
        rfp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rfp.client.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, statusFilters]);

  const handleFilterChange = (status: RFPStatus) => {
    setStatusFilters(prev => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <div className="flex flex-1">
        <LeftSidebar />
        <div className="flex flex-col flex-1">
          <main className="flex-1 pt-20 p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold tracking-tight">RFP List</h1>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by title or client..."
                    className="pl-8 w-full md:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {Object.keys(statusFilters).map((status) => (
                      <DropdownMenuCheckboxItem
                        key={status}
                        checked={statusFilters[status as RFPStatus]}
                        onCheckedChange={() => handleFilterChange(status as RFPStatus)}
                      >
                        {status}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="border rounded-lg bg-background">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RFP Title</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRfps.length > 0 ? (
                    filteredRfps.map((rfp) => (
                      <TableRow key={rfp.id}>
                        <TableCell className="font-medium">{rfp.title}</TableCell>
                        <TableCell>{rfp.client}</TableCell>
                        <TableCell className="text-right">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rfp.value)}
                        </TableCell>
                        <TableCell>{rfp.dueDate}</TableCell>
                        <TableCell>
                          <Badge variant={getBadgeVariant(rfp.status)}>{rfp.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link to="/r-f-p-form">Edit</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No RFPs found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default RFPList;