import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, PiggyBank, Home, Car, Phone, User, LogOut } from 'lucide-react';
import { mockAssets, mockLiabilities, mockTransactions, mockUser } from '../data/mockData';
import { Asset, Liability, Transaction } from '../types';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'assets' | 'liabilities' | 'transactions'>('overview');

  const totalAssetValue = mockAssets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const totalInvested = mockAssets.reduce((sum, asset) => sum + asset.investedAmount, 0);
  const totalReturns = totalAssetValue - totalInvested;
  const totalLiabilities = mockLiabilities.reduce((sum, liability) => sum + liability.remainingAmount, 0);
  const netWorth = totalAssetValue - totalLiabilities;

  const assetDistribution = mockAssets.map(asset => ({
    name: asset.name,
    value: asset.currentValue,
    type: asset.type,
  }));

  const monthlyData = [
    { month: 'Jan', assets: 380000, liabilities: 3800000 },
    { month: 'Feb', assets: 390000, liabilities: 3750000 },
    { month: 'Mar', assets: 405000, liabilities: 3700000 },
    { month: 'Apr', assets: 415000, liabilities: 3650000 },
    { month: 'May', assets: 425000, liabilities: 3600000 },
    { month: 'Jun', assets: 428000, liabilities: 3550000 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'mutual_fund': return <PiggyBank className="w-5 h-5" />;
      case 'shares': return <TrendingUp className="w-5 h-5" />;
      case 'gold': return <DollarSign className="w-5 h-5" />;
      case 'fixed_deposit': return <CreditCard className="w-5 h-5" />;
      case 'investment': return <TrendingUp className="w-5 h-5" />;
      default: return <DollarSign className="w-5 h-5" />;
    }
  };

  const getLiabilityIcon = (type: string) => {
    switch (type) {
      case 'home_loan': return <Home className="w-5 h-5" />;
      case 'car_loan': return <Car className="w-5 h-5" />;
      case 'personal_loan': return <User className="w-5 h-5" />;
      case 'credit_card': return <CreditCard className="w-5 h-5" />;
      default: return <CreditCard className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-8 h-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">WealthTracker</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700">{mockUser.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'assets', label: 'Assets' },
              { key: 'liabilities', label: 'Liabilities' },
              { key: 'transactions', label: 'Transactions' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Assets</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAssetValue)}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Liabilities</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalLiabilities)}</p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-red-600" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Net Worth</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(netWorth)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Returns</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(totalReturns)}</p>
                    <p className="text-sm text-green-600">+{((totalReturns / totalInvested) * 100).toFixed(1)}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Asset Distribution */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={assetDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {assetDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Portfolio Growth */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₹${value / 1000}K`} />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                    <Bar dataKey="assets" fill="#3B82F6" name="Assets" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Your Assets</h2>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Portfolio Value</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalAssetValue)}</p>
              </div>
            </div>

            <div className="grid gap-6">
              {mockAssets.map((asset) => (
                <div key={asset.id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {getAssetIcon(asset.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{asset.type.replace('_', ' ')}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(asset.currentValue)}</p>
                      <p className={`text-sm ${asset.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {asset.returns >= 0 ? '+' : ''}{formatCurrency(asset.returns)} ({asset.returnsPercent.toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="block">Invested: {formatCurrency(asset.investedAmount)}</span>
                      <span className="block">Quantity: {asset.quantity}</span>
                    </div>
                    <div>
                      <span className="block">Purchase Date: {new Date(asset.purchaseDate).toLocaleDateString()}</span>
                      {asset.maturityDate && (
                        <span className="block">Maturity: {new Date(asset.maturityDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'liabilities' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Your Liabilities</h2>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Outstanding</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(totalLiabilities)}</p>
              </div>
            </div>

            <div className="grid gap-6">
              {mockLiabilities.map((liability) => (
                <div key={liability.id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-red-100 rounded-lg">
                        {getLiabilityIcon(liability.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{liability.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{liability.type.replace('_', ' ')}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(liability.remainingAmount)}</p>
                      <p className="text-sm text-gray-600">EMI: {formatCurrency(liability.emiAmount)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm text-gray-600">
                        {((1 - liability.remainingAmount / liability.totalAmount) * 100).toFixed(1)}% paid
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ 
                          width: `${((1 - liability.remainingAmount / liability.totalAmount) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="block">Total Amount: {formatCurrency(liability.totalAmount)}</span>
                      <span className="block">Interest Rate: {liability.interestRate}%</span>
                    </div>
                    <div>
                      <span className="block">Start Date: {new Date(liability.startDate).toLocaleDateString()}</span>
                      <span className="block">End Date: {new Date(liability.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Transactions</h2>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
              </div>
              
              <div className="divide-y">
                {mockTransactions.map((transaction) => (
                  <div key={transaction.id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`
                        p-2 rounded-lg
                        ${transaction.type === 'buy' ? 'bg-blue-100' : 
                          transaction.type === 'sell' ? 'bg-red-100' : 
                          'bg-green-100'
                        }
                      `}>
                        {transaction.type === 'buy' ? <TrendingUp className="w-5 h-5 text-blue-600" /> :
                         transaction.type === 'sell' ? <TrendingDown className="w-5 h-5 text-red-600" /> :
                         <DollarSign className="w-5 h-5 text-green-600" />}
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900">{transaction.assetName}</p>
                        <p className="text-sm text-gray-600 capitalize">
                          {transaction.type} {transaction.quantity && `• ${transaction.quantity} units`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.type === 'buy' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {transaction.type === 'buy' ? '-' : '+'}{formatCurrency(transaction.amount)}
                      </p>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-600">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                        <span className={`
                          px-2 py-1 text-xs rounded-full
                          ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                            transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }
                        `}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}