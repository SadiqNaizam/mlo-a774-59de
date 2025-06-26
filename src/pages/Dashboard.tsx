import React from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import SalesFunnelChart from '@/components/SalesFunnelChart';
import WaterfallRevenueChart from '@/components/WaterfallRevenueChart';

const Dashboard = () => {
  console.log('Dashboard page loaded');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <LeftSidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 pt-20 md:p-6 md:pt-20">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-muted-foreground">
              An at-a-glance summary of your RFP pipeline and revenue performance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Sales Funnel Chart */}
            <SalesFunnelChart />

            {/* Waterfall Revenue Chart */}
            <WaterfallRevenueChart />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;