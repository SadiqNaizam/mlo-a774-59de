import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Define the shape of a single RFP data point
interface RFP {
  name: string;
  value: number;
  status: 'won' | 'lost';
}

// Define the props for the chart component
interface WaterfallRevenueChartProps {
  annualTarget?: number;
  rfps?: RFP[];
}

// Sample data for demonstration purposes if no props are provided
const defaultRfps: RFP[] = [
  { name: 'Project Alpha', value: 25000, status: 'won' },
  { name: 'Project Beta', value: 15000, status: 'lost' },
  { name: 'Project Gamma', value: 40000, status: 'won' },
  { name: 'Project Delta', value: 22000, status: 'won' },
  { name: 'Project Epsilon', value: 30000, status: 'lost' },
];

const defaultAnnualTarget = 150000;

// Custom Tooltip for better data display
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const value = data.amount;

    let changeText;
    if (data.name !== 'Target' && data.name !== 'Net Revenue') {
      changeText = (
        <p className={value > 0 ? "text-emerald-500" : "text-destructive"}>
          Change: {value > 0 ? '+' : ''}${Math.abs(value).toLocaleString()}
        </p>
      );
    }
    
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm text-sm">
        <div className="font-bold">{label}</div>
        {changeText}
        <p>
          {data.name === 'Net Revenue' ? 'Current Total: ' : 'Running Total: '}
          ${(data.base + value).toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};


const WaterfallRevenueChart: React.FC<WaterfallRevenueChartProps> = ({
  annualTarget = defaultAnnualTarget,
  rfps = defaultRfps,
}) => {
  console.log('WaterfallRevenueChart loaded');

  const processedData = useMemo(() => {
    const data = [];
    let cumulative = 0;

    // 1. Initial Target
    data.push({
      name: 'Target',
      base: 0,
      amount: annualTarget,
      fill: 'hsl(var(--chart-2))',
    });
    cumulative = annualTarget;

    // 2. Process RFPs
    rfps.forEach((rfp) => {
      if (rfp.status === 'won') {
        data.push({
          name: rfp.name,
          base: cumulative,
          amount: rfp.value,
          fill: 'hsl(var(--chart-1))', // Greenish
        });
        cumulative += rfp.value;
      } else {
        // status is 'lost'
        data.push({
          name: rfp.name,
          base: cumulative - rfp.value,
          amount: -rfp.value,
          fill: 'hsl(var(--destructive))', // Reddish
        });
        cumulative -= rfp.value;
      }
    });

    // 3. Final Net Revenue
    data.push({
      name: 'Net Revenue',
      base: 0,
      amount: cumulative,
      fill: 'hsl(var(--chart-5))', // Purple/Final color
    });

    return data;
  }, [annualTarget, rfps]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Waterfall Revenue</CardTitle>
        <CardDescription>
          Progress towards the annual revenue target.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={processedData}
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${Number(value) / 1000}k`}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--muted))' }}
              content={<CustomTooltip />}
            />
            {/* Invisible bar to position the visible bar */}
            <Bar dataKey="base" stackId="a" fill="transparent" />
            {/* Visible bar showing the change */}
            <Bar dataKey="amount" stackId="a">
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WaterfallRevenueChart;