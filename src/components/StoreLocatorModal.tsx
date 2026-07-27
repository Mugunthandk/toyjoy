import React, { useState } from 'react';
import { StoreLocation } from '../types';
import { MOCK_STORES } from '../data/mockData';

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreLocatorModal: React.FC<StoreLocatorModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = MOCK_STORES.filter(
    (s) =>
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.pinCode.includes(search) ||
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fbf9f1] w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-[#c3c6d7] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#ea580c] text-white p-6 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ffe16d] text-[#221b00] flex items-center justify-center font-bold">
              <span className="material-symbols-filled text-2xl">location_on</span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold">ToyJoy Physical Store Locator</h2>
              <p className="text-xs text-orange-100">Find experience centers & pick up in 1 hour</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by city name or Pincode (e.g., Bengaluru, 600002)"
              className="w-full bg-white border border-[#c3c6d7] rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((store) => (
              <div key={store.id} className="bg-white p-5 rounded-2xl border border-[#c3c6d7] shadow-xs space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-[#1b1c17]">{store.name}</h4>
                    <span className="text-xs text-[#ea580c] font-bold">{store.city} • Pin: {store.pinCode}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                    Open Now
                  </span>
                </div>

                <p className="text-xs text-[#434655]">{store.address}</p>
                <div className="text-xs text-[#737686] flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  Hours: {store.hours}
                </div>

                <div className="flex gap-2 pt-2 border-t border-[#f0eee6]">
                  <a
                    href={`tel:${store.phone}`}
                    className="flex-1 py-2 bg-[#f0eee6] hover:bg-[#e4e3db] text-[#1b1c17] text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">call</span> Call Store
                  </a>
                  <button
                    onClick={() => alert(`Directions loaded for ${store.name}`)}
                    className="flex-1 py-2 bg-[#ea580c] hover:bg-[#c8452a] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">directions</span> Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
