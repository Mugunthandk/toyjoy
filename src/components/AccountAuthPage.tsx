import React, { useState, useEffect } from 'react';
import { UserProfile, Currency, UserOrder } from '../types';
import { DEFAULT_USER, MOCK_USER_ORDERS } from '../data/mockData';

interface AccountAuthPageProps {
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  currency: Currency;
  onBackToShop: () => void;
}

export const AccountAuthPage: React.FC<AccountAuthPageProps> = ({
  currentUser,
  onLogin,
  onLogout,
  currency,
  onBackToShop,
}) => {
  // Auth state when logged out
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [selectedKidAges, setSelectedKidAges] = useState<number[]>([3, 7]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['STEM Kits', 'Wooden Toys']);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Profile Dashboard state when logged in
  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'profile' | 'addresses' | 'rewards'>('orders');
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile>(currentUser || DEFAULT_USER);

  // Order History state
  const [orders, setOrders] = useState<UserOrder[]>(MOCK_USER_ORDERS);
  const [orderFilter, setOrderFilter] = useState<'All' | 'Processing' | 'Shipped' | 'Delivered'>('All');
  const [searchOrderQuery, setSearchOrderQuery] = useState('');
  const [isFetchingOrders, setIsFetchingOrders] = useState(false);
  const [lastFetchedTime, setLastFetchedTime] = useState<string>('Just now');
  const [expandedTimelineOrderId, setExpandedTimelineOrderId] = useState<string | null>('TJ-912880');

  const fetchOrders = () => {
    setIsFetchingOrders(true);
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((ord) => {
          if (ord.orderNumber === 'TJ-914002') {
            return {
              ...ord,
              status: 'Processing',
              timeline: ord.timeline?.map((t, idx) =>
                idx <= 2 ? { ...t, completed: true, time: 'Today, Live Updated' } : t
              )
            };
          }
          return ord;
        })
      );
      setIsFetchingOrders(false);
      setLastFetchedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 700);
  };

  // Address form modal state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState('Home');
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrLine, setNewAddrLine] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrPin, setNewAddrPin] = useState('');

  const availableKidAges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const availableInterests = ['STEM Kits', 'Wooden Toys', 'Pretend Play', 'Electronic Toys', 'Plush Friends', 'Outdoor & Sports'];

  // Currency helper
  const formatPrice = (valINR: number) => {
    switch (currency) {
      case 'USD': return `$${(valINR / 83).toFixed(2)}`;
      case 'EUR': return `€${(valINR / 90).toFixed(2)}`;
      case 'GBP': return `£${(valINR / 105).toFixed(2)}`;
      case 'AED': return `AED ${(valINR / 22.6).toFixed(1)}`;
      case 'SGD': return `S$${(valINR / 62).toFixed(1)}`;
      default: return `₹${valINR.toLocaleString('en-IN')}`;
    }
  };

  const handleDemoLogin = (role: 'VIP' | 'Standard') => {
    const userToLogin: UserProfile = role === 'VIP' ? DEFAULT_USER : {
      id: 'usr-102',
      name: 'Rohan Mehta',
      email: 'rohan.mehta@example.com',
      phone: '+91 91234 56789',
      role: 'Customer',
      kidsAges: [5],
      interests: ['STEM Kits', 'Electronic Toys'],
      loyaltyPoints: 350,
      joinedDate: 'Mar 2026',
      addresses: [
        {
          id: 'addr-std-1',
          label: 'Home',
          name: 'Rohan Mehta',
          phone: '+91 91234 56789',
          line1: 'B-12 Green Park Extension',
          city: 'New Delhi',
          state: 'Delhi',
          pinCode: '110016',
          isDefault: true
        }
      ]
    };

    onLogin(userToLogin);
    setProfileData(userToLogin);
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail.trim()) {
      // Direct login as default VIP user
      onLogin(DEFAULT_USER);
      setProfileData(DEFAULT_USER);
      return;
    }
    // Log in user with input email
    const loggedInUser: UserProfile = {
      ...DEFAULT_USER,
      email: loginEmail,
      name: loginEmail.split('@')[0].replace('.', ' ') || 'ToyJoy Member',
    };
    onLogin(loggedInUser);
    setProfileData(loggedInUser);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
      alert('Please fill in all required fields (Name, Email, and Password).');
      return;
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now().toString().slice(-5)}`,
      name: signupName,
      email: signupEmail,
      phone: signupPhone || '+91 98000 12345',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
      role: 'VIP Member',
      kidsAges: selectedKidAges,
      interests: selectedInterests,
      loyaltyPoints: 200, // 200 Welcome bonus points!
      joinedDate: 'Today',
      addresses: [
        {
          id: `addr-${Date.now()}`,
          label: 'Primary Delivery Address',
          name: signupName,
          phone: signupPhone || '+91 98000 12345',
          line1: 'Primary Residence',
          city: 'Bengaluru',
          state: 'Karnataka',
          pinCode: '560001',
          isDefault: true
        }
      ]
    };

    setSignupSuccess(true);
    setTimeout(() => {
      onLogin(newUser);
      setProfileData(newUser);
      setSignupSuccess(false);
    }, 800);
  };

  const handleSaveProfile = () => {
    onLogin(profileData);
    setEditingProfile(false);
    alert('Profile updated successfully!');
  };

  const handleAddAddress = () => {
    if (!newAddrName.trim() || !newAddrLine.trim() || !newAddrCity.trim() || !newAddrPin.trim()) {
      alert('Please complete all address details.');
      return;
    }
    const newAddr = {
      id: `addr-${Date.now()}`,
      label: newAddrLabel,
      name: newAddrName,
      phone: profileData.phone || '+91 98765 43210',
      line1: newAddrLine,
      city: newAddrCity,
      state: 'India',
      pinCode: newAddrPin,
      isDefault: (profileData.addresses || []).length === 0,
    };

    const updated = {
      ...profileData,
      addresses: [...(profileData.addresses || []), newAddr],
    };
    setProfileData(updated);
    onLogin(updated);
    setShowAddressModal(false);
    setNewAddrName('');
    setNewAddrLine('');
    setNewAddrCity('');
    setNewAddrPin('');
  };

  // ==========================================
  // UNAUTHENTICATED: LOGIN / CREATE ACCOUNT VIEW
  // ==========================================
  if (!currentUser) {
    return (
      <div className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 bg-[#fbf9f1] flex items-center justify-center">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-[#e4e3db] overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#ea580c] via-[#e11d48] to-[#f59e0b] p-8 text-white text-center relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center text-2xl shadow-sm">
                🧸
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {authMode === 'login' ? 'Welcome Back to ToyJoy WOW! 🎉' : 'Create Your ToyJoy WOW! Account ✨'}
              </h1>
              <p className="text-xs sm:text-sm text-orange-100 font-medium max-w-md mx-auto">
                {authMode === 'login'
                  ? 'Access your saved orders, VIP reward points, and personalized AI toy recommendations.'
                  : 'Join 50,000+ parents! Get 200 welcome bonus points + tailored toy age suggestions.'}
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-[#e4e3db] bg-[#f8f7f0]">
            <button
              onClick={() => {
                setAuthMode('login');
                setLoginError('');
              }}
              className={`flex-1 py-4 font-black text-sm transition-colors text-center border-b-2 ${
                authMode === 'login'
                  ? 'border-[#ea580c] text-[#ea580c] bg-white'
                  : 'border-transparent text-[#737686] hover:text-[#1b1c17]'
              }`}
            >
              Sign In (Login)
            </button>
            <button
              onClick={() => {
                setAuthMode('signup');
                setLoginError('');
              }}
              className={`flex-1 py-4 font-black text-sm transition-colors text-center border-b-2 ${
                authMode === 'signup'
                  ? 'border-[#ea580c] text-[#ea580c] bg-white'
                  : 'border-transparent text-[#737686] hover:text-[#1b1c17]'
              }`}
            >
              Create Account (Sign Up) 🎉
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Quick Demo Login Preset Buttons */}
            <div className="bg-[#fff7ed] border border-[#ffedd5] p-4 rounded-2xl space-y-2 text-center">
              <span className="text-xs font-black text-[#ea580c] uppercase tracking-wider block">
                ⚡ Instant One-Click Demo Login
              </span>
              <div className="flex flex-wrap gap-2 justify-center pt-1">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('VIP')}
                  className="px-4 py-2 bg-[#ea580c] hover:bg-[#c8452a] text-white text-xs font-black rounded-xl shadow-xs transition-all hover-bounce cursor-pointer"
                >
                  Priya Sharma (VIP Parent • 1,450 pts)
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('Standard')}
                  className="px-4 py-2 bg-white border border-[#ea580c] text-[#ea580c] hover:bg-orange-50 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Rohan Mehta (Customer • 350 pts)
                </button>
              </div>
            </div>

            {/* LOGIN FORM */}
            {authMode === 'login' && (
              <form onSubmit={handleCustomLogin} className="space-y-4">
                {loginError && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-200">
                    ⚠️ {loginError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-extrabold text-[#1b1c17] mb-1.5">
                    Email Address or Mobile Number
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. priya.sharma@example.com"
                    className="w-full bg-[#f0eee6] rounded-xl px-4 py-3 text-sm text-[#1b1c17] border border-[#c3c6d7] focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-extrabold text-[#1b1c17]">Password</label>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your registered email!'); }} className="text-xs font-bold text-[#ea580c] hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#f0eee6] rounded-xl px-4 py-3 text-sm text-[#1b1c17] border border-[#c3c6d7] focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#434655]">
                    <input type="checkbox" defaultChecked className="rounded text-[#ea580c] focus:ring-[#ea580c]" />
                    Remember me on this browser
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#ea580c] hover:bg-[#c8452a] text-white font-black text-sm rounded-2xl shadow-md transition-all hover-bounce cursor-pointer"
                >
                  Sign In to Account
                </button>
              </form>
            )}

            {/* CREATE ACCOUNT FORM */}
            {authMode === 'signup' && (
              <form onSubmit={handleCreateAccount} className="space-y-4">
                {signupSuccess && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 text-center animate-pulse">
                    🎉 Account Created! Logging you in...
                  </div>
                )}

                <div>
                  <label className="block text-xs font-extrabold text-[#1b1c17] mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full bg-[#f0eee6] rounded-xl px-4 py-2.5 text-sm text-[#1b1c17] border border-[#c3c6d7] focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-extrabold text-[#1b1c17] mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="priya@example.com"
                      className="w-full bg-[#f0eee6] rounded-xl px-4 py-2.5 text-sm text-[#1b1c17] border border-[#c3c6d7] focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#1b1c17] mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#f0eee6] rounded-xl px-4 py-2.5 text-sm text-[#1b1c17] border border-[#c3c6d7] focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#1b1c17] mb-1.5">Create Password *</label>
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full bg-[#f0eee6] rounded-xl px-4 py-2.5 text-sm text-[#1b1c17] border border-[#c3c6d7] focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                  />
                </div>

                {/* Child Age Preferences for AI */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-extrabold text-[#1b1c17]">
                    👶 Select Your Kids' Ages (helps AI recommend perfect toys):
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {availableKidAges.map((age) => {
                      const isSelected = selectedKidAges.includes(age);
                      return (
                        <button
                          key={age}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setSelectedKidAges(selectedKidAges.filter((a) => a !== age));
                            } else {
                              setSelectedKidAges([...selectedKidAges, age]);
                            }
                          }}
                          className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all ${
                            isSelected
                              ? 'bg-[#ea580c] text-white shadow-xs scale-105'
                              : 'bg-[#f0eee6] text-[#434655] hover:bg-[#e4e3db]'
                          }`}
                        >
                          {age} Yrs
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preferred Interests */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-extrabold text-[#1b1c17]">
                    🎨 Favorite Toy Categories:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {availableInterests.map((interest) => {
                      const isSelected = selectedInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setSelectedInterests(selectedInterests.filter((i) => i !== interest));
                            } else {
                              setSelectedInterests([...selectedInterests, interest]);
                            }
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-[#ea580c] text-white'
                              : 'bg-[#f0eee6] text-[#434655] hover:bg-[#e4e3db]'
                          }`}
                        >
                          {isSelected ? '✓ ' : ''}{interest}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#ea580c] hover:bg-[#c8452a] text-white font-black text-sm rounded-2xl shadow-md transition-all hover-bounce cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Create Account & Claim 200 Points</span>
                    <span>🎁</span>
                  </button>
                </div>
              </form>
            )}

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onBackToShop}
                className="text-xs font-extrabold text-[#737686] hover:text-[#1b1c17] underline"
              >
                ← Back to Toy Shop
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED: USER ACCOUNT DASHBOARD VIEW
  // ==========================================
  return (
    <div className="min-h-[85vh] py-8 px-4 sm:px-6 lg:px-12 bg-[#fbf9f1] max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Top Welcome Header Card */}
      <div className="bg-gradient-to-r from-[#ea580c] via-[#e11d48] to-[#d97706] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <img
            src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'}
            alt={currentUser.name}
            className="w-20 h-20 rounded-full border-4 border-white/30 object-cover shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black">{currentUser.name}</h1>
              <span className="bg-white/20 backdrop-blur-md text-white font-black text-xs px-3 py-1 rounded-full border border-white/30 uppercase tracking-wider">
                ⭐ {currentUser.role || 'VIP Member'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-orange-100 font-medium mt-1">
              {currentUser.email} • Joined {currentUser.joinedDate}
            </p>
            {currentUser.kidsAges && currentUser.kidsAges.length > 0 && (
              <p className="text-xs text-amber-200 font-bold mt-1">
                👶 Kids Ages: {currentUser.kidsAges.map(a => `${a} Yrs`).join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Loyalty Balance & Logout Button */}
        <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto relative z-10 border-t sm:border-t-0 border-white/20 pt-4 sm:pt-0">
          <div className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-left sm:text-right">
            <span className="text-[10px] text-orange-200 font-extrabold uppercase tracking-widest block">
              ToyJoy Loyalty Balance
            </span>
            <span className="text-2xl font-black text-amber-300">
              {currentUser.loyaltyPoints.toLocaleString()} Points
            </span>
          </div>

          <button
            onClick={() => {
              onLogout();
            }}
            className="px-5 py-2.5 bg-white text-[#ea580c] hover:bg-orange-100 font-black text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            Log Out Account
          </button>
        </div>
      </div>

      {/* Account Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#e4e3db] pb-2">
        <button
          onClick={() => setActiveSubTab('orders')}
          className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 ${
            activeSubTab === 'orders'
              ? 'bg-[#ea580c] text-white shadow-md'
              : 'bg-white text-[#434655] hover:bg-[#e4e3db] border border-[#e4e3db]'
          }`}
        >
          <span className="material-symbols-outlined text-lg">local_shipping</span>
          My Orders & Live Tracking
        </button>

        <button
          onClick={() => setActiveSubTab('profile')}
          className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 ${
            activeSubTab === 'profile'
              ? 'bg-[#ea580c] text-white shadow-md'
              : 'bg-white text-[#434655] hover:bg-[#e4e3db] border border-[#e4e3db]'
          }`}
        >
          <span className="material-symbols-outlined text-lg">person</span>
          Profile & Kid Preferences
        </button>

        <button
          onClick={() => setActiveSubTab('addresses')}
          className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 ${
            activeSubTab === 'addresses'
              ? 'bg-[#ea580c] text-white shadow-md'
              : 'bg-white text-[#434655] hover:bg-[#e4e3db] border border-[#e4e3db]'
          }`}
        >
          <span className="material-symbols-outlined text-lg">location_on</span>
          Saved Addresses
        </button>

        <button
          onClick={() => setActiveSubTab('rewards')}
          className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 ${
            activeSubTab === 'rewards'
              ? 'bg-[#ea580c] text-white shadow-md'
              : 'bg-white text-[#434655] hover:bg-[#e4e3db] border border-[#e4e3db]'
          }`}
        >
          <span className="material-symbols-outlined text-lg">card_giftcard</span>
          Rewards & Referral Code
        </button>
      </div>

      {/* SUB-TAB 1: ORDER HISTORY & TRACKING */}
      {activeSubTab === 'orders' && (
        <div className="space-y-6">
          {/* Header & Sync Action Bar */}
          <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-5 rounded-3xl border border-[#e4e3db] shadow-xs">
            <div>
              <h2 className="text-xl font-extrabold text-[#1b1c17] flex items-center gap-2">
                📦 Order History & Live Statuses
              </h2>
              <p className="text-xs text-[#737686] mt-0.5">
                Track live package updates, view past receipts, and manage deliveries.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#737686] hidden sm:inline">
                Last synced: <strong className="text-[#1b1c17]">{lastFetchedTime}</strong>
              </span>
              <button
                onClick={fetchOrders}
                disabled={isFetchingOrders}
                className="px-4 py-2 bg-[#fff7ed] hover:bg-orange-100 text-[#ea580c] border border-[#ea580c]/30 text-xs font-black rounded-2xl transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span className={`material-symbols-outlined text-base ${isFetchingOrders ? 'animate-spin' : ''}`}>
                  sync
                </span>
                {isFetchingOrders ? 'Fetching Statuses...' : 'Sync Order Statuses'}
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-[#e4e3db] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#ea580c] flex items-center justify-center font-black text-lg">
                📦
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold text-[#737686]">Total Orders</span>
                <span className="block text-lg font-black text-[#1b1c17]">{orders.length}</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#e4e3db] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-lg">
                ⏳
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold text-[#737686]">Processing</span>
                <span className="block text-lg font-black text-[#1b1c17]">
                  {orders.filter((o) => o.status === 'Processing').length}
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#e4e3db] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-lg">
                🚚
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold text-[#737686]">In Transit</span>
                <span className="block text-lg font-black text-[#1b1c17]">
                  {orders.filter((o) => o.status === 'Shipped').length}
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#e4e3db] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg">
                ✅
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold text-[#737686]">Delivered</span>
                <span className="block text-lg font-black text-[#1b1c17]">
                  {orders.filter((o) => o.status === 'Delivered').length}
                </span>
              </div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="bg-white p-4 rounded-2xl border border-[#e4e3db] flex flex-wrap justify-between items-center gap-3">
            {/* Status Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {(['All', 'Processing', 'Shipped', 'Delivered'] as const).map((st) => {
                const count = st === 'All' ? orders.length : orders.filter((o) => o.status === st).length;
                return (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      orderFilter === st
                        ? 'bg-[#ea580c] text-white shadow-xs'
                        : 'bg-[#fbf9f1] text-[#434655] hover:bg-[#e4e3db]'
                    }`}
                  >
                    <span>{st === 'All' ? 'All Orders' : st}</span>
                    <span className={`px-1.5 py-0.2 text-[10px] rounded-full ${orderFilter === st ? 'bg-white/20 text-white' : 'bg-[#e4e3db] text-[#1b1c17]'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#737686]">
                search
              </span>
              <input
                type="text"
                placeholder="Search order ID or item..."
                value={searchOrderQuery}
                onChange={(e) => setSearchOrderQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-[#fbf9f1] border border-[#e4e3db] rounded-xl text-xs font-medium text-[#1b1c17] focus:outline-none focus:border-[#ea580c]"
              />
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {orders
              .filter((order) => {
                if (orderFilter !== 'All' && order.status !== orderFilter) return false;
                if (searchOrderQuery.trim()) {
                  const q = searchOrderQuery.toLowerCase();
                  const matchId = order.orderNumber.toLowerCase().includes(q);
                  const matchItems = order.items.some((it) => it.name.toLowerCase().includes(q));
                  return matchId || matchItems;
                }
                return true;
              })
              .map((order) => {
                const isExpanded = expandedTimelineOrderId === order.orderNumber;

                // Status Badge Color & Icon Mapping
                const getStatusBadge = (status: UserOrder['status']) => {
                  switch (status) {
                    case 'Processing':
                      return (
                        <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-black rounded-full flex items-center gap-1.5 border border-amber-200">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          Processing Order
                        </span>
                      );
                    case 'Shipped':
                      return (
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-black rounded-full flex items-center gap-1.5 border border-indigo-200">
                          <span className="material-symbols-outlined text-sm text-indigo-600">local_shipping</span>
                          Shipped & In Transit
                        </span>
                      );
                    case 'Delivered':
                      return (
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full flex items-center gap-1.5 border border-emerald-200">
                          <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                          Delivered
                        </span>
                      );
                    default:
                      return (
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-black rounded-full">
                          {status}
                        </span>
                      );
                  }
                };

                return (
                  <div
                    key={order.orderNumber}
                    className="bg-white rounded-3xl p-6 border border-[#e4e3db] shadow-sm space-y-4 hover:border-[#ea580c]/40 transition-all"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-start pb-4 border-b border-[#f0eee6] gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-[#ea580c] uppercase tracking-wider">
                            Order #{order.orderNumber}
                          </span>
                          <span className="text-xs text-[#737686]">({order.items.length} items)</span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#737686] mt-1">
                          <span>Placed: <strong className="text-[#1b1c17]">{order.date}</strong></span>
                          {order.estimatedDelivery && (
                            <span>Est. Delivery: <strong className="text-[#ea580c]">{order.estimatedDelivery}</strong></span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {getStatusBadge(order.status)}
                        <span className="text-lg font-black text-[#1b1c17]">
                          {formatPrice(order.totalINR)}
                        </span>
                      </div>
                    </div>

                    {/* Address Banner */}
                    {order.deliveryAddress && (
                      <div className="bg-[#fbf9f1] px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 text-[#434655]">
                        <span className="material-symbols-outlined text-sm text-[#ea580c]">pin_drop</span>
                        <span>Delivering to: <strong className="text-[#1b1c17]">{order.deliveryAddress}</strong></span>
                      </div>
                    )}

                    {/* Items List */}
                    <div className="space-y-3 pt-1">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-14 h-14 rounded-2xl object-cover border border-[#e4e3db] shadow-2xs"
                            />
                            <div>
                              <h4 className="font-extrabold text-xs sm:text-sm text-[#1b1c17]">{item.name}</h4>
                              <span className="text-xs text-[#737686]">Quantity: {item.qty}</span>
                            </div>
                          </div>
                          <span className="font-black text-xs sm:text-sm text-[#ea580c]">
                            {formatPrice(item.priceINR)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Milestone Timeline Tracker (Collapsible) */}
                    {order.timeline && order.timeline.length > 0 && (
                      <div className="pt-2 border-t border-[#f0eee6]">
                        <button
                          onClick={() => setExpandedTimelineOrderId(isExpanded ? null : order.orderNumber)}
                          className="text-xs font-black text-[#ea580c] hover:underline flex items-center gap-1 cursor-pointer py-1"
                        >
                          <span className="material-symbols-outlined text-base">route</span>
                          {isExpanded ? 'Hide Delivery Timeline' : 'View Live Delivery Progress Tracker'}
                          <span className="material-symbols-outlined text-base">
                            {isExpanded ? 'expand_less' : 'expand_more'}
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="mt-3 p-4 bg-[#fbf9f1] rounded-2xl border border-[#e4e3db] space-y-3 animate-fadeIn">
                            <h5 className="text-xs font-extrabold text-[#1b1c17] uppercase tracking-wider mb-2">
                              Live Logistics Milestones:
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
                              {order.timeline.map((st, idx) => (
                                <div
                                  key={idx}
                                  className={`p-2.5 rounded-xl border text-xs space-y-1 ${
                                    st.completed
                                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                                      : 'bg-white border-[#e4e3db] text-[#737686]'
                                  }`}
                                >
                                  <div className="flex items-center gap-1.5 font-black">
                                    <span
                                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white ${
                                        st.completed ? 'bg-emerald-600' : 'bg-slate-300'
                                      }`}
                                    >
                                      {st.completed ? '✓' : idx + 1}
                                    </span>
                                    <span>{st.step}</span>
                                  </div>
                                  <span className="text-[10px] block text-[#737686]">{st.time}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-[#f0eee6] flex flex-wrap justify-between items-center gap-3 bg-[#fbf9f1] p-3 rounded-2xl text-xs">
                      <div className="flex items-center gap-2 text-[#434655]">
                        <span className="material-symbols-outlined text-sm text-[#ea580c]">local_shipping</span>
                        <span>Carrier: <strong>{order.carrier}</strong> ({order.trackingNumber})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => alert(`Tracking ${order.trackingNumber}: Package status confirmed on ${order.carrier} network.`)}
                          className="px-3.5 py-1.5 bg-[#ea580c] text-white font-bold rounded-xl hover:bg-[#c8452a] cursor-pointer"
                        >
                          Track Live
                        </button>
                        <button
                          onClick={() => alert(`Invoice PDF generated for Order #${order.orderNumber}. Starting download...`)}
                          className="px-3.5 py-1.5 bg-white border border-[#c3c6d7] text-[#1b1c17] font-bold rounded-xl hover:bg-[#f0eee6] cursor-pointer flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-sm">download</span>
                          Receipt
                        </button>
                        <button
                          onClick={() => alert(`Items from Order #${order.orderNumber} added to your cart!`)}
                          className="px-3.5 py-1.5 bg-white border border-[#c3c6d7] text-[#1b1c17] font-bold rounded-xl hover:bg-[#f0eee6] cursor-pointer"
                        >
                          Reorder
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

            {orders.filter((order) => {
              if (orderFilter !== 'All' && order.status !== orderFilter) return false;
              if (searchOrderQuery.trim()) {
                const q = searchOrderQuery.toLowerCase();
                const matchId = order.orderNumber.toLowerCase().includes(q);
                const matchItems = order.items.some((it) => it.name.toLowerCase().includes(q));
                return matchId || matchItems;
              }
              return true;
            }).length === 0 && (
              <div className="bg-white p-12 rounded-3xl text-center border border-[#e4e3db] space-y-3">
                <span className="text-4xl">📦</span>
                <h3 className="font-black text-lg text-[#1b1c17]">No Orders Found</h3>
                <p className="text-xs text-[#737686] max-w-sm mx-auto">
                  {searchOrderQuery
                    ? `No orders matching "${searchOrderQuery}" in ${orderFilter} status.`
                    : `You have no ${orderFilter.toLowerCase()} orders.`}
                </p>
                <button
                  onClick={() => {
                    setOrderFilter('All');
                    setSearchOrderQuery('');
                  }}
                  className="px-4 py-2 bg-[#ea580c] text-white text-xs font-bold rounded-xl hover:bg-[#c8452a]"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: PROFILE & KID PREFERENCES */}
      {activeSubTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e4e3db] shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-extrabold text-[#1b1c17]">Edit Profile Details</h2>
            <button
              onClick={() => setEditingProfile(!editingProfile)}
              className="px-4 py-2 bg-[#ea580c] text-white font-bold text-xs rounded-xl shadow-xs"
            >
              {editingProfile ? 'Cancel' : 'Edit Information'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-extrabold text-[#1b1c17] mb-1">Full Name</label>
              <input
                type="text"
                disabled={!editingProfile}
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full bg-[#f0eee6] disabled:opacity-80 rounded-xl px-4 py-2.5 text-sm font-bold text-[#1b1c17]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#1b1c17] mb-1">Email Address</label>
              <input
                type="email"
                disabled={!editingProfile}
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full bg-[#f0eee6] disabled:opacity-80 rounded-xl px-4 py-2.5 text-sm font-bold text-[#1b1c17]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#1b1c17] mb-1">Phone Number</label>
              <input
                type="tel"
                disabled={!editingProfile}
                value={profileData.phone || ''}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full bg-[#f0eee6] disabled:opacity-80 rounded-xl px-4 py-2.5 text-sm font-bold text-[#1b1c17]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#1b1c17] mb-1">Member Role</label>
              <input
                type="text"
                disabled
                value={profileData.role || 'Customer'}
                className="w-full bg-orange-50 text-[#ea580c] font-black rounded-xl px-4 py-2.5 text-sm"
              />
            </div>
          </div>

          {/* Kids Age preference editor */}
          <div className="space-y-2 pt-4 border-t border-[#f0eee6]">
            <label className="block text-xs font-extrabold text-[#1b1c17]">
              👶 Child Age Preferences (Used by JoyBot AI):
            </label>
            <div className="flex flex-wrap gap-2">
              {availableKidAges.map((age) => {
                const currentAges = profileData.kidsAges || [];
                const isSel = currentAges.includes(age);
                return (
                  <button
                    key={age}
                    disabled={!editingProfile}
                    onClick={() => {
                      const updatedAges = isSel
                        ? currentAges.filter((a) => a !== age)
                        : [...currentAges, age];
                      setProfileData({ ...profileData, kidsAges: updatedAges });
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isSel
                        ? 'bg-[#ea580c] text-white shadow-xs'
                        : 'bg-[#f0eee6] text-[#434655]'
                    }`}
                  >
                    {age} Yrs
                  </button>
                );
              })}
            </div>
          </div>

          {editingProfile && (
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSaveProfile}
                className="px-6 py-3 bg-[#ea580c] hover:bg-[#c8452a] text-white font-black text-xs rounded-xl shadow-md"
              >
                Save Profile Changes
              </button>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: SAVED ADDRESSES */}
      {activeSubTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-[#1b1c17]">📍 Saved Delivery Locations</h2>
            <button
              onClick={() => setShowAddressModal(true)}
              className="px-4 py-2 bg-[#ea580c] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1"
            >
              <span>+ Add New Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(profileData.addresses || []).map((addr) => (
              <div
                key={addr.id}
                className="bg-white rounded-3xl p-6 border border-[#e4e3db] shadow-sm space-y-2 relative"
              >
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 bg-[#ffedd5] text-[#ea580c] text-xs font-black rounded-full uppercase">
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
                      Default Shipping
                    </span>
                  )}
                </div>
                <h4 className="font-extrabold text-sm text-[#1b1c17] pt-1">{addr.name}</h4>
                <p className="text-xs text-[#434655] font-medium leading-relaxed">
                  {addr.line1}, {addr.city}, {addr.state} - {addr.pinCode}
                </p>
                <p className="text-xs text-[#737686]">Phone: {addr.phone}</p>
              </div>
            ))}
          </div>

          {/* Add Address Modal */}
          {showAddressModal && (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                <h3 className="font-black text-lg text-[#1b1c17]">Add Delivery Address</h3>
                <div>
                  <label className="block text-xs font-bold mb-1">Address Label</label>
                  <select
                    value={newAddrLabel}
                    onChange={(e) => setNewAddrLabel(e.target.value)}
                    className="w-full bg-[#f0eee6] rounded-xl px-4 py-2 text-xs font-bold"
                  >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Grandma's House">Grandma's House</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Recipient Name</label>
                  <input
                    type="text"
                    value={newAddrName}
                    onChange={(e) => setNewAddrName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full bg-[#f0eee6] rounded-xl px-4 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Street Address</label>
                  <input
                    type="text"
                    value={newAddrLine}
                    onChange={(e) => setNewAddrLine(e.target.value)}
                    placeholder="Flat / Building / Street"
                    className="w-full bg-[#f0eee6] rounded-xl px-4 py-2 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold mb-1">City</label>
                    <input
                      type="text"
                      value={newAddrCity}
                      onChange={(e) => setNewAddrCity(e.target.value)}
                      placeholder="Bengaluru"
                      className="w-full bg-[#f0eee6] rounded-xl px-4 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Pincode</label>
                    <input
                      type="text"
                      value={newAddrPin}
                      onChange={(e) => setNewAddrPin(e.target.value)}
                      placeholder="560001"
                      className="w-full bg-[#f0eee6] rounded-xl px-4 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setShowAddressModal(false)}
                    className="flex-1 py-2.5 bg-gray-100 font-bold text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddAddress}
                    className="flex-1 py-2.5 bg-[#ea580c] text-white font-black text-xs rounded-xl shadow-md"
                  >
                    Save Location
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 4: REWARDS & REFERRALS */}
      {activeSubTab === 'rewards' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e4e3db] shadow-sm space-y-4">
            <h2 className="text-xl font-extrabold text-[#1b1c17]">🎁 VIP Loyalty Perks & Vouchers</h2>
            <p className="text-xs text-[#434655] font-medium">
              Earn 10 ToyJoy Points for every ₹100 spent! Redeem points for instant discount coupons.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#fff7ed] p-5 rounded-2xl border border-[#ffedd5] space-y-2">
                <span className="text-xs font-black text-[#ea580c]">₹250 Off Voucher</span>
                <p className="text-xs text-[#737686]">Requires 500 Points</p>
                <button
                  onClick={() => alert('Voucher code TJ-250-OFF unlocked and applied to your account!')}
                  className="w-full py-2 bg-[#ea580c] text-white text-xs font-black rounded-xl"
                >
                  Redeem Voucher
                </button>
              </div>

              <div className="bg-[#fff7ed] p-5 rounded-2xl border border-[#ffedd5] space-y-2">
                <span className="text-xs font-black text-[#ea580c]">Free Gift Wrap + Express</span>
                <p className="text-xs text-[#737686]">Requires 300 Points</p>
                <button
                  onClick={() => alert('Free Gift Wrap voucher applied!')}
                  className="w-full py-2 bg-[#ea580c] text-white text-xs font-black rounded-xl"
                >
                  Redeem Voucher
                </button>
              </div>

              <div className="bg-[#fff7ed] p-5 rounded-2xl border border-[#ffedd5] space-y-2">
                <span className="text-xs font-black text-[#ea580c]">₹500 Off Festival Pass</span>
                <p className="text-xs text-[#737686]">Requires 1,000 Points</p>
                <button
                  onClick={() => alert('Festival pass TJ-FEST-500 unlocked!')}
                  className="w-full py-2 bg-[#ea580c] text-white text-xs font-black rounded-xl"
                >
                  Redeem Voucher
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
