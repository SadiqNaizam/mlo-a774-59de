"use client";

import React from 'react';
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  Cell
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data representing the RFP funnel stages
const funnelData = [
  {
    value: 120,
    name: 'Identified',
    totalValue: 1_200_000,
    fill: '#6366f1', // Indigo 500
  },
  {
    value: 95,
    name: 'Submitted',
    totalValue: 950_000,
    fill: '#3b82f6', // Blue 500
  },
  {
    value: 60,
    name: 'Negotiation',
    totalValue: 600_000,
    fill: '#22c55e', // Green 500
  },
  {
    value: 35,
    name: 'Won',
    totalValue: 350_000,
    fill: '#f97316', // Orange 500
  },
];

// Custom Tooltip for better readability
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold text-muted-foreground">
              {data.name}
            </span>
            <span className="font-bold">
              {`$${data.totalValue.toLocaleString()}`}
            </span>
            <span className="text-xs text-muted-foreground">
              {`${data.value} RFPs`}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const SalesFunnelChart = () => {
  console.log('SalesFunnelChart loaded');

  return (
    <Card>
      <CardHeader>
        <CardTitle>RFP Funnel</CardTitle>
        <CardDescription>
          Conversion rate from initial identification to won deals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip content={<CustomTooltip />} />
              <Funnel
                dataKey="value"
                data={funnelData}
                isAnimationActive
              >
                <LabelList
                  position="right"
                  fill="#000"
                  stroke="none"
                  dataKey="name"
                  className="font-medium fill-foreground"
                />
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesFunnelChart;