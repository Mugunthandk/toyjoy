import React, { useState } from 'react';
import {
  MOCK_INVENTORY_FORECASTS,
  MOCK_SALES_FORECAST,
  MOCK_FRAUD_ALERTS,
  MOCK_CUSTOMER_INSIGHTS,
  MOCK_SELLER_INSIGHTS,
  MOCK_BLOGS
} from '../data/mockData';
import { Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface AdminForecastsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
}

export const AdminForecastsDashboard: React.FC<AdminForecastsDashboardProps> = ({
  isOpen,
  onClose,
  currency
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'sales' | 'fraud' | 'insights' | 'blogs'>('inventory');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogGenerated, setBlogGenerated] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerateBlog = () => {
    if (!blogTitle.trim()) return;
    setBlogGenerated(`### ${blogTitle}\n\nSTEM learning toys play a crucial role in cognitive development by combining physics, spatial geometry, and active problem-solving...`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fbf9f1] w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-[#c3c6d7] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#1b1c17] text-white p-6 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ea580c] flex items-center justify-center text-white font-bold">
              <span className="material-symbols-outlined text-2xl">insights</span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold">ToyJoy Enterprise Intelligence Hub</h2>
              <p className="text-xs text-gray-400">AI Inventory Forecasting • Sales Analytics • Fraud Guard • Seller Insights</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-[#f0eee6] p-2 flex gap-2 overflow-x-auto text-xs font-bold border-b border-[#c3c6d7] shrink-0">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'inventory' ? 'bg-[#ea580c] text-white shadow-xs' : 'bg-white text-[#434655] hover:bg-[#e4e3db]'
            }`}
          >
            📦 Inventory Forecast
          </button>

          <button
            onClick={() => setActiveTab('sales')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'sales' ? 'bg-[#ea580c] text-white shadow-xs' : 'bg-white text-[#434655] hover:bg-[#e4e3db]'
            }`}
          >
            📈 Sales & Growth
          </button>

          <button
            onClick={() => setActiveTab('fraud')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'fraud' ? 'bg-[#aa3000] text-white shadow-xs' : 'bg-white text-[#434655] hover:bg-[#e4e3db]'
            }`}
          >
            🛡️ Fraud Shield
          </button>

          <button
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'insights' ? 'bg-[#ea580c] text-white shadow-xs' : 'bg-white text-[#434655] hover:bg-[#e4e3db]'
            }`}
          >
            💡 Seller & Customer AI
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'blogs' ? 'bg-[#705d00] text-white shadow-xs' : 'bg-white text-[#434655] hover:bg-[#e4e3db]'
            }`}
          >
            ✍️ AI Blog Generator
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Inventory Tab */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-[#1b1c17]">AI Predictive Demand & Inventory Forecast</h3>
                <button
                  onClick={() => alert('Exporting Inventory Forecast Report as PDF...')}
                  className="px-3 py-1.5 bg-white border border-[#c3c6d7] text-xs font-bold rounded-xl hover:bg-[#f0eee6]"
                >
                  📄 Export Report
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#f0eee6] border-b border-[#c3c6d7] text-xs font-bold text-[#737686]">
                      <th className="p-3">Product Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Current Stock</th>
                      <th className="p-3">30-Day Expected Demand</th>
                      <th className="p-3">AI Suggested Reorder</th>
                      <th className="p-3">Risk Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e4e3db]">
                    {MOCK_INVENTORY_FORECASTS.map((item) => (
                      <tr key={item.productId} className="bg-white hover:bg-[#fbf9f1]">
                        <td className="p-3 font-bold text-[#1b1c17]">{item.productName}</td>
                        <td className="p-3 text-xs text-[#737686]">{item.category}</td>
                        <td className="p-3 font-semibold">{item.currentStock} units</td>
                        <td className="p-3 font-semibold text-[#ea580c]">{item.expectedDemand30Days} units</td>
                        <td className="p-3 font-bold text-[#aa3000]">+{item.suggestedReorderQty} units</td>
                        <td className="p-3">
                          <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                            {item.riskLevel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sales Tab */}
          {activeTab === 'sales' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-[#c3c6d7] shadow-xs space-y-2">
                <span className="text-xs font-bold text-[#737686] uppercase">Predicted Festive Season Growth</span>
                <h3 className="text-2xl font-extrabold text-[#ea580c]">+{MOCK_SALES_FORECAST.growthPredictionPct}% Revenue Surge</h3>
                <p className="text-xs text-[#434655]">{MOCK_SALES_FORECAST.peakSeasonNotice}</p>
              </div>

              <h4 className="font-bold text-sm text-[#1b1c17]">Monthly Revenue Trajectory</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {MOCK_SALES_FORECAST.monthlyRevenue.map((m) => (
                  <div key={m.month} className="bg-white p-4 rounded-2xl border border-[#c3c6d7] space-y-1">
                    <span className="text-xs font-bold text-[#737686]">{m.month} 2026</span>
                    <div className="text-base font-extrabold text-[#ea580c]">
                      {formatPrice(m.projected, currency)}
                    </div>
                    {m.actual && (
                      <span className="text-[10px] text-emerald-700 font-bold block">
                        Actual: {formatPrice(m.actual, currency)} ✓
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fraud Tab */}
          {activeTab === 'fraud' && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-[#1b1c17]">AI Fraud & Risk Monitoring Shield</h3>

              <div className="space-y-3">
                {MOCK_FRAUD_ALERTS.map((alertItem) => (
                  <div key={alertItem.id} className="bg-white p-4 rounded-2xl border border-[#c3c6d7] flex justify-between items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                          alertItem.riskLevel === 'High' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {alertItem.riskLevel} Risk
                        </span>
                        <span className="font-bold text-sm text-[#1b1c17]">{alertItem.orderId} • {alertItem.customerName}</span>
                      </div>
                      <p className="text-xs text-[#737686]">{alertItem.reasons.join(' | ')}</p>
                      <span className="text-[10px] text-[#737686]">{alertItem.timestamp}</span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-extrabold text-sm text-[#ea580c] block">{formatPrice(alertItem.amountINR, currency)}</span>
                      <button
                        onClick={() => alert(`Fraud risk cleared for order ${alertItem.orderId}`)}
                        className="mt-2 px-3 py-1 bg-[#ea580c] text-white text-xs font-bold rounded-lg hover:bg-[#c8452a]"
                      >
                        {alertItem.status}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insights Tab */}
          {activeTab === 'insights' && (
            <div className="space-y-6">
              <div className="bg-[#ffe16d]/30 border border-[#ffe16d] p-4 rounded-2xl space-y-1">
                <span className="font-bold text-xs text-[#705d00] uppercase">AI Pricing & Promotion Strategy</span>
                <p className="text-sm text-[#1b1c17] font-semibold">{MOCK_SELLER_INSIGHTS.pricingAdvice}</p>
              </div>

              <h4 className="font-bold text-sm text-[#1b1c17]">Customer Segment Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MOCK_CUSTOMER_INSIGHTS.map((seg) => (
                  <div key={seg.segment} className="bg-white p-4 rounded-2xl border border-[#c3c6d7] space-y-2">
                    <h5 className="font-bold text-sm text-[#1b1c17]">{seg.segment}</h5>
                    <p className="text-xs text-[#737686]">{seg.customerCount.toLocaleString()} Customers</p>
                    <div className="text-xs text-[#ea580c] font-bold">
                      Avg Order: {formatPrice(seg.avgOrderValueINR, currency)}
                    </div>
                    <p className="text-xs text-[#434655]">Top Picks: {seg.preferredCategories.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Generator Tab */}
          {activeTab === 'blogs' && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-[#1b1c17]">AI Educational Blog & Article Generator</h3>

              <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7] space-y-3">
                <input
                  type="text"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  placeholder="Enter blog topic (e.g., 'How Wooden Toys Boost Toddler Motor Control')"
                  className="w-full bg-[#f0eee6] rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#ea580c]"
                />
                <button
                  onClick={handleGenerateBlog}
                  className="px-6 py-2.5 bg-[#705d00] text-white font-bold rounded-xl text-xs hover:bg-[#8a7300]"
                >
                  Generate Article Draft ✍️
                </button>
              </div>

              {blogGenerated && (
                <div className="bg-white p-5 rounded-2xl border border-[#c3c6d7] space-y-2">
                  <span className="text-xs font-bold text-emerald-700">Article Generated ✓</span>
                  <div className="text-xs text-[#1b1c17] whitespace-pre-line leading-relaxed font-mono">
                    {blogGenerated}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="font-bold text-sm text-[#1b1c17]">Published Parent Guides</h4>
                {MOCK_BLOGS.map((b) => (
                  <div key={b.id} className="bg-white p-4 rounded-2xl border border-[#c3c6d7] flex gap-4">
                    <img src={b.imageUrl} alt={b.title} className="w-20 h-20 object-cover rounded-xl" />
                    <div>
                      <h5 className="font-bold text-sm text-[#1b1c17]">{b.title}</h5>
                      <p className="text-xs text-[#737686]">{b.author} • {b.date}</p>
                      <p className="text-xs text-[#434655] mt-1 line-clamp-1">{b.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
