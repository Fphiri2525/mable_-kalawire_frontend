'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear messages when user starts typing
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setError('All fields are required');
      setIsSubmitting(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://mablefoundationbackend-production.up.railway.app/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      // Show success message
      setSuccess('Message sent successfully! We\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });

    } catch (err: any) {
      setError(err.message || 'An error occurred while sending your message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-black text-gray-900 mb-8">Contact Us</h1>
      
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left Column - Contact Info */}
        <div>
          <p className="text-xl text-gray-600 mb-8">
            Have questions or want to get involved? We'd love to hear from you.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#2B2E5F]/10 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-[#2B2E5F]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Email</h3>
                <p className="text-gray-600">mablekalawire4@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E63946]/10 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-[#E63946]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Phone</h3>
                <p className="text-gray-600">09934643455</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#2B2E5F]/10 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-[#2B2E5F]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Location</h3>
                <p className="text-gray-600">nkhata-bay, Malawi</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          {/* Success Message */}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2B2E5F] disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="Your Name"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2B2E5F] disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="your@email.com"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4} 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2B2E5F] disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                placeholder="How can we help?"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 bg-[#E63946] text-white font-bold rounded-xl hover:bg-[#D62839] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Send Message</span>
                </>
              )}
            </button>

            {/* Form Note */}
            <p className="text-xs text-gray-400 text-center mt-4">
              * All fields are required. We'll respond to your message within 24-48 hours.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}