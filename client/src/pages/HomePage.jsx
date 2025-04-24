import React, { useState, useEffect } from 'react';
import { ArrowUp, Menu, X, Phone, Mail, MapPin, FacebookIcon, TwitterIcon, InstagramIcon, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // Show scroll to top button after 500px of scrolling
      setShowScrollTop(position > 500);
      
      // Set active section based on scroll position
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if(position >= sectionTop && position < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // FAQs data
  const faqs = [
    {
      question: "What is NOC Connect's mission?",
      answer: "NOC Connect aims to develop Sri Lankan sports by providing resources, training, and support to athletes and sports organizations throughout the country."
    },
    {
      question: "How can I become a volunteer?",
      answer: "You can become a volunteer by clicking on the 'Volunteer' button in the navigation bar and filling out the application form. We welcome passionate individuals who want to contribute to the development of sports in Sri Lanka."
    },
    {
      question: "What programs does NOC Connect offer?",
      answer: "NOC Connect offers various programs including athlete development, coaching education, sports administration training, and community sports initiatives designed to promote sports at all levels."
    },
    {
      question: "How can sports organizations partner with NOC Connect?",
      answer: "Sports organizations can partner with us by reaching out through our contact form or directly emailing our partnerships team. We collaborate with organizations that share our vision for sports development in Sri Lanka."
    }
  ];
  
  // Leadership team data
  const leadershipTeam = [
    {
      name: "Dr. Samantha Perera",
      role: "President",
      image: "https://images.unsplash.com/photo-1642364861013-2c33f2dcfbcf?q=80&w=2104&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Former Olympian with 20+ years experience in sports administration",
      email: "samantha@gmail.com"
    },
    {
      name: "Ajith Fernando",
      role: "Secretary General",
      image: "https://plus.unsplash.com/premium_photo-1726704146445-af3adaa818e3?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "International sports policy expert and former national coach",
      email: "ajith@gmail.com"
    },
    {
      name: "Nirmala Jayasinghe",
      role: "Vice President",
      image: "https://images.unsplash.com/photo-1736321846342-79d0b17d5d85?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Olympic medalist dedicated to athlete development programs",
      email: "nirmala@gmail.com"
    },
    {
      name: "Rohan Silva",
      role: "Treasurer",
      image: "https://images.unsplash.com/photo-1718209881007-c0ecdfc00f9d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Financial expert specializing in sports organization management",
      email: "rohan@gmail.com"
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const slideIn = {
    hidden: { x: '-100%' },
    visible: { x: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } },
    exit: { x: '-100%', transition: { type: 'spring', stiffness: 100, damping: 20 } }
  };
  
  return (
    <div className="min-h-screen bg-sky-950 text-white font-sans overflow-hidden">
      {/* Navbar */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrollPosition > 50 ? 'bg-sky-950 shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-10 w-10 bg-sky-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">NOC</span>
            </div>
            <span className="text-xl font-bold text-white">Connect</span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <motion.button 
              onClick={() => scrollToSection('home')}
              className={`${activeSection === 'home' ? 'text-sky-300' : 'text-white'} hover:text-sky-300 transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('about')}
              className={`${activeSection === 'about' ? 'text-sky-300' : 'text-white'} hover:text-sky-300 transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About Us
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('leadership')}
              className={`${activeSection === 'leadership' ? 'text-sky-300' : 'text-white'} hover:text-sky-300 transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Leadership
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('faq')}
              className={`${activeSection === 'faq' ? 'text-sky-300' : 'text-white'} hover:text-sky-300 transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              FAQ
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('contact')}
              className={`${activeSection === 'contact' ? 'text-sky-300' : 'text-white'} hover:text-sky-300 transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.button>
            <Link to="/volunteer">
            <motion.div 
              className="px-4 py-2 rounded-full bg-sky-600 hover:bg-sky-500 transition-colors"
              whileHover={{ scale: 1.05, backgroundColor: '#0284c7' }}
              whileTap={{ scale: 0.95 }}
            >
              Volunteer
            </motion.div>
            </Link>
            <Link to="/signup">
            <motion.button 
              className="px-4 py-2 rounded-full border border-white hover:bg-white hover:text-sky-900 transition-colors"
              whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#0c4a6e' }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
            </Link>
          
          </nav>

          
          
          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden text-white z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
        
        {/* Mobile Sidebar Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Sidebar */}
              <motion.div 
                className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-sky-900 z-40 md:hidden flex flex-col py-20 px-6 shadow-lg"
                variants={slideIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex flex-col space-y-6">
                  <motion.button 
                    onClick={() => scrollToSection('home')}
                    className={`${activeSection === 'home' ? 'text-sky-300' : 'text-white'} hover:text-sky-300 transition-colors text-left py-3 text-lg font-medium`}
                    whileTap={{ scale: 0.95 }}
                  >
                    Home
                  </motion.button>
                  <motion.button 
                    onClick={() => scrollToSection('about')}
                    className={`${activeSection === 'about' ? 'text-sky-300' : 'text-white'} hover:text-sky-300 transition-colors text-left py-3 text-lg font-medium`}
                    whileTap={{ scale: 0.95 }}
                  >
                    About Us
                  </motion.button>
                  <motion.button 
                    onClick={() => scrollToSection('leadership')}
                    className={`${activeSection === 'leadership' ? 'text-sky-300' : 'text-white'} hover:text-sky-300 transition-colors text-left py-3 text-lg font-medium`}
                    whileTap={{ scale: 0.95 }}
                  >
                    Leadership
                  </motion.button>
                  <motion.button 
                    onClick={() => scrollToSection('faq')}
                    className={`${activeSection === 'faq' ? 'text-sky-300' : 'text-white'} hover:text-sky-300 transition-colors text-left py-3 text-lg font-medium`}
                    whileTap={{ scale: 0.95 }}
                  >
                    FAQ
                  </motion.button>
                  <motion.button 
                    onClick={() => scrollToSection('contact')}
                    className={`${activeSection === 'contact' ? 'text-sky-300' : 'text-white'} hover:text-sky-300 transition-colors text-left py-3 text-lg font-medium`}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact
                  </motion.button>
                  <motion.div className="pt-4">
                    <Link to="/volunteer">
                    <motion.div
                      className="w-full py-3 px-4 rounded-full bg-sky-600 hover:bg-sky-500 transition-colors font-medium text-center"
                      whileHover={{ backgroundColor: '#0284c7' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Volunteer
                    </motion.div>
                    </Link>
                  </motion.div>
                  <motion.div className="pt-2">
                    <motion.button 
                      className="w-full py-3 px-4 rounded-full border border-white hover:bg-white hover:text-sky-900 transition-colors font-medium"
                      whileHover={{ backgroundColor: '#ffffff', color: '#0c4a6e' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign Up
                    </motion.button>
                  </motion.div>
                </div>
                
                <div className="mt-auto">
                  <div className="flex space-x-4 pt-6">
                    <motion.a 
                      href="#" 
                      className="bg-sky-700 p-3 rounded-full hover:bg-sky-600 transition-colors"
                      whileHover={{ scale: 1.1, backgroundColor: '#0369a1' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FacebookIcon size={20} className="text-white" />
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="bg-sky-700 p-3 rounded-full hover:bg-sky-600 transition-colors"
                      whileHover={{ scale: 1.1, backgroundColor: '#0369a1' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <TwitterIcon size={20} className="text-white" />
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="bg-sky-700 p-3 rounded-full hover:bg-sky-600 transition-colors"
                      whileHover={{ scale: 1.1, backgroundColor: '#0369a1' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <InstagramIcon size={20} className="text-white" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
      
      {/* Hero Section with Video Background - Keeping this unchanged as requested */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden bg-sky-950">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-950/70 to-sky-950/90"></div>
          <video
            className="absolute w-full h-full object-cover opacity-40"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="https://videos.pexels.com/video-files/9944625/9944625-uhd_2560_1440_24fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Empowering Sri Lankan <span className="text-sky-300">Sports Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Connecting athletes, coaches, and communities to build a stronger sporting nation through the National Olympic Committee of Sri Lanka.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/athletes" className="px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 transition-colors text-white font-bold text-lg">
                Get Started
              </Link>
              <Link to="/signin" className="px-6 py-3 rounded-full border-2 border-white hover:bg-white hover:text-sky-900 transition-colors font-bold text-lg">
                Sign In
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated Scroll Down Indicator */}
       
      </section>
      
      {/* About Us Section with Animation */}
      <motion.section 
        id="about" 
        className="py-20 bg-sky-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              className="md:w-1/2"
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About NOC Connect</h2>
              <div className="h-1 w-20 bg-sky-300 mb-6"></div>
              <p className="text-gray-200 mb-6">
                NOC Connect is an initiative by the National Olympic Committee of Sri Lanka 
                dedicated to the development and elevation of sports throughout the country. 
                Our platform serves as a bridge connecting athletes, coaches, sports officials, 
                and enthusiasts to create a thriving sports ecosystem.
              </p>
              <p className="text-gray-200 mb-8">
                We believe in the power of sports to transform lives, build character, and 
                unite communities. Through various programs, resources, and support systems, 
                we aim to nurture talent from grassroots to elite levels, ensuring Sri Lanka's 
                presence on the global sporting stage.
              </p>
              <motion.div 
                className="grid grid-cols-2 gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.6 }}
              >
                <motion.div 
                  className="bg-sky-800 p-4 rounded-lg"
                  variants={fadeInUp}
                  whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="text-sky-300 text-2xl font-bold">50+</div>
                  <div className="text-sm">Sports Disciplines</div>
                </motion.div>
                <motion.div 
                  className="bg-sky-800 p-4 rounded-lg"
                  variants={fadeInUp}
                  whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="text-sky-300 text-2xl font-bold">1000+</div>
                  <div className="text-sm">Athletes Supported</div>
                </motion.div>
                <motion.div 
                  className="bg-sky-800 p-4 rounded-lg"
                  variants={fadeInUp}
                  whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="text-sky-300 text-2xl font-bold">25+</div>
                  <div className="text-sm">Development Programs</div>
                </motion.div>
                <motion.div 
                  className="bg-sky-800 p-4 rounded-lg"
                  variants={fadeInUp}
                  whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="text-sky-300 text-2xl font-bold">9</div>
                  <div className="text-sm">Olympic Medals</div>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="bg-sky-700 w-64 h-64 md:w-80 md:h-80 rounded-full absolute -top-6 -left-6 z-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                <img 
                  src="https://plus.unsplash.com/premium_photo-1664475361436-e37f6f2ba407?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Sri Lankan athletes training" 
                  className="rounded-lg shadow-xl relative z-10"
                />
                <motion.div 
                  className="bg-sky-500 w-40 h-40 rounded-full absolute -bottom-10 -right-10 z-0"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Leadership Section with Animation */}
      <motion.section 
        id="leadership" 
        className="py-20 bg-sky-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={fadeInUp}
            >
              Our Leadership
            </motion.h2>
            <motion.div 
              className="h-1 w-20 bg-sky-300 mx-auto mb-6"
              variants={fadeInUp}
            ></motion.div>
            <motion.p 
              className="text-gray-200 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Meet the dedicated team guiding the National Olympic Committee of Sri Lanka towards a brighter future for sports development.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {leadershipTeam.map((leader, index) => (
              <motion.div 
                key={index} 
                className="bg-sky-900 rounded-lg overflow-hidden shadow-lg"
                variants={fadeInUp}
                whileHover={{ 
                  y: -10, 
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
                }}
              >
                <img 
                  src={leader.image} 
                  alt={leader.name} 
                  className="w-full h-64 object-cover"
                />
                <motion.div 
                  className="p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: false }}
                >
                  <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                  <p className="text-sky-300 mb-3">{leader.role}</p>
                  <p className="text-gray-300 text-sm">{leader.bio}</p>
                  <p className="text-sky-300 mb-3">{leader.email}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      {/* FAQ Section with Animation */}
      <motion.section 
        id="faq" 
        className="py-20 bg-sky-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={fadeInUp}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.div 
              className="h-1 w-20 bg-sky-300 mx-auto mb-6"
              variants={fadeInUp}
            ></motion.div>
            <motion.p 
              className="text-gray-200 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Find answers to common questions about NOC Connect and our mission to develop sports in Sri Lanka.
            </motion.p>
          </div>
          
          <motion.div 
            className="max-w-3xl mx-auto"
            variants={staggerContainer}
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                className="mb-6 bg-sky-800 rounded-lg overflow-hidden"
                variants={fadeInUp}
                whileHover={{ scale: 1.01 }}
              >
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer">
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                    <motion.span 
                      className="transition-transform group-open:rotate-180"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 0 }}
                    >
                      <ChevronDown size={20} />
                    </motion.span>
                  </summary>
                  <motion.div 
                    className="px-6 pb-6 text-gray-200"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                </details>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      {/* Contact Section with Animation */}
      <motion.section 
        id="contact" 
        className="py-20 bg-sky-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <motion.div 
              className="lg:w-1/2"
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
              <div className="h-1 w-20 bg-sky-300 mb-6"></div>
              <p className="text-gray-200 mb-8">
                Have questions about NOC Connect or want to get involved? Reach out to us using the contact information below or fill out the form.
              </p>
              
              <motion.div 
                className="space-y-6 mb-8"
                variants={staggerContainer}
              >
                <motion.div 
                  className="flex items-start space-x-4"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                >
                  <div className="bg-sky-700 p-3 rounded-full">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Our Location</h3>
                    <p className="text-gray-300">Olympic House, Colombo 07, Sri Lanka</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                >
                  <div className="bg-sky-700 p-3 rounded-full">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Call Us</h3>
                    <p className="text-gray-300">+94 11 2684420</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                >
                  <div className="bg-sky-700 p-3 rounded-full">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email Us</h3>
                    <p className="text-gray-300">info@nocconnect.lk</p>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex space-x-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                <motion.a 
                  href="#" 
                  className="bg-sky-700 p-3 rounded-full hover:bg-sky-600 transition-colors"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.2, backgroundColor: '#0369a1' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FacebookIcon size={24} className="text-white" />
                  </motion.a>
                <motion.a 
                  href="#" 
                  className="bg-sky-700 p-3 rounded-full hover:bg-sky-600 transition-colors"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.2, backgroundColor: '#0369a1' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <TwitterIcon size={24} className="text-white" />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="bg-sky-700 p-3 rounded-full hover:bg-sky-600 transition-colors"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.2, backgroundColor: '#0369a1' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <InstagramIcon size={24} className="text-white" />
                </motion.a>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              variants={fadeInUp}
            >
              <motion.div 
                className="bg-sky-900 p-8 rounded-lg shadow-lg"
                whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              >
                <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-4 py-3 bg-sky-800 border border-sky-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="John Doe"
                      />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium">Your Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-3 bg-sky-800 border border-sky-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="johndoe@example.com"
                      />
                    </motion.div>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full px-4 py-3 bg-sky-800 border border-sky-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="How can we help you?"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium">Your Message</label>
                    <textarea 
                      id="message" 
                      rows="4"
                      className="w-full px-4 py-3 bg-sky-800 border border-sky-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="Type your message here..."
                    ></textarea>
                  </motion.div>
                  <motion.button 
                    type="submit" 
                    className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    whileHover={{ backgroundColor: '#0ea5e9', scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Footer with Animation */}
      <motion.footer 
        className="bg-sky-950 pt-16 pb-8 border-t border-sky-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-10 w-10 bg-sky-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">NOC</span>
                </div>
                <span className="text-xl font-bold text-white">Connect</span>
              </div>
              <p className="text-gray-300 mb-6">
                Empowering Sri Lankan sports excellence through connectivity, resources, and community support.
              </p>
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  className="text-gray-300 hover:text-white"
                  whileHover={{ scale: 1.2, color: '#ffffff' }}
                >
                  <FacebookIcon size={20} />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-300 hover:text-white"
                  whileHover={{ scale: 1.2, color: '#ffffff' }}
                >
                  <TwitterIcon size={20} />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-300 hover:text-white"
                  whileHover={{ scale: 1.2, color: '#ffffff' }}
                >
                  <InstagramIcon size={20} />
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <motion.button 
                    onClick={() => scrollToSection('home')} 
                    className="text-gray-300 hover:text-white flex items-center"
                    whileHover={{ x: 5, color: '#ffffff' }}
                  >
                    <ChevronRight size={16} className="mr-2" /> Home
                  </motion.button>
                </li>
                <li>
                  <motion.button 
                    onClick={() => scrollToSection('about')} 
                    className="text-gray-300 hover:text-white flex items-center"
                    whileHover={{ x: 5, color: '#ffffff' }}
                  >
                    <ChevronRight size={16} className="mr-2" /> About Us
                  </motion.button>
                </li>
                <li>
                  <motion.button 
                    onClick={() => scrollToSection('leadership')} 
                    className="text-gray-300 hover:text-white flex items-center"
                    whileHover={{ x: 5, color: '#ffffff' }}
                  >
                    <ChevronRight size={16} className="mr-2" /> Leadership
                  </motion.button>
                </li>
                <li>
                  <motion.button 
                    onClick={() => scrollToSection('faq')} 
                    className="text-gray-300 hover:text-white flex items-center"
                    whileHover={{ x: 5, color: '#ffffff' }}
                  >
                    <ChevronRight size={16} className="mr-2" /> FAQ
                  </motion.button>
                </li>
                <li>
                  <motion.button 
                    onClick={() => scrollToSection('contact')} 
                    className="text-gray-300 hover:text-white flex items-center"
                    whileHover={{ x: 5, color: '#ffffff' }}
                  >
                    <ChevronRight size={16} className="mr-2" /> Contact
                  </motion.button>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold mb-6">Our Programs</h3>
              <ul className="space-y-3">
                <li>
                  <motion.a 
                    href="#" 
                    className="text-gray-300 hover:text-white flex items-center"
                    whileHover={{ x: 5, color: '#ffffff' }}
                  >
                    <ChevronRight size={16} className="mr-2" /> Athlete Development
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#" 
                    className="text-gray-300 hover:text-white flex items-center"
                    whileHover={{ x: 5, color: '#ffffff' }}
                  >
                    <ChevronRight size={16} className="mr-2" /> Coach Education
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#" 
                    className="text-gray-300 hover:text-white flex items-center"
                    whileHover={{ x: 5, color: '#ffffff' }}
                  >
                    <ChevronRight size={16} className="mr-2" /> Sports Administration
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#" 
                    className="text-gray-300 hover:text-white flex items-center"
                    whileHover={{ x: 5, color: '#ffffff' }}
                  >
                    <ChevronRight size={16} className="mr-2" /> Community Sports
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#" 
                    className="text-gray-300 hover:text-white flex items-center"
                    whileHover={{ x: 5, color: '#ffffff' }}
                  >
                    <ChevronRight size={16} className="mr-2" /> Olympic Solidarity
                  </motion.a>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-bold mb-6">Newsletter</h3>
              <p className="text-gray-300 mb-4">
                Subscribe to our newsletter for the latest updates on Sri Lankan sports.
              </p>
              <form className="mb-4">
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow px-4 py-2 bg-sky-800 border border-sky-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <motion.button 
                    type="submit" 
                    className="bg-sky-500 hover:bg-sky-400 px-4 py-2 rounded-r-lg transition-colors"
                    whileHover={{ backgroundColor: '#0ea5e9' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </form>
              <p className="text-sm text-gray-400">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="border-t border-sky-800 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} NOC Connect. All rights reserved. National Olympic Committee of Sri Lanka.
            </p>
          </motion.div>
        </div>
      </motion.footer>
      
      {/* Scroll to Top Button with Animation */}
      <motion.button 
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 bg-sky-600 text-white p-3 rounded-full shadow-lg hover:bg-sky-500 ${showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        whileHover={{ scale: 1.1, backgroundColor: '#0284c7' }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        initial={{ y: 100 }}
        animate={{ y: showScrollTop ? 0 : 100 }}
      >
        <ArrowUp size={24} />
      </motion.button>
    </div>
  );
}

// Import Framer Motion at the top of the file
export default HomePage;