import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Car, Battery, CircleDollarSign, Gift, Bell, Settings,
  TrendingUp, ChevronRight, Shield, Star, CreditCard, Users,
  Calendar, Clock, Map, Upload, FileText, Filter, Search,
  BarChart, Activity, AlertTriangle, Share2, Zap
} from 'lucide-react';

const INITIAL_DATA = {
  vehicles: [
    {
      id: 'V001',
      status: 'active',
      batteryHealth: 92,
      location: 'Hyderabad Central',
      lastService: '2024-03-15'
    },
    {
      id: 'V002',
      status: 'maintenance',
      batteryHealth: 78,
      location: 'Hyderabad East',
      lastService: '2024-03-10'
    }
  ],
  analytics: [
    { date: '2024-01', vehicles: 45, revenue: 76500, efficiency: 88 },
    { date: '2024-02', vehicles: 62, revenue: 105400, efficiency: 92 },
    { date: '2024-03', vehicles: 78, revenue: 132600, efficiency: 89 },
    { date: '2024-04', vehicles: 85, revenue: 144500, efficiency: 91 }
  ]
};

const MetricCard = ({ title, value, trend, icon: Icon }) => (
  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:translate-y-[-4px] transition-all duration-300">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
        {trend && (
          <p className={`text-sm mt-1 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </p>
        )}
      </div>
      <Icon className="w-6 h-6 text-[#7FFFD4]" />
    </div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
    <h3 className="text-lg font-bold mb-4">{title}</h3>
    <div className="h-[300px]">{children}</div>
  </div>
);

const QuickAction = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center space-x-2 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300"
  >
    <Icon className="w-5 h-5 text-[#7FFFD4]" />
    <span>{label}</span>
  </button>
);

const VehicleList = ({ vehicles }) => (
  <div className="bg-gray-900/50 rounded-xl border border-gray-800">
    <div className="p-4 border-b border-gray-800 flex justify-between items-center">
      <h3 className="text-lg font-bold">Active Vehicles</h3>
      <div className="flex space-x-2">
        <Input
          placeholder="Search vehicles..."
          className="bg-gray-800 border-gray-700 w-64"
        />
        <Button className="bg-[#7FFFD4] text-black hover:bg-[#7FFFD4]/80">
          Add Vehicle
        </Button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-800/50">
          <tr>
            <th className="px-6 py-3 text-left">Vehicle ID</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Battery</th>
            <th className="px-6 py-3 text-left">Location</th>
            <th className="px-6 py-3 text-left">Last Service</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {vehicles.map(vehicle => (
            <tr key={vehicle.id} className="hover:bg-gray-800/30">
              <td className="px-6 py-4">{vehicle.id}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  vehicle.status === 'active' 
                    ? 'bg-green-900/50 text-green-300' 
                    : 'bg-yellow-900/50 text-yellow-300'
                }`}>
                  {vehicle.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <Battery className="w-4 h-4 mr-2 text-[#7FFFD4]" />
                  {vehicle.batteryHealth}%
                </div>
              </td>
              <td className="px-6 py-4">{vehicle.location}</td>
              <td className="px-6 py-4">{vehicle.lastService}</td>
              <td className="px-6 py-4">
                <Button variant="ghost" size="sm">View Details</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const OptimotionDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState(INITIAL_DATA);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        analytics: prev.analytics.map(item => ({
          ...item,
          efficiency: item.efficiency + (Math.random() * 2 - 1),
          revenue: item.revenue + Math.floor(Math.random() * 1000)
        }))
      }));
    }, 5000);

    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    });

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {!isOnline && (
        <div className="bg-yellow-600/20 text-yellow-200 px-4 py-2 text-center">
          <AlertTriangle className="w-4 h-4 inline-block mr-2" />
          Working offline. Changes will sync when connection is restored.
        </div>
      )}

      <div className="flex">
        <div className="w-64 p-6 border-r border-gray-800">
          <div className="mb-8">
            <img src="/placeholder-logo.png" alt="Optimotion" className="w-full" />
          </div>
          
          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'vehicles', label: 'Fleet', icon: Car },
              { id: 'analytics', label: 'Analytics', icon: BarChart },
              { id: 'payments', label: 'Payments', icon: CircleDollarSign }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id ? 'bg-[#7FFFD4]/10 text-[#7FFFD4]' : 'hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} className="space-y-8">
            <TabsContent value="overview">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard
                    title="Active Vehicles"
                    value={`${data.vehicles.filter(v => v.status === 'active').length}/${data.vehicles.length}`}
                    trend={2.5}
                    icon={Car}
                  />
                  <MetricCard
                    title="Average Battery Health"
                    value={`${Math.round(data.vehicles.reduce((acc, v) => acc + v.batteryHealth, 0) / data.vehicles.length)}%`}
                    trend={-1.2}
                    icon={Battery}
                  />
                  <MetricCard
                    title="Monthly Revenue"
                    value={`₹${data.analytics[data.analytics.length - 1].revenue.toLocaleString()}`}
                    trend={4.8}
                    icon={CircleDollarSign}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ChartCard title="Performance Trends">
                    <ResponsiveContainer>
                      <LineChart data={data.analytics}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2D374850" />
                        <XAxis dataKey="date" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                        <Line type="monotone" dataKey="efficiency" stroke="#7FFFD4" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartCard>

                  <ChartCard title="Revenue Analysis">
                    <ResponsiveContainer>
                      <AreaChart data={data.analytics}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2D374850" />
                        <XAxis dataKey="date" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                        <Area type="monotone" dataKey="revenue" stroke="#7FFFD4" fill="#7FFFD450" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </div>

                <VehicleList vehicles={data.vehicles} />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default OptimotionDashboard;
