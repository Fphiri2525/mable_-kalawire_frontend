'use client';

import { Heart } from 'lucide-react';

export default function DonatePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-[#E63946]/10 rounded-full mb-8">
        <Heart className="w-10 h-10 text-[#E63946]" />
      </div>
      <h1 className="text-4xl font-black text-gray-900 mb-6">Support Our Cause</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
        Your donation helps us provide education, food, and healthcare to children in need. Every contribution makes a difference.
      </p>
      
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Make a Donation</h2>
        <div className="space-y-4">
          <button className="w-full py-4 bg-[#2B2E5F] text-white font-bold rounded-xl hover:bg-[#3A3D7A] transition-colors">
            Donate via PayPal
          </button>
          <button className="w-full py-4 border-2 border-[#2B2E5F] text-[#2B2E5F] font-bold rounded-xl hover:bg-gray-50 transition-colors">
            Bank Transfer Details
          </button>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Mebo Kalawire Orphan Foundation is a registered non-profit organization.
        </p>
      </div>
    </div>
  );
}
