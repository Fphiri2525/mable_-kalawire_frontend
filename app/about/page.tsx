'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Users, Home, Target, Shield, BookOpen, ArrowRight } from 'lucide-react';

// Import images
import foundationImage from '../assets/foundation.jpg';
import meboImage from '../assets/meb.jpg';

export default function AboutPage() {
  const [activeValue, setActiveValue] = useState(0);
  const [foundedCount, setFoundedCount] = useState(0);
  const [transparencyCount, setTransparencyCount] = useState(0);
  const [focusCount, setFocusCount] = useState(0);

  const values = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Transparency",
      description: "Every donation is tracked and reported with complete openness on our website and social media."
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Compassion",
      description: "Founded by an orphan, we understand the pain and challenges firsthand."
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Community",
      description: "We build sustainable support systems that uplift entire communities in Malawi."
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Education",
      description: "Education is our primary tool for breaking the cycle of poverty and vulnerability."
    }
  ];

  // Animated counters
  useEffect(() => {
    const foundedTimer = setInterval(() => {
      setFoundedCount(prev => {
        if (prev >= 2023) {
          clearInterval(foundedTimer);
          return 2023;
        }
        return prev + 40;
      });
    }, 20);

    const transparencyTimer = setInterval(() => {
      setTransparencyCount(prev => {
        if (prev >= 100) {
          clearInterval(transparencyTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    const focusTimer = setInterval(() => {
      setFocusCount(prev => {
        if (prev >= 100) {
          clearInterval(focusTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => {
      clearInterval(foundedTimer);
      clearInterval(transparencyTimer);
      clearInterval(focusTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Hero Section - Matching WorkPage style */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        {/* Background Image with Light Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(26, 26, 94, 0.4), rgba(26, 26, 94, 0.5)), url(${foundationImage.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Organization Title Badge - Matching WorkPage style */}
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-px bg-yellow-400/80"></div>
              <span className="text-yellow-400 font-medium uppercase tracking-[0.2em] text-xs drop-shadow-md">
                Mebo Kalawire Organization
              </span>
              <div className="w-10 h-px bg-yellow-400/80"></div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight drop-shadow-lg">
              Our Story of <span className="font-semibold">Hope & Healing</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-base text-white/95 max-w-2xl mx-auto font-light mb-8 leading-relaxed drop-shadow-md">
              Born from personal struggle, built on compassion, and dedicated to transforming lives in Malawi.
            </p>
            
            {/* Story Tagline - Transparent like WorkPage */}
            <div className="bg-black/20 backdrop-blur-sm border-l-4 border-yellow-400 p-5 rounded-r-lg max-w-2xl mx-auto mb-8">
              <p className="text-white text-lg md:text-xl font-light italic">
                "The Foundation of Hope, Built on a Story of Resilience"
              </p>
            </div>
            
            {/* Stats - Transparent cards matching WorkPage */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
              <div className="text-center bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-5 hover:bg-black/30 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-light text-yellow-400 mb-1 drop-shadow-lg">
                  {foundedCount}
                </div>
                <div className="text-white/80 text-xs uppercase tracking-wider font-medium">Founded</div>
                <div className="w-8 h-px bg-yellow-400/40 mx-auto mt-2"></div>
              </div>
              
              <div className="text-center bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-5 hover:bg-black/30 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-light text-yellow-400 mb-1 drop-shadow-lg">
                  {transparencyCount}%
                </div>
                <div className="text-white/80 text-xs uppercase tracking-wider font-medium">Transparency</div>
                <div className="w-8 h-px bg-yellow-400/40 mx-auto mt-2"></div>
              </div>
              
              <div className="text-center bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-5 hover:bg-black/30 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-light text-yellow-400 mb-1 drop-shadow-lg">
                  Malawi
                </div>
                <div className="text-white/80 text-xs uppercase tracking-wider font-medium">Our Focus</div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-3">
                  <div 
                    className="bg-yellow-400 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${focusCount}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="w-4 h-6 border border-white/20 rounded-full flex justify-center">
            <div className="w-0.5 h-1.5 bg-white/40 rounded-full mt-1.5 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* SPACER */}
      <div className="h-12 md:h-16"></div>

      {/* Our Story Section - Matching WorkPage alternating layout */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="text-yellow-500 font-medium text-xs uppercase tracking-[0.3em]">Our Journey</span>
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mt-3 mb-3">
              The Story Behind the <span className="font-semibold">Foundation</span>
            </h2>
            <div className="w-12 h-px bg-gray-300 mx-auto"></div>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-4 font-light">
              From personal experience to nationwide impact - the journey of Mebo Kalawire Organization
            </p>
          </div>

          {/* Story content with alternating layout */}
          <div className="space-y-12">
            {/* First row - Image right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="max-w-md mx-auto md:mx-0">
                  <p className="text-gray-500 text-sm leading-relaxed font-light mb-4">
                    Mebo Kalawire Organization was officially founded in 2023, but its roots run much deeper. What began as a personal mission—helping individuals she encountered who were struggling with financial hardships and educational barriers—slowly evolved into a calling that could no longer be contained.
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">
                    As Mebo continued her compassionate work, she witnessed firsthand the widespread challenges faced by countless Malawians. The realization that so many shared similar struggles inspired her to create something more sustainable, more organized, and far-reaching.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative aspect-[4/3] max-w-md mx-auto md:mx-0 overflow-hidden bg-gray-50">
                  <img 
                    src={foundationImage.src} 
                    alt="Mebo Kalawire Foundation in Action" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Quote - Transparent like WorkPage */}
            <div className="bg-yellow-50/50 border-l-4 border-yellow-400 p-6 max-w-3xl mx-auto">
              <p className="text-gray-600 italic text-base font-light text-center leading-relaxed">
                "What started as helping one person became a calling to help thousands. Every life touched is a chapter in our story."
              </p>
            </div>

            {/* Second row - Image left */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-1">
                <div className="relative aspect-[4/3] max-w-md mx-auto md:mx-0 overflow-hidden bg-gray-50">
                  <img 
                    src={foundationImage.src} 
                    alt="Foundation Community Work" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                </div>
              </div>
              <div className="order-2">
                <div className="max-w-md mx-auto md:mx-0">
                  <p className="text-gray-500 text-sm leading-relaxed font-light mb-4">
                    The foundation represents more than just charity; it embodies hope, resilience, and the belief that no one should navigate hardship alone. Built on the principles of transparency, compassion, and community empowerment, we've created a platform where every contribution makes a tangible difference.
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">
                    Today, Mebo Kalawire Organization stands as a testament to what one person's vision can achieve when fueled by empathy and determination. We're not just providing aid—we're building futures, restoring dignity, and creating sustainable change across Malawi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPACER */}
      <div className="h-12"></div>

      {/* Founder Section - Matching WorkPage style with transparent cards */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="text-yellow-500 font-medium text-xs uppercase tracking-[0.3em]">The Heart Behind It All</span>
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mt-3 mb-3">
              About the Founder: <span className="font-semibold">Mebo Kalawire</span>
            </h2>
            <div className="w-12 h-px bg-gray-300 mx-auto"></div>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-4 font-light">
              A story of resilience turning into a legacy of hope
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Founder Image */}
            <div className="lg:col-span-1">
              <div className="relative max-w-sm mx-auto">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={meboImage.src}
                    alt="Mebo Kalawire"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-[#1a1a5e] px-4 py-2 shadow-lg">
                  <div className="text-center">
                    <div className="text-sm font-medium">Mebo Kalawire</div>
                    <div className="text-xs">Founder & Visionary</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Founder Info - Clean, minimal cards */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white border border-gray-200 p-6">
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-50 p-2 flex-shrink-0">
                    <Users className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-1">Mebo Kalawire</h3>
                    <p className="text-gray-500 text-xs">Young and passionate Malawian woman, born in 1995</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-gray-500 text-sm leading-relaxed font-light">
                  Mebo's journey is one of profound personal experience. As an orphan herself, she intimately understands the emotional, financial, and social challenges that come with growing up without parental support. This lived experience is what fuels her deep empathy and unwavering commitment to helping others in similar situations.
                </p>
                
                <p className="text-gray-500 text-sm leading-relaxed font-light">
                  Her ability to relate to those facing financial hardship isn't theoretical—it's rooted in her own story. This authentic connection allows her to approach each individual's needs with genuine understanding and tailored support, rather than impersonal charity.
                </p>
                
                <div className="bg-yellow-50/50 border-l-4 border-yellow-400 p-4">
                  <p className="text-gray-600 text-sm italic font-light">
                    "My journey from personal struggle to founding this organization taught me that our deepest pains can become our greatest purpose when we choose to help others."
                  </p>
                </div>
              </div>
              
              {/* Mini stats - Matching WorkPage style */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="text-center bg-white border border-gray-200 p-3">
                  <div className="text-base font-light text-gray-900 mb-0.5">1995</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Born</div>
                </div>
                <div className="text-center bg-white border border-gray-200 p-3">
                  <div className="text-base font-light text-gray-900 mb-0.5">Orphan</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Journey</div>
                </div>
                <div className="text-center bg-white border border-gray-200 p-3">
                  <div className="text-base font-light text-gray-900 mb-0.5">Malawian</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Proud</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPACER */}
      <div className="h-12"></div>

      {/* Vision Section - Matching WorkPage style */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="text-yellow-500 font-medium text-xs uppercase tracking-[0.3em]">Our Future Goals</span>
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mt-3 mb-3">
              Our Vision for <span className="font-semibold">Malawi</span>
            </h2>
            <div className="w-12 h-px bg-gray-300 mx-auto"></div>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-4 font-light">
              Building a brighter future through education, housing, and community support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "10,000+ Lives", desc: "We aim to support more than 10,000 vulnerable Malawians, especially orphans and students, providing them with opportunities for a better future through comprehensive support programs." },
              { icon: Home, title: "University Hostels", desc: "Building safe, affordable hostels at public universities across Malawi to support students who struggle with accommodation." },
              { icon: Heart, title: "Christ's Love", desc: "Making Malawi a better place for everyone, guided by the love of Christ for all people." }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="bg-yellow-50 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-yellow-100 transition-colors duration-300">
                  <item.icon className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed font-light">{item.desc}</p>
                <div className="w-8 h-px bg-gray-200 mt-4 group-hover:w-12 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPACER */}
      <div className="h-12"></div>

      {/* Values Section - Matching WorkPage style */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="text-yellow-500 font-medium text-xs uppercase tracking-[0.3em]">What We Believe</span>
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mt-3 mb-3">
              Our Core <span className="font-semibold">Values</span>
            </h2>
            <div className="w-12 h-px bg-gray-300 mx-auto"></div>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-4 font-light">
              The principles that guide every decision we make and every life we touch
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group"
                onMouseEnter={() => setActiveValue(index)}
              >
                <div className={`w-10 h-10 flex items-center justify-center mb-3 ${
                  activeValue === index ? 'bg-yellow-400' : 'bg-yellow-50'
                } transition-colors duration-300`}>
                  <div className={activeValue === index ? 'text-white' : 'text-yellow-600'}>
                    {value.icon}
                  </div>
                </div>
                <h3 className={`text-sm font-medium mb-2 ${
                  activeValue === index ? 'text-gray-900' : 'text-gray-700'
                }`}>
                  {value.title}
                </h3>
                <p className="text-gray-500 text-xs font-light leading-relaxed">
                  {value.description}
                </p>
                <div className={`w-6 h-px bg-gray-200 mt-4 group-hover:w-10 transition-all duration-300 ${
                  activeValue === index ? 'w-10 bg-yellow-400' : ''
                }`}></div>
              </div>
            ))}
          </div>
          
          {/* Transparency highlight - Matching WorkPage style */}
          <div className="mt-8 bg-[#1a1a5e] text-white p-8 text-center">
            <h3 className="text-lg font-light mb-3">
              Transparency and <span className="font-semibold">Accountability</span>
            </h3>
            <p className="text-white/80 text-sm font-light max-w-3xl mx-auto leading-relaxed">
              We believe strongly in transparency and accountability. Every donation received is carefully allocated to its intended purpose, with detailed reports and regular updates shared openly on our website and social media platforms.
            </p>
            <div className="w-12 h-px bg-yellow-400/60 mx-auto mt-6"></div>
          </div>
        </div>
      </section>

      {/* SPACER */}
      <div className="h-12"></div>

      {/* Who We Serve Section - Matching WorkPage style */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="text-yellow-500 font-medium text-xs uppercase tracking-[0.3em]">Our Focus</span>
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mt-3 mb-3">
              Who We <span className="font-semibold">Serve</span>
            </h2>
            <div className="w-12 h-px bg-gray-300 mx-auto"></div>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-4 font-light">
              We serve orphans, vulnerable children, and individuals in Malawi who are struggling with financial challenges, especially in education and basic living needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Orphans", desc: "Children who have lost parental support and need comprehensive care including education, emotional support, nutrition, and guidance.", color: "blue" },
              { icon: BookOpen, title: "Students", desc: "Young people facing barriers to education including school fees, learning materials, accommodation, and mentorship needed to complete their studies.", color: "yellow" },
              { icon: Heart, title: "Vulnerable Families", desc: "Families facing financial hardship who need support with basic living needs, healthcare, skills training, and income-generating opportunities.", color: "green" }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className={`bg-${item.color}-50 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-${item.color}-100 transition-colors duration-300`}>
                  <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs font-light leading-relaxed">{item.desc}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-4 group-hover:text-yellow-600 transition-colors duration-300">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPACER */}
      <div className="h-12"></div>

      {/* CTA Section - Matching WorkPage style */}
      <section className="py-12 bg-[#1a1a5e]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-2xl font-light text-white mb-3">
            Join Our Journey of <span className="font-semibold">Transformation</span>
          </h2>
          
          <p className="text-white/70 text-sm font-light mb-6 max-w-xl mx-auto">
            From one person's compassion to a foundation helping thousands—be part of this incredible story of hope, healing, and lasting change.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="group inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-[#1a1a5e] px-6 py-2.5 text-xs uppercase tracking-wider transition-all duration-300">
              <span>Support Our Work</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-6 py-2.5 text-xs uppercase tracking-wider transition-all duration-300">
              Learn How to Help
            </button>
          </div>
          
          {/* Minimal stats footer */}
          <div className="flex justify-center gap-8 mt-8 pt-6 border-t border-white/10">
            <div className="text-center">
              <div className="text-xs font-light text-yellow-400 mb-0.5">100%</div>
              <div className="text-white/40 text-2xs uppercase tracking-wider">Transparency</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-light text-yellow-400 mb-0.5">Personal</div>
              <div className="text-white/40 text-2xs uppercase tracking-wider">Founder-Led</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-light text-yellow-400 mb-0.5">Sustainable</div>
              <div className="text-white/40 text-2xs uppercase tracking-wider">Impact</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}