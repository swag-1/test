import React, { useState } from 'react';
import { 
  ArrowUpRight, ArrowDownRight, Plus, Edit3, Eye, TrendingUp, Calendar, Wallet,
  Banknote, FileText, Download, CheckCircle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import FeeStructureModal from '../components/FeeStructureModal';
import './Finance.css';

// 12-Month Financial Data
const monthlyData = [
  { month: 'Jan', inflow: 145000, outflow: 42000, balance: 103000 },
  { month: 'Feb', inflow: 110000, outflow: 38000, balance: 72000 },
  { month: 'Mar', inflow: 95000,  outflow: 45000, balance: 50000 },
  { month: 'Apr', inflow: 160000, outflow: 50000, balance: 110000 },
  { month: 'May', inflow: 120000, outflow: 48000, balance: 72000 },
  { month: 'Jun', inflow: 85000,  outflow: 40000, balance: 45000 },
  { month: 'Jul', inflow: 70000,  outflow: 35000, balance: 35000 },
  { month: 'Aug', inflow: 180000, outflow: 60000, balance: 120000 },
  { month: 'Sep', inflow: 140000, outflow: 55000, balance: 85000 },
  { month: 'Oct', inflow: 115000, outflow: 42000, balance: 73000 },
  { month: 'Nov', inflow: 90000,  outflow: 39000, balance: 51000 },
  { month: 'Dec', inflow: 130000, outflow: 41000, balance: 89000 },
];

const staffPayrollData = [
  { id: 1, name: "Dr. Aris Jenkins", role: "Senior Lecturer", base: 4500, tax: 450, net: 4050, status: "Paid" },
  { id: 2, name: "Sarah Miller", role: "Admin Head", base: 3200, tax: 320, net: 2880, status: "Pending" },
  { id: 3, name: "James Thorne", role: "IT Specialist", base: 3800, tax: 380, net: 3420, status: "Paid" },
];

export default function Finance() {
  const [activeTab, setActiveTab] = useState('fees');
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [chartView, setChartView] = useState('inflow'); // 'inflow', 'outflow', or 'balance'

  // Chart Configuration Mapping
  const chartConfig = {
    inflow: { label: 'Total Revenue', color: '#6366f1', dataKey: 'inflow', total: '$1.44M' },
    outflow: { label: 'Total Expenses', color: '#ef4444', dataKey: 'outflow', total: '$535.8K' },
    balance: { label: 'Available Balance', color: '#10b981', dataKey: 'balance', total: '$904.2K' }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="main-content">
          
          {/* TOP SECTION: DYNAMIC CHART & CLICKABLE STATS */}
          <div className="finance-top-row">
            <div className="finance-chart-card-mini">
              <div className="chart-info">
                <div className="chart-label-row">
                  <Calendar size={16} />
                  <span>{chartConfig[chartView].label} (Annual)</span>
                </div>
                <h2 className="total-cash">{chartConfig[chartView].total}</h2>
                <div className="annual-trend">
                  <TrendingUp size={14} /> 
                  <span>+14.2% Growth</span>
                </div>
              </div>
              
              <div className="mini-chart-container">
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartConfig[chartView].color} stopOpacity={0.6}/>
                        <stop offset="95%" stopColor={chartConfig[chartView].color} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                    <Tooltip cursor={{ stroke: '#e2e8f0' }} />
                    <Area 
                      type="monotone" 
                      dataKey={chartConfig[chartView].dataKey} 
                      stroke={chartConfig[chartView].color} 
                      strokeWidth={3} 
                      fill="url(#chartGradient)" 
                      animationDuration={1000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="quick-stats-grid">
              <div 
                className={`q-stat-card income ${chartView === 'inflow' ? 'active-card' : ''}`}
                onClick={() => setChartView('inflow')}
              >
                <div className="q-icon"><ArrowUpRight /></div>
                <div><p>Revenue</p><p className="q-amount">$1.44M</p></div>
              </div>

              <div 
                className={`q-stat-card expense ${chartView === 'outflow' ? 'active-card' : ''}`}
                onClick={() => setChartView('outflow')}
              >
                <div className="q-icon"><ArrowDownRight /></div>
                <div><p>Expenses</p><p className="q-amount">$535K</p></div>
              </div>

              <div 
                className={`q-stat-card balance ${chartView === 'balance' ? 'active-card' : ''}`}
                onClick={() => setChartView('balance')}
              >
                <div className="q-icon"><Wallet size={20} /></div>
                <div><p>Balance</p><p className="q-amount">$904K</p></div>
              </div>
            </div>
          </div>

          {/* TABS NAVIGATION */}
          <div className="finance-tabs">
            <button className={activeTab === 'fees' ? 'active' : ''} onClick={() => setActiveTab('fees')}>Fee Management</button>
            <button className={activeTab === 'payroll' ? 'active' : ''} onClick={() => setActiveTab('payroll')}>Staff Payroll</button>
          </div>

          {/* TAB CONTENT */}
          {activeTab === 'fees' ? (
            <section className="fee-management-layout">
              <div className="section-header-row">
                <h3>Class-wise Fee Breakdown</h3>
                <button className="btn-create-fee" onClick={() => setIsFeeModalOpen(true)}>
                  <Plus size={18} /> Configure Fee
                </button>
              </div>

              <div className="fee-grid">
                <ClassFeeCard name="Grade 10-A" t1="2,400" t2="2,400" t3="2,100" color="#6366f1" onEdit={() => setIsFeeModalOpen(true)} />
                <ClassFeeCard name="Grade 11-B" t1="2,800" t2="2,800" t3="2,500" color="#a855f7" onEdit={() => setIsFeeModalOpen(true)} />
                <ClassFeeCard name="Grade 9-C" t1="2,100" t2="2,100" t3="2,000" color="#ec4899" onEdit={() => setIsFeeModalOpen(true)} />
              </div>
            </section>
          ) : (
            <section className="payroll-layout">
  {/* PREMIUM HEADER ROW */}
  <div className="payroll-premium-header">
    {/* Left Side: Summary Data */}
    <div className="payroll-summary-group">
      <div className="payroll-period-pill">
        <Calendar size={14} />
        <span>Current Period: <strong>Jan 2026</strong></span>
      </div>
      
      <div className="payroll-divider-line"></div>

      <div className="payroll-title-section">
        <h3>Staff Payroll Ledger</h3>
        <div className="disbursement-badge">
          <span className="label">Total Net Disbursements</span>
          <span className="amount">$54,200.00</span>
        </div>
      </div>
    </div>

    {/* Right Side: Action Buttons */}
    <div className="payroll-action-group">
      <button className="btn-export-csv-v2">
        <Download size={18} />
        <span>Bank CSV</span>
      </button>
      <button className="btn-run-payroll-v2">
        <CheckCircle size={18} />
        <span>Run Bulk Payroll</span>
      </button>
    </div>
  </div>

  {/* PAYROLL DATA TABLE */}
  <div className="payroll-table-wrapper">
    <table className="payroll-table">
      <thead>
        <tr>
          <th>Staff Member</th>
          <th>Gross Salary</th>
          <th>Tax (10%)</th>
          <th>Net Pay</th>
          <th>Payment Status</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {staffPayrollData.map(staff => (
          <tr key={staff.id} className="payroll-row">
            <td>
              <div className="staff-info-cell">
                <div className="staff-avatar-glow">{staff.name.charAt(0)}</div>
                <div>
                  <p className="staff-name">{staff.name}</p>
                  <span className="staff-role">{staff.role}</span>
                </div>
              </div>
            </td>
            <td><strong className="text-slate-700">${staff.base.toLocaleString()}</strong></td>
            <td className="text-red-500 font-medium">-${staff.tax}</td>
            <td>
              <span className="net-pay-highlight">
                ${staff.net.toLocaleString()}
              </span>
            </td>
            <td>
              <div className={`status-pill-v2 ${staff.status.toLowerCase()}`}>
                <div className="status-dot"></div>
                {staff.status}
              </div>
            </td>
            <td>
              <div className="payroll-row-actions">
                <button className="btn-payslip">
                  <FileText size={14} />
                  <span>View Payslip</span>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>
          )}
        </main>
      </div>

      <FeeStructureModal isOpen={isFeeModalOpen} onClose={() => setIsFeeModalOpen(false)} />
    </div>
  );
}

// Sub-component for Class Fee Cards
function ClassFeeCard({ name, t1, t2, t3, color, onEdit }) {
  const annual = (parseInt(t1.replace(',','')) + parseInt(t2.replace(',','')) + parseInt(t3.replace(',',''))).toLocaleString();
  return (
    <div className="fee-card-custom" style={{ borderTop: `4px solid ${color}` }}>
      <div className="fee-card-header">
        <h5>{name}</h5>
        <div className="fee-actions-mini">
          <button className="btn-icon-sm" onClick={onEdit}><Edit3 size={14} /></button>
          <button className="btn-icon-sm"><Eye size={14} /></button>
        </div>
      </div>
      <div className="fee-term-row">
        <div className="term-box"><span>Term 1</span><p>${t1}</p></div>
        <div className="term-box"><span>Term 2</span><p>${t2}</p></div>
        <div className="term-box"><span>Term 3</span><p>${t3}</p></div>
      </div>
      <div className="total-annual">
        <span>Annual Total</span>
        <p style={{ color: color }}>${annual}</p>
      </div>
    </div>
  );
}