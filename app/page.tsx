'use client';

import React, { useState, useEffect, useRef } from 'react';

// IMPORT YOUR IMAGES
import fredImage from './assets/fred.jpg';
import meboImage from './assets/mebo.avif';
import childrenImage from './assets/children.jpg';
import orphanImage from './assets/orphan.jpg';
import foundationImage from './assets/foundation.jpg';

export default function MeboFoundation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [beneficiarySlideIndex, setBeneficiarySlideIndex] = useState(0);
  const [whatWeDoIndex, setWhatWeDoIndex] = useState(0);
  const [showDonationCard, setShowDonationCard] = useState(false);
  
  // State for animated counters
  const [childrenCount, setChildrenCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [widowsCount, setWidowsCount] = useState(0);
  const [communitiesCount, setCommunitiesCount] = useState(0);
  
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Hero slideshow auto-rotation
    const heroInterval = setInterval(() => {
      setHeroSlideIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 5000);
    
    // Beneficiary slideshow auto-rotation
    const beneficiaryInterval = setInterval(() => {
      setBeneficiarySlideIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 4000);
    
    // What We Do slideshow auto-rotation
    const whatWeDoInterval = setInterval(() => {
      setWhatWeDoIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 4500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(heroInterval);
      clearInterval(beneficiaryInterval);
      clearInterval(whatWeDoInterval);
    };
  }, []);

  // Auto-increment counter effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate counters
            const animateCounter = (setter: React.Dispatch<React.SetStateAction<number>>, target: number, duration = 2000) => {
              let start = 0;
              const increment = target / (duration / 16);
              
              const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                  setter(target);
                  clearInterval(timer);
                } else {
                  setter(Math.floor(start));
                }
              }, 16);
            };
            
            animateCounter(setChildrenCount, 150);
            animateCounter(setYearsCount, 8);
            animateCounter(setWidowsCount, 50);
            animateCounter(setCommunitiesCount, 12);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, [hasAnimated]);

  // Close card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowDonationCard(false);
      }
    };

    if (showDonationCard) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDonationCard]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleDonateClick = () => {
    setShowDonationCard(true);
  };

  const closeDonationCard = () => {
    setShowDonationCard(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  // Use the imported images
  const heroImages = [fredImage, meboImage];
  const beneficiaryImages = [orphanImage, foundationImage];

  return (
    <div className="min-h-screen bg-white">
      {/* Small Donation Card */}
      {showDonationCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div 
            ref={cardRef}
            className="bg-white rounded-lg shadow-xl w-80 relative animate-fadeIn"
            style={{
              animation: 'fadeIn 0.2s ease-in-out',
              maxWidth: '320px'
            }}
          >
            {/* Header */}
            <div className="bg-[#1a1a5e] text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold text-sm">Donate to Mebo Foundation</h3>
              <button
                onClick={closeDonationCard}
                className="text-white/80 hover:text-white"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Card Content */}
            <div className="p-4 space-y-3">
              {/* Bank Account */}
              <div className="bg-gray-50 p-3 rounded border-l-4 border-[#e74c3c]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-600">NATIONAL BANK OF MALAWI</span>
                  <button
                    onClick={() => copyToClipboard('1009117616')}
                    className="text-[#1a1a5e] hover:text-[#e74c3c] transition-colors"
                    title="Copy account number"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
                <p className="font-mono text-lg font-bold text-[#1a1a5e] tracking-wider">1009117616</p>
              </div>

              {/* Mobile Money */}
              <div className="bg-gray-50 p-3 rounded border-l-4 border-[#e74c3c]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-600">AIRTEL MONEY / TNM MPAMBA</span>
                  <button
                    onClick={() => copyToClipboard('099346345')}
                    className="text-[#1a1a5e] hover:text-[#e74c3c] transition-colors"
                    title="Copy mobile number"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
                <p className="font-mono text-lg font-bold text-[#1a1a5e] tracking-wider">099346345</p>
              </div>

              {/* Thank You Message */}
              <p className="text-center text-xs text-gray-500 italic pt-2 border-t border-gray-200">
                Thank you for supporting orphans, widows, and vulnerable children in Malawi! 🇲🇼
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Slideshow */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: '20px' }}>
        {/* Slideshow Container */}
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                index === heroSlideIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.src}
                alt={`Hero slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          ))}
          
          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === heroSlideIndex ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                onClick={() => setHeroSlideIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ maxWidth: '600px' }}>
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: '800', color: 'white', marginBottom: '1.5rem', lineHeight: '1.1', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Mable Foundation
            </h1>
            <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'white', marginBottom: '2rem', lineHeight: '1.6', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
              We empower orphans, support vulnerable children, and uplift widows through Mebo Kalawire's personal dedication and your kindness.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => scrollToSection('about')}
                style={{
                  padding: '1rem 3rem',
                  border: '2px solid white',
                  background: 'transparent',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#1a1a5e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
              >
                Learn More
              </button>
              <button
                onClick={handleDonateClick}
                style={{
                  padding: '1rem 3rem',
                  border: '2px solid white',
                  background: 'white',
                  color: '#1a1a5e',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1a1a5e';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = '#1a1a5e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#1a1a5e';
                  e.currentTarget.style.borderColor = 'white';
                }}
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - UPDATED: Removed overlay to make image transparent */}
      <section id="about" style={{ padding: '5rem 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div 
              className="about-image" 
              style={{ 
                height: '500px', 
                borderRadius: '8px', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                backgroundImage: `url(${childrenImage.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* OVERLAY REMOVED - No more gradient overlay */}
            </div>
            
            <div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: '#1a1a5e', marginBottom: '1.5rem' }}>
                About us
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: '1.8' }}>
                Mable foundation, a small self-funded charity, was founded by Mebo Kalawire with a heartfelt mission. We are dedicated to directly supporting orphans with school fees and learning materials, helping vulnerable children, and providing small business capital to widows. Our impact is personal and transparent, largely sustained by Mebo's own commitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Auto-increment */}
      <section ref={statsRef} style={{ padding: '4rem 0', background: '#1a1a5e', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '800' }}>{childrenCount}+</div>
              <div style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Children Supported</div>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '800' }}>{yearsCount}</div>
              <div style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Years of Service</div>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '800' }}>{widowsCount}+</div>
              <div style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Widows Empowered</div>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '800' }}>{communitiesCount}</div>
              <div style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Communities Reached</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" style={{ padding: '5rem 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: '#1a1a5e', textAlign: 'center', marginBottom: '3rem' }}>
            What We Do
          </h2>

          <div style={{ position: 'relative', height: '500px', borderRadius: '8px', marginBottom: '3rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            {[
              'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
              'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2036&q=80',
              'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            ].map((imageUrl, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  index === whatWeDoIndex ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white bg-gradient-to-t from-black/70 to-transparent">
                  <h3 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1rem' }}>
                    {index === 0 && "Educational Support for Children"}
                    {index === 1 && "Food Distribution to Widows"}
                    {index === 2 && "Providing Essential School Supplies"}
                  </h3>
                  <p style={{ fontSize: '1.1rem' }}>
                    {index === 0 && "We provide school fees, uniforms, books and learning materials to ensure orphans and vulnerable children can access quality education."}
                    {index === 1 && "Our volunteers deliver nutritious food packages to widows and their families, ensuring no one goes hungry in our communities."}
                    {index === 2 && "We distribute backpacks, stationery, and other essential learning tools to help children succeed in their education journey."}
                  </p>
                </div>
              </div>
            ))}
            
            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', zIndex: '10' }}>
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setWhatWeDoIndex(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: index === whatWeDoIndex ? '#1a1a5e' : 'rgba(255,255,255,0.5)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ borderLeft: '4px solid #e74c3c', paddingLeft: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a1a5e', marginBottom: '1rem' }}>
                Direct Support Programs
              </h3>
              <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: '1.8' }}>
                We personally deliver school supplies, food packages, and essential resources directly to orphans and widows in need.
              </p>
            </div>

            <div style={{ borderLeft: '4px solid #e74c3c', paddingLeft: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a1a5e', marginBottom: '1rem' }}>
                Sustainable Impact
              </h3>
              <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: '1.8' }}>
                Beyond immediate aid, we provide small business capital and skills training to help widows achieve long-term self-sufficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficiaries Section */}
      <section className="relative overflow-hidden" style={{ padding: '5rem 0', minHeight: '500px' }}>
        {/* Slideshow Background */}
        <div className="absolute inset-0 w-full h-full">
          {beneficiaryImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                index === beneficiarySlideIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.src}
                alt={`Beneficiary slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: 'white', marginBottom: '2rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Our Beneficiaries
          </h2>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', color: 'white', marginBottom: '3rem', lineHeight: '1.6', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
            See the lives we've touched through education support for orphans, empowerment for widows, and community development initiatives.
          </p>
          
          {/* Slide indicators */}
          <div className="flex justify-center space-x-3 mb-6">
            {beneficiaryImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === beneficiarySlideIndex ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                onClick={() => setBeneficiarySlideIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={handleDonateClick}
            style={{
              padding: '1.25rem 3.5rem',
              border: '2px solid white',
              background: 'transparent',
              color: 'white',
              fontWeight: '700',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#1a1a5e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'white';
            }}
          >
            Support Our Cause
          </button>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" style={{ padding: '5rem 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: '#1a1a5e', textAlign: 'center', marginBottom: '1.5rem' }}>
            Support Our Mission
          </h2>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', color: '#333', textAlign: 'center', marginBottom: '3rem', lineHeight: '1.6' }}>
            Your contribution directly funds education for orphans, food for widows, and creates opportunities for vulnerable families.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <div style={{ padding: '2rem', background: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '8px', textAlign: 'center', border: '2px solid #1a1a5e' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1a1a5e', marginBottom: '1rem' }}>$25</div>
              <p style={{ fontSize: '1rem', color: '#333', marginBottom: '1.5rem' }}>Provides school supplies for one child</p>
              <button
                onClick={handleDonateClick}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: '2px solid #1a1a5e',
                  background: '#1a1a5e',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#1a1a5e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1a1a5e';
                  e.currentTarget.style.color = 'white';
                }}
              >
                Donate $25
              </button>
            </div>
            
            <div style={{ padding: '2rem', background: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '8px', textAlign: 'center', border: '2px solid #e74c3c' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#e74c3c', marginBottom: '1rem' }}>$50</div>
              <p style={{ fontSize: '1rem', color: '#333', marginBottom: '1.5rem' }}>Feeds a widow's family for one month</p>
              <button
                onClick={handleDonateClick}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: '2px solid #e74c3c',
                  background: '#e74c3c',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#e74c3c';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#e74c3c';
                  e.currentTarget.style.color = 'white';
                }}
              >
                Donate $50
              </button>
            </div>
            
            <div style={{ padding: '2rem', background: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '8px', textAlign: 'center', border: '2px solid #1a1a5e' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1a1a5e', marginBottom: '1rem' }}>$100</div>
              <p style={{ fontSize: '1rem', color: '#333', marginBottom: '1.5rem' }}>Supports a child's education for one term</p>
              <button
                onClick={handleDonateClick}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: '2px solid #1a1a5e',
                  background: '#1a1a5e',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#1a1a5e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1a1a5e';
                  e.currentTarget.style.color = 'white';
                }}
              >
                Donate $100
              </button>
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleDonateClick}
              style={{
                padding: '1rem 3rem',
                border: '2px solid #1a1a5e',
                background: 'white',
                color: '#1a1a5e',
                fontWeight: '700',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
                marginBottom: '1rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a1a5e';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#1a1a5e';
              }}
            >
              Make a Custom Donation
            </button>
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>Every contribution makes a direct impact on someone's life</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="realisations" style={{ padding: '5rem 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: '#1a1a5e', textAlign: 'center', marginBottom: '3rem' }}>
            Testimonials
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              {
                name: 'David Chen',
                review: "I'm so impressed by Mebo's dedication. Knowing my donation directly helps those in need is truly inspiring.",
              },
              {
                name: 'Sarah Miller',
                review: "The transparency of Mebo Foundation is remarkable. It's wonderful to see the real impact of their work.",
              },
              {
                name: 'John Davis',
                review: "Mebo's personal commitment is truly heartwarming. A small charity making a huge difference.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  padding: '2rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  borderBottom: '4px solid #e74c3c',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1a1a5e 0%, #e74c3c 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '1.25rem',
                      border: '3px solid #e74c3c',
                    }}
                  >
                    {testimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '1.25rem', color: '#1a1a5e' }}>
                    {testimonial.name}
                  </div>
                </div>
                <p style={{ fontSize: '1rem', color: '#555', fontStyle: 'italic', lineHeight: '1.7' }}>
                  {testimonial.review}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Reduced Size */}
      <footer id="contact" style={{ background: '#1a1a5e', color: 'white', padding: '3rem 0 2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            {/* Address - Compact */}
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem' }}>Address</h3>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div style={{ fontSize: '0.95rem' }}>
                  <div>Nkhata-bay</div>
                  <div>private bag , 88</div>
                </div>
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem' }}>Contact</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a href="mailto:info@mebo.org" style={{ color: 'white', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.3s' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = '#e74c3c'}
                   onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                  mablekalawire4@gmail.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:+1-555-1234" style={{ color: 'white', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.3s' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = '#e74c3c'}
                   onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                  09934643455
                </a>
              </div>
            </div>

            {/* Menu - Compact */}
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem' }}>Quick Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button onClick={() => scrollToSection('home')} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem', textAlign: 'left', transition: 'color 0.3s', padding: '0.1rem 0' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#e74c3c'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                  Home
                </button>
                <button onClick={() => scrollToSection('about')} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem', textAlign: 'left', transition: 'color 0.3s', padding: '0.1rem 0' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#e74c3c'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                  About Us
                </button>
                <button onClick={() => scrollToSection('what-we-do')} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem', textAlign: 'left', transition: 'color 0.3s', padding: '0.1rem 0' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#e74c3c'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                  What We Do
                </button>
                <button onClick={() => scrollToSection('donate')} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem', textAlign: 'left', transition: 'color 0.3s', padding: '0.1rem 0' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#e74c3c'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                  Donate
                </button>
                <button onClick={() => scrollToSection('contact')} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem', textAlign: 'left', transition: 'color 0.3s', padding: '0.1rem 0' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#e74c3c'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                  Contact
                </button>
              </div>
            </div>

            {/* Social Media & Donate Button - Compact */}
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem' }}>Follow us</h3>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <a href="#" style={{ color: 'white', transition: 'transform 0.3s, color 0.3s' }}
                   onMouseEnter={(e) => { e.currentTarget.style.color = '#e74c3c'; e.currentTarget.style.transform = 'scale(1.2)'; }}
                   onMouseLeave={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'scale(1)'; }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" style={{ color: 'white', transition: 'transform 0.3s, color 0.3s' }}
                   onMouseEnter={(e) => { e.currentTarget.style.color = '#e74c3c'; e.currentTarget.style.transform = 'scale(1.2)'; }}
                   onMouseLeave={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'scale(1)'; }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" style={{ color: 'white', transition: 'transform 0.3s, color 0.3s' }}
                   onMouseEnter={(e) => { e.currentTarget.style.color = '#e74c3c'; e.currentTarget.style.transform = 'scale(1.2)'; }}
                   onMouseLeave={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'scale(1)'; }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
              
              <div>
                <button onClick={handleDonateClick} style={{
                  padding: '0.6rem 1.5rem',
                  border: '2px solid white',
                  background: 'white',
                  color: '#1a1a5e',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1a1a5e';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#1a1a5e';
                }}>
                  Donate Now
                </button>
              </div>
            </div>
          </div>

          <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.2)', textAlign: 'center', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
            <p>&copy; 2026 Mebo Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add CSS for animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}