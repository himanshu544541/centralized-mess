import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Store, ShieldCheck, QrCode, TrendingUp, IndianRupee, Settings, Utensils, ExternalLink } from 'lucide-react';

const VendorDashboard = () => {
  const { user, mess } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Vendor Hero Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Partner Mess</span>
            </div>

            <Link
              to="/vendor/manage"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-gray-900 rounded-xl text-xs font-bold shadow-md hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-3.5 h-3.5 text-amber-600" />
              <span>Manage Profile & Menus</span>
            </Link>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {mess?.name || 'Your Mess'}
          </h1>
          <p className="text-white/80 text-sm max-w-xl mt-1">
            Managed by {user?.name} • FSSAI: {mess?.fssaiNumber} • {mess?.address}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
              <div className="text-[11px] text-white/70 uppercase tracking-wider font-semibold">Rate Per Meal Served</div>
              <div className="text-lg font-bold">₹60.00</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
              <div className="text-[11px] text-white/70 uppercase tracking-wider font-semibold">Mess Status</div>
              <div className="text-lg font-bold">{mess?.isOpen ? '🟢 Open for Dining' : '🔴 Closed'}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
              <div className="text-[11px] text-white/70 uppercase tracking-wider font-semibold">Today's Meals Served</div>
              <div className="text-lg font-bold">0 Check-ins</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/vendor/manage"
          className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:border-amber-300 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Utensils className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
            Daily Menu & Timings
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Update lunch and dinner dishes, toggle your mess open/closed status in real time.
          </p>
        </Link>

        <Link
          to="/vendor/scan"
          className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <QrCode className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
              Scan Student QR
            </h3>
            <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
              Live Camera
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Scan dynamic student QR tokens at the dining counter with instant big green ALLOWED / red DENIED check-in response.
          </p>
        </Link>

        <Link
          to="/why-join"
          className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:border-purple-300 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
            Unit Economics & Profit
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Calculate your monthly payout increase at ₹60.00/meal vs the old ₹58.33 single hostel mess rate.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default VendorDashboard;
