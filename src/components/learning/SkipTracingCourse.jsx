import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Clock, CheckCircle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SkipTracingCourse = () => {
  const navigate = useNavigate();
  const [completedModules, setCompletedModules] = useState(new Set());
  const [prerequisites, setPrerequisites] = useState(new Set());
  const [currentModule, setCurrentModule] = useState(null);

  const modules = [
    {
      id: 1,
      title: "Skip Tracing Fundamentals",
      duration: "50 minutes",
      description: "What is skip tracing? Learn the basics, benefits for real estate investors, and what quality skip trace data looks like.",
      isUnlocked: true,
      isCompleted: completedModules.has(1),
    },
    {
      id: 2,
      title: "Receiving & Evaluating Skip Trace Data",
      duration: "40 minutes",
      description: "Understand what to expect from skip trace providers, how to evaluate data quality, and identify the best leads.",
      isUnlocked: completedModules.has(1),
      isCompleted: completedModules.has(2),
    },
    {
      id: 3,
      title: "Outreach Strategy",
      duration: "50 minutes",
      description: "Develop multi-channel outreach campaigns, craft compelling messages, and time your contact attempts.",
      isUnlocked: completedModules.has(2),
      isCompleted: completedModules.has(3),
    },
    {
      id: 4,
      title: "Legal Compliance",
      duration: "30 minutes",
      description: "Understand TCPA, DNC regulations, and best practices for compliant lead outreach.",
      isUnlocked: completedModules.has(3),
      isCompleted: completedModules.has(4),
    },
    {
      id: 5,
      title: "Lead Conversion",
      duration: "40 minutes",
      description: "Convert qualified leads to appointments and sales through proven conversation frameworks.",
      isUnlocked: completedModules.has(4),
      isCompleted: completedModules.has(5),
    },
  ];

  const workflowSteps = [
    {
      number: 1,
      title: "Pull or Create Your Property List",
      description: "Generate your property owner list using any list provider. We recommend PropStream for comprehensive property databases and search capabilities."
    },
    {
      number: 2,
      title: "Skip Trace the Data to Find Contact Information",
      description: "Upload your property list to a skip tracing service to get phone numbers and email addresses. We recommend SkipMatrix with our discount code \"STACKED\"."
    },
    {
      number: 3,
      title: "Format and Upload Your File",
      description: "Format your CSV/Excel file with the required columns (name, phone, address). Upload through the STACKED client import page - you are responsible for proper file formatting."
    },
    {
      number: 4,
      title: "System Loads Contacts into Dialer",
      description: "STACKED automatically processes your uploaded file and populates the dialer interface with your contacts, ready for calling."
    },
    {
      number: 5,
      title: "Start Calling with Built-in Dialer",
      description: "Use the professional dialer interface with Twilio integration to systematically call through your contact list."
    },
    {
      number: 6,
      title: "Tag Outcomes During Calls",
      description: "Apply quick tags like \"No Answer\", \"Voicemail\", \"Interested\", \"Not Interested\", \"Callback\", or \"Wrong Number\" to categorize each call result."
    },
    {
      number: 7,
      title: "Convert Qualified Leads",
      description: "Click \"Turn Lead into Client\" for interested prospects to create full CRM client records with deal tracking capabilities."
    },
    {
      number: 8,
      title: "Manage Deals in CRM",
      description: "Track converted clients through your sales pipeline, schedule follow-ups, and manage deals to closing."
    }
  ];

  const prerequisitesList = [
    "STACKED CRM system set up and accessible",
    "Access to skip tracing provider like SkipMatrix",
    "Sample property list for skip tracing",
    "Twilio account for dialer integration",
    "Basic understanding of real estate investing",
    "Compliance training materials reviewed",
    "Sales scripts and templates prepared",
    "Calendar system for appointment booking"
  ];

  const resources = [
    {
      title: "📊 Skip Trace Data Guide",
      description: "Visual guide showing what quality skip trace data looks like and how to read confidence scores."
    },
    {
      title: "🤝 Partner Provider Directory",
      description: "List of recommended skip tracing companies including SkipMatrix with STACKED discount codes."
    },
    {
      title: "📧 Email Templates",
      description: "Proven email templates for different types of real estate lead outreach."
    },
    {
      title: "📞 Call Scripts",
      description: "Cold calling scripts optimized for skip traced real estate leads."
    },
    {
      title: "⚖️ Compliance Checklist",
      description: "Legal compliance checklist for TCPA, CAN-SPAM, and state regulations."
    },
    {
      title: "📈 ROI Calculator",
      description: "Spreadsheet to track lead costs, conversion rates, and campaign ROI."
    }
  ];

  const benefits = [
    {
      title: "📞 Contact Hard-to-Reach Owners",
      description: "Reach property owners who aren't listed in public records or have outdated information."
    },
    {
      title: "🚫 Target Distressed Properties",
      description: "Find owners of vacant, foreclosure, or inherited properties - often motivated sellers."
    },
    {
      title: "🗺 Locate Out-of-State Owners",
      description: "Connect with property owners who live far from their investment properties."
    },
    {
      title: "💰 Higher Success Rates",
      description: "Skip traced leads often convert better than cold calling from public records."
    }
  ];

  const handleModuleToggle = (moduleId) => {
    setCompletedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
        // Lock subsequent modules
        for (let i = moduleId + 1; i <= modules.length; i++) {
          newSet.delete(i);
        }
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const handlePrerequisiteToggle = (index) => {
    setPrerequisites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleModuleClick = (module) => {
    if (module.isUnlocked) {
      // Show the module content within the course
      setCurrentModule(module);
    } else {
      alert('Complete the previous modules to unlock this one!');
    }
  };

  const handleCompleteModule = (moduleId) => {
    setCompletedModules(prev => {
      const newSet = new Set(prev);
      newSet.add(moduleId);
      // Save to localStorage for persistence
      localStorage.setItem('skipTracingCompleted', JSON.stringify([...newSet]));
      return newSet;
    });
    // Return to course overview
    setCurrentModule(null);
  };

  const handleBackToCourse = () => {
    setCurrentModule(null);
  };

  // Check if user completed a module (this would be called from the module HTML files)
  const markModuleCompleted = (moduleId) => {
    setCompletedModules(prev => {
      const newSet = new Set(prev);
      newSet.add(moduleId);
      // Save to localStorage for persistence
      localStorage.setItem('skipTracingCompleted', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  // Expose the completion function globally so module HTML files can call it
  useEffect(() => {
    window.markModuleCompleted = markModuleCompleted;
    window.returnToCourse = () => {
      window.location.href = '/realestate/learning/skip-tracing-course';
    };
    return () => {
      delete window.markModuleCompleted;
      delete window.returnToCourse;
    };
  }, []);

  // Check for completion when component mounts (in case user returns from a module)
  useEffect(() => {
    const checkCompletion = () => {
      // Check if user completed any modules (this could be stored in localStorage or sessionStorage)
      const completed = JSON.parse(localStorage.getItem('skipTracingCompleted') || '[]');
      if (completed.length > 0) {
        setCompletedModules(new Set(completed));
      }
    };
    checkCompletion();
  }, []);

  const totalModules = modules.length;
  const completedCount = completedModules.size;
  const progressPercentage = (completedCount / totalModules) * 100;

  // If a module is selected, show the module content
  if (currentModule) {
    return (
      <div className="min-h-screen text-white" style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        lineHeight: '1.6'
      }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {/* Module Header */}
          <div className="text-center mb-12 p-8 rounded-2xl" style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <div className="w-16 h-16 mx-auto mb-6 rounded-lg flex items-center justify-center text-2xl font-bold" style={{ background: '#00D4AA' }}>
              {currentModule.id}
            </div>
            <h1 className="text-4xl font-bold mb-4">Module {currentModule.id}: {currentModule.title}</h1>
            <div className="inline-block px-6 py-3 rounded-full text-lg font-semibold mb-6" style={{ background: '#00D4AA', color: '#1e3a5f' }}>
              {currentModule.duration}
            </div>
            <p className="text-lg mb-6" style={{ color: '#B0C4DE' }}>
              {currentModule.description}
            </p>
          </div>

          {/* Module Content - Exact HTML Design */}
          <div className="mb-12 p-12 rounded-2xl" style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <h2 className="text-4xl font-bold mb-8" style={{ color: '#00D4AA' }}>Module {currentModule.id} Content</h2>

            {/* Tip Box - What is Skip Tracing */}
            <div className="p-8 rounded-2xl mb-8" style={{
              background: 'rgba(255, 107, 53, 0.2)',
              border: '2px solid #FF6B35',
              borderRadius: '15px'
            }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#FF6B35' }}>🎯 What You'll Learn in This Module</h3>
              <p className="text-lg mb-4" style={{ color: '#E6F3FF' }}>
                In this module, you'll dive deep into {currentModule.title.toLowerCase()}. You'll understand the core concepts,
                practical applications, and real-world scenarios that will help you master this essential skill.
              </p>
              <p className="text-lg" style={{ color: '#E6F3FF' }}>
                <strong>Key Focus:</strong> {currentModule.description}
              </p>
            </div>

            {/* Learning Objectives */}
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#FFD700' }}>Learning Objectives</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#00D4AA' }}>📚 Core Concepts</h4>
                <ul className="space-y-2" style={{ color: '#E6F3FF' }}>
                  <li>• Master the fundamental principles</li>
                  <li>• Understand best practices and methodologies</li>
                  <li>• Learn industry standards and compliance</li>
                  <li>• Develop practical skills and techniques</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#00D4AA' }}>🎯 Practical Applications</h4>
                <ul className="space-y-2" style={{ color: '#E6F3FF' }}>
                  <li>• Apply concepts in real-world scenarios</li>
                  <li>• Practice with hands-on exercises</li>
                  <li>• Develop problem-solving skills</li>
                  <li>• Build confidence through repetition</li>
                </ul>
              </div>
            </div>

            {/* Key Topics */}
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#FFD700' }}>Key Topics Covered</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-xl text-center" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#00D4AA' }}>📊 Topic 1</h4>
                <p className="text-sm" style={{ color: '#E6F3FF' }}>Detailed explanation of the first key concept with practical examples</p>
              </div>
              <div className="p-6 rounded-xl text-center" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#00D4AA' }}>🔧 Topic 2</h4>
                <p className="text-sm" style={{ color: '#E6F3FF' }}>Detailed explanation of the second key concept with real-world applications</p>
              </div>
              <div className="p-6 rounded-xl text-center" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#00D4AA' }}>⚡ Topic 3</h4>
                <p className="text-sm" style={{ color: '#E6F3FF' }}>Advanced techniques and optimization strategies</p>
              </div>
            </div>

            {/* Practical Exercises */}
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#FFD700' }}>Practical Exercises</h3>
            <div className="space-y-6 mb-8">
              <div className="p-6 rounded-xl border-l-4" style={{ borderColor: '#00D4AA', background: 'rgba(255, 255, 255, 0.1)' }}>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#00D4AA' }}>Exercise 1: Hands-On Practice</h4>
                <p className="text-sm mb-4" style={{ color: '#E6F3FF' }}>Complete this hands-on exercise to practice the concepts you've learned. Follow the step-by-step instructions and apply your knowledge.</p>
                <div className="p-4 rounded-lg" style={{ background: 'rgba(0, 212, 170, 0.2)' }}>
                  <p className="text-sm font-semibold" style={{ color: '#00D4AA' }}>Instructions:</p>
                  <ol className="list-decimal list-inside mt-2 space-y-1" style={{ color: '#E6F3FF' }}>
                    <li>Review the provided materials</li>
                    <li>Follow the step-by-step process</li>
                    <li>Apply the concepts learned</li>
                    <li>Document your results</li>
                  </ol>
                </div>
              </div>

              <div className="p-6 rounded-xl border-l-4" style={{ borderColor: '#00D4AA', background: 'rgba(255, 255, 255, 0.1)' }}>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#00D4AA' }}>Exercise 2: Real-World Application</h4>
                <p className="text-sm mb-4" style={{ color: '#E6F3FF' }}>Apply your knowledge in a real-world scenario. This exercise will help you build confidence and practical skills.</p>
                <div className="p-4 rounded-lg" style={{ background: 'rgba(0, 212, 170, 0.2)' }}>
                  <p className="text-sm font-semibold" style={{ color: '#00D4AA' }}>Scenario:</p>
                  <p className="text-sm mt-2" style={{ color: '#E6F3FF' }}>Use the concepts learned to solve a practical problem in a simulated real-world environment.</p>
                </div>
              </div>
            </div>

            {/* Success Box */}
            <div className="p-8 rounded-2xl text-center font-bold text-lg" style={{
              background: 'linear-gradient(135deg, #00D4AA, #00B894)',
              color: 'white'
            }}>
              Complete this module to unlock the next one and continue your learning journey! 🚀
            </div>
          </div>

          {/* Module Actions */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBackToCourse}
              className="flex items-center px-6 py-3 rounded-xl font-semibold transition-all"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#B0C4DE',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Course
            </button>

            <button
              onClick={() => handleCompleteModule(currentModule.id)}
              className="px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #00D4AA, #00B894)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(0, 212, 170, 0.3)'
              }}
            >
              Complete Module
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white" style={{
      background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: '1.6'
    }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header Section */}
        <div className="text-center mb-16 p-12 rounded-2xl" style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="w-16 h-16 mx-auto mb-8 rounded-lg flex items-center justify-center text-2xl font-bold" style={{ background: '#FF6B35' }}>
            🎯
          </div>
          <h1 className="text-5xl font-bold mb-6">Skip Tracing to Sales</h1>
          <div className="inline-block px-6 py-3 rounded-full text-lg font-semibold mb-8" style={{ sckground: '#00D4AA', color: '#1e3a5f' }}>
            Complete Lead Management Course
          </div>
          <p className="text-lg mb-8" style={{ color: '#B0C4DE', maxWidth: '600px', margin: '0 auto 40px' }}>
            Learn what skip tracing is, how it benefits real estate investors, and master the process from receiving skip trace data to converting leads into closed sales.
          </p>
          <div className="inline-block px-8 py-4 rounded-full font-semibold" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            5 modules • 3.5 hours
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-12 p-8 rounded-2xl" style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#00D4AA' }}>Your Progress</h2>
          <div className="rounded-lg p-1 mb-4" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
            <div
              className="h-6 rounded-md flex items-center justify-center text-sm font-bold text-white transition-all"
              style={{
                width: `${progressPercentage}%`,
                background: 'linear-gradient(90deg, #00D4AA, #00B894)'
              }}
            >
              {Math.round(progressPercentage)}% Complete
            </div>
          </div>
          <p className="text-center" style={{ color: '#B0C4DE' }}>Complete each module to unlock the next one</p>
        </div>

        {/* Skip Tracing Benefits */}
        <div className="mb-12 p-8 rounded-2xl" style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="p-6 rounded-xl mb-8" style={{
            background: 'rgba(255, 107, 53, 0.2)',
            border: '2px solid #FF6B35'
          }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#FF6B35' }}>🎯 What is Skip Tracing?</h3>
            <p className="mb-4" style={{ color: '#E6F3FF' }}>
              Skip tracing is the process of finding contact information for property owners when public records don't have current phone numbers or addresses. Professional skip tracers use databases, social media, and investigative techniques to locate updated contact details.
            </p>
            <p style={{ color: '#E6F3FF' }}>
              <strong>Perfect for:</strong> Vacant properties, out-of-state owners, inherited properties, and distressed situations where owners are hard to reach.
            </p>
          </div>

          <h3 className="text-2xl font-bold mb-6" style={{ color: '#FFD700' }}>Why Skip Tracing is a Game-Changer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-6 rounded-xl text-center" style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#00D4AA' }}>{benefit.title}</h4>
                <p className="text-sm" style={{ color: '#E6F3FF' }}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Course Modules */}
        <div className="mb-12 p-8 rounded-2xl" style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#00D4AA' }}>Course Modules</h2>
          <p className="mb-8" style={{ color: '#E6F3FF' }}>Master each stage of the lead management process:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div
                key={module.id}
                onClick={() => handleModuleClick(module)}
                className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${module.isUnlocked
                    ? 'hover:bg-white/15'
                    : 'opacity-60 cursor-not-allowed'
                  }`}
                style={{
                  background: module.isUnlocked ? 'rgba(255, 255, 255, 0.1)' : 'rgba(100, 100, 100, 0.2)',
                  border: module.isUnlocked ? '2px solid #00D4AA' : '2px solid #666'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-2xl">
                    {module.isCompleted ? '✅' : module.isUnlocked ? '▶' : '🔒'}
                  </div>
                  <input
                    type="checkbox"
                    checked={module.isCompleted}
                    onChange={() => handleModuleToggle(module.id)}
                    disabled={!module.isUnlocked}
                    className="w-5 h-5"
                    style={{ transform: 'scale(1.5)' }}
                  />
                </div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: '#FFD700' }}>
                  Module {module.id}: {module.title}
                </h4>
                <div className="text-sm mb-3" style={{ color: '#B0C4DE' }}>
                  {module.duration}
                </div>
                <p className="text-sm" style={{ color: '#E6F3FF' }}>
                  {module.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Workflow */}
        <div className="mb-12 p-8 rounded-2xl" style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#00D4AA' }}>Complete Skip Trace to Sales Workflow</h2>
          <p className="mb-8" style={{ color: '#E6F3FF' }}>Follow this step-by-step process using STACKED CRM:</p>

          <div className="space-y-6">
            {workflowSteps.map((step) => (
              <div key={step.number} className="flex items-start p-6 rounded-xl" style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderLeft: '4px solid #00D4AA'
              }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold mr-6 flex-shrink-0" style={{
                  background: '#00D4AA',
                  color: '#1e3a5f'
                }}>
                  {step.number}
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2" style={{ color: '#FFD700' }}>{step.title}</h4>
                  <p style={{ color: '#E6F3FF' }}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prerequisites Checklist */}
        <div className="mb-12 p-8 rounded-2xl" style={{
          background: 'rgba(255, 215, 0, 0.1)',
          border: '2px solid #FFD700'
        }}>
          <h3 className="text-2xl font-bold mb-6" style={{ color: '#FFD700' }}>📋 Prerequisites Checklist</h3>
          <p className="mb-6" style={{ color: '#E6F3FF' }}>Complete these items before starting the course:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prerequisitesList.map((prereq, index) => (
              <div key={index} className="flex items-center p-4 rounded-lg" style={{
                background: 'rgba(255, 255, 255, 0.1)'
              }}>
                <input
                  type="checkbox"
                  checked={prerequisites.has(index)}
                  onChange={() => handlePrerequisiteToggle(index)}
                  className="w-5 h-5 mr-4"
                  style={{ transform: 'scale(1.3)' }}
                />
                <label className="text-sm" style={{ color: '#E6F3FF' }}>{prereq}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Resources */}
        <div className="mb-12 p-8 rounded-2xl" style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#00D4AA' }}>Course Tools & Resources</h2>
          <p className="mb-8" style={{ color: '#E6F3FF' }}>Downloads and tools you'll use throughout the course:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <div key={index} className="p-6 rounded-xl text-center" style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#00D4AA' }}>{resource.title}</h4>
                <p className="text-sm" style={{ color: '#E6F3FF' }}>{resource.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Box */}
        <div className="mb-12 p-8 rounded-2xl text-center font-bold text-lg" style={{
          background: 'linear-gradient(135deg, #FF6B35, #E55533)',
          color: 'white'
        }}>
          ⚠️ Important: Always comply with local, state, and federal regulations when contacting leads!
        </div>

        {/* Success Message */}
        <div className="mb-12 p-8 rounded-2xl text-center font-bold text-lg" style={{
          background: 'linear-gradient(135deg, #00D4AA, #00B894)',
          color: 'white'
        }}>
          Master this process = Higher conversion rates + More closed deals! 🏆
        </div>

        {/* Footer */}
        <div className="text-center p-8 rounded-2xl" style={{
          background: 'rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{ color: '#B0C4DE' }}>STACKED • Real Estate CRM • Lead Management Mastery Series</p>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate('/realestate/learning')}
            className="flex items-center text-sky-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipTracingCourse;
