'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Heart,
  Home,
  Users,
  Shield,
  Target,
  BarChart3,
  CheckCircle,
  MapPin,
  ArrowRight
} from 'lucide-react';

// Import images from assets folder
import foundationImage from '../assets/foundation.jpg';
import donationImage from '../assets/donation.jpg';
import communityImage from '../assets/community.jpeg';
import helpImage from '../assets/help.jpg';
import foodImage from '../assets/food.webp';

export default function WorkPage() {
  const [studentsHelped, setStudentsHelped] = useState(0);
  const [orphansSupported, setOrphansSupported] = useState(0);
  const [mealsProvided, setMealsProvided] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Animation for impact counters
  useEffect(() => {
    const interval = setInterval(() => {
      setStudentsHelped(prev => (prev < 500 ? prev + 10 : 500));
      setOrphansSupported(prev => (prev < 300 ? prev + 7 : 300));
      setMealsProvided(prev => (prev < 10000 ? prev + 250 : 10000));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Our work programs with imported images
  const programs = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Education Support",
      description: "We support vulnerable students by helping with school fees, uniforms, books, and learning materials. This support helps students continue their education and reduces school dropouts caused by financial challenges.",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      imageUrl: donationImage,
      imageAlt: "Students in Malawi learning together in a classroom",
      delay: "delay-100",
      stats: "500+ students"
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Orphan Care & Support",
      description: "We provide care and support to orphaned children, ensuring they receive basic needs, emotional support, and encouragement. Our goal is to help orphans feel loved, protected, and hopeful about their future.",
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      imageUrl: helpImage,
      imageAlt: "Caregiver providing support to orphaned children",
      delay: "delay-200",
      stats: "300+ orphans"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Food & Basic Needs",
      description: "The foundation assists vulnerable children and families with food support and basic necessities, helping them meet daily living needs and improve their wellbeing.",
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      imageUrl: foodImage,
      imageAlt: "Food distribution to families in need",
      delay: "delay-300",
      stats: "10,000+ meals"
    },
    {
      icon: <Home className="w-5 h-5" />,
      title: "Student Accommodation Support",
      description: "We plan to build hostels in public universities across Malawi to support students who struggle with rental accommodation. These hostels will provide safe, affordable, and stable housing for vulnerable students.",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
      isFuture: true,
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      imageAlt: "University hostel building",
      delay: "delay-400",
      stats: "Future project"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Community Support",
      description: "We support individuals and families in communities who face serious financial difficulties, offering help during times of need and hardship.",
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
      imageUrl: communityImage,
      imageAlt: "Community meeting and support",
      delay: "delay-500",
      stats: "Active program"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Hero Section - With foundation.jpg as background - MORE TRANSPARENT NOW */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        {/* Background Image with Lighter Overlay for Better Visibility */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(26, 26, 94, 0.4), rgba(26, 26, 94, 0.5)), url(${foundationImage.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Removed the additional gradient overlay that was making it darker */}
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Animated divider lines - Made more visible against lighter background */}
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-px bg-yellow-400/80"></div>
              <span className="text-yellow-400 font-medium uppercase tracking-[0.2em] text-xs drop-shadow-md">
                Making a Difference
              </span>
              <div className="w-10 h-px bg-yellow-400/80"></div>
            </div>
            
            {/* Main title - Added text shadow for better readability */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight drop-shadow-lg">
              Our Work in <span className="font-semibold">Malawi</span>
            </h1>
            
            {/* Subtitle - Better contrast */}
            <p className="text-base text-white/95 max-w-2xl mx-auto font-light mb-12 leading-relaxed drop-shadow-md">
              Transforming lives through education, care, and community support. 
              Every program is designed with compassion and built on transparency.
            </p>
            
            {/* Impact Stats - Better contrast on lighter background */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center group bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="text-3xl md:text-4xl font-light text-yellow-400 mb-1 group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">
                  {studentsHelped}+
                </div>
                <div className="text-white/90 font-medium text-xs uppercase tracking-wider">Students Supported</div>
                <div className="w-10 h-px bg-yellow-400/60 mx-auto mt-2"></div>
              </div>
              
              <div className="text-center group bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="text-3xl md:text-4xl font-light text-yellow-400 mb-1 group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">
                  {orphansSupported}+
                </div>
                <div className="text-white/90 font-medium text-xs uppercase tracking-wider">Orphans Helped</div>
                <div className="w-10 h-px bg-yellow-400/60 mx-auto mt-2"></div>
              </div>
              
              <div className="text-center group bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="text-3xl md:text-4xl font-light text-yellow-400 mb-1 group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">
                  {mealsProvided.toLocaleString()}+
                </div>
                <div className="text-white/90 font-medium text-xs uppercase tracking-wider">Meals Provided</div>
                <div className="w-10 h-px bg-yellow-400/60 mx-auto mt-2"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Minimal scroll indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="w-4 h-6 border border-white/30 rounded-full flex justify-center">
            <div className="w-0.5 h-1.5 bg-white/60 rounded-full mt-1.5 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* SPACER - Creates visual separation between hero and programs */}
      <div className="h-12 md:h-16"></div>

      {/* Our Programs Section - Clean, minimal cards */}
      <section ref={sectionRef} className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="text-yellow-500 font-medium text-xs uppercase tracking-[0.3em]">Our Approach</span>
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mt-3 mb-3">
              Core <span className="font-semibold">Programs</span>
            </h2>
            <div className="w-12 h-px bg-gray-300 mx-auto"></div>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-4 font-light">
              Each program is carefully designed to address specific needs within our communities in Malawi.
            </p>
          </div>

          {/* Programs grid - Alternating layout for clean design - REDUCED SPACING */}
          <div className="space-y-12">
            {programs.map((program, index) => (
              <div 
                key={index} 
                className={`
                  grid grid-cols-1 md:grid-cols-2 gap-8 items-center
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                  transition-all duration-700 ease-out
                  ${program.delay}
                `}
              >
                {/* Content side - Alternating order */}
                <div className={index % 2 === 0 ? 'md:order-1' : 'md:order-2'}>
                  <div className="max-w-md mx-auto md:mx-0">
                    {/* Icon and title */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`${program.bgColor} p-2`}>
                        <div className={program.iconColor}>
                          {program.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {program.title}
                        </h3>
                        {program.isFuture && (
                          <span className="inline-block text-yellow-600 text-xs uppercase tracking-wider mt-0.5">
                            Future Initiative
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed font-light mb-4">
                      {program.description}
                    </p>
                    
                    {/* Stats and link */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                        {program.stats}
                      </span>
                      <button className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-yellow-600 transition-colors duration-300 group">
                        Learn more 
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Image side - Alternating order - REDUCED IMAGE SIZE */}
                <div className={index % 2 === 0 ? 'md:order-2' : 'md:order-1'}>
                  <div className="relative aspect-[4/3] max-w-md mx-auto md:mx-0 overflow-hidden bg-gray-50">
                    <img 
                      src={program.imageUrl.src || program.imageUrl}
                      alt={program.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPACER */}
      <div className="h-12"></div>

      {/* Transparency Section - Clean and minimal */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-yellow-500 font-medium text-xs uppercase tracking-[0.3em]">Building Trust</span>
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mt-3 mb-3">
              Transparency in Our <span className="font-semibold">Work</span>
            </h2>
            <div className="w-12 h-px bg-gray-300 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Full Accountability", description: "All activities and outcomes are documented and verified by our team.", color: "blue" },
              { icon: BarChart3, title: "Regular Reports", description: "Monthly impact reports shared on our website and social media.", color: "green" },
              { icon: Target, title: "Donor Updates", description: "Personal updates showing exactly how contributions are used.", color: "purple" }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center mb-3">
                  <item.icon className={`w-5 h-5 text-${item.color}-500`} />
                </div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs font-light leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
                <div className="w-8 h-px bg-gray-200 mx-auto mt-4 group-hover:w-12 transition-all duration-300"></div>
              </div>
            ))}
          </div>
          
          {/* Live updates card - Minimal */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-gray-500 border border-gray-200 px-5 py-2.5 hover:border-yellow-500 transition-colors duration-300">
              <span>See our impact in real-time</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </section>

      {/* Add custom CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}