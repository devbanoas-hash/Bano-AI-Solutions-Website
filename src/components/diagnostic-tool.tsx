import { useState, useEffect } from 'react';
import Hero from './diagnostic-tool/Hero';
import IndustrySelector from './diagnostic-tool/IndustrySelector';
import PainPoints from './diagnostic-tool/PainPoints';
import LeadForm from './diagnostic-tool/LeadForm';
import Roadmap from './diagnostic-tool/Roadmap';
import type { UserState, IndustryData } from './diagnostic-tool/types';
import { industries } from '../constants/diagnostic.constant';

const DiagnosticTool = () => {
    const [userState, setUserState] = useState<UserState>({
        step: 0,
        selectedIndustryId: null,
        confirmedPainPoints: [],
        phoneNumber: '',
        companyName: '',
        companySize: '',
    });

    const [isExpanded, setIsExpanded] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [isHovered, setIsHovered] = useState(false); 
    const [isStarting, setIsStarting] = useState(false);

    // Sync expansion state with step
    useEffect(() => {
        if (userState.step > 0) {
            setIsExpanded(true);
            setTimeout(() => setShowContent(true), 400); 
        }
        else {
            setShowContent(false);
            setTimeout(() => setIsExpanded(false), 200);
        }
    }, [userState.step]);

    const getIndustryData = (id: string | null): IndustryData | undefined => {
        return industries.find(ind => ind.id === id);
    };

    const currentIndustry = getIndustryData(userState.selectedIndustryId);

    // Handlers
    const handleStart = () => {
        setIsStarting(true);
        setTimeout(() => {
            setUserState((prev: UserState) => ({ ...prev, step: 1 }));
            setIsStarting(false);
        }, 300);
    };
    
    const handleIndustrySelect = (id: string, companyName: string, companySize: string) => setUserState((prev: UserState) => ({ ...prev, selectedIndustryId: id, companyName: companyName, companySize: companySize, step: 2 }));
    const handleBackToIndustries = () => setUserState((prev: UserState) => ({ ...prev, selectedIndustryId: null, step: 1 }));
    const handlePainPointConfirm = (points: string[]) => setUserState((prev: UserState) => ({ ...prev, confirmedPainPoints: points, step: 3 }));
    const handleLeadSubmit = (phone: string) => setUserState((prev: UserState) => ({ ...prev, phoneNumber: phone, step: 4 }));
    
    const handleReset = () => {
        setUserState({
            step: 0,
            selectedIndustryId: null,
            confirmedPainPoints: [],
            phoneNumber: '',
            companyName: '',
            companySize: '',
        });
    };

    // Logic to determine Modal Size based on Step
    const getModalDimensions = () => {
        if (!isExpanded) {
            // Button State - Slightly rounded square, White Glow, Standout
            // Updated: Smaller size (200x56), Pure White Border, intense multi-layer glow
            return 'w-[200px] h-[56px] rounded-full hover:scale-105 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.5),0_0_40px_rgba(16,185,129,0.3)] border-2 border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.6),0_0_60px_rgba(16,185,129,0.8)] translate-y-[20vh]';
        }
        
        if (userState.step === 4) {
            // Roadmap State
            return 'w-[90vw] max-w-[1600px] rounded-3xl border-green-400/30';
        }

        // Standard State (Selector, Form, etc.)
        return 'w-[95%] max-w-2xl h-[85vh] max-h-[700px] rounded-3xl border border-bano-green shadow-[0_0_40px_rgba(49,180,80,0.3)] shadow-bano-green';
    };

    return (
        <section className="relative py-28 md:py-32 min-h-screen w-full overflow-visible selection:bg-bano-green selection:text-white">        
            {/* 1. Background Layer */}
            <Hero isExpanded={isExpanded} isHovered={isHovered} />

            {/* 2. Main Interaction Layer */}
            <div className="relative z-10 flex items-center justify-center min-h-screen pointer-events-none">
                
                {/* NEW EXTERNAL CURSOR - Only visible when NOT expanded */}
                {!isExpanded && (
                    // Adjusted position: closer to button (-translate-x-[135px])
                    <div className="absolute z-[60] top-1/2 left-1/2 -translate-x-[135px] translate-y-[20vh] pointer-events-none transition-all duration-500 ease-out opacity-100">
                        {/* Adjusted Animation: cursor-click instead of float */}
                        <div className="animate-cursor-click">
                            {/* Modern Glow Cursor - Pointing towards the button (Right) */}
                            <div className="relative transform rotate-[100deg]">                             
                                {/* Outer Glow Layer */}
                                <div className="absolute inset-0 bg-green-400 blur-[15px] opacity-40 rounded-full"></div>
                                
                                {/* Main Cursor Shape */}
                                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" 
                                    className="drop-shadow-[0_0_10px_rgba(16,185,129,0.8)] filter">
                                    {/* Aerodynamic Arrow Shape */}
                                    <path d="M4 4L38 18L22 22L18 38L4 4Z" fill="white" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}

                {/* The Morphing Card/Button */}
                <div 
                    className={`
                        relative overflow-hidden pointer-events-auto flex flex-col transition-all duration-700 ease-morph
                        ${getModalDimensions()}
                        ${!isExpanded ? 'bg-gradient-to-r from-green-500 to-green-400 backdrop-blur-xl' : ''} 
                        ${isStarting ? 'scale-90 brightness-150' : ''}
                    `}
                    onClick={() => !isExpanded && handleStart()}
                    onMouseEnter={() => !isExpanded && setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Click Flash Effect */}
                    <div className={`absolute inset-0 bg-white transition-opacity duration-300 pointer-events-none ${isStarting ? 'opacity-50' : 'opacity-0'}`}></div>

                    {/* Button Specific Styling (Glows/Sheen) */}
                    {!isExpanded && (
                        <>
                            {/* Stronger Internal Glow */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-green-500 opacity-100"></div>
                            {/* Moving Glint */}
                            <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/70 to-transparent transform skew-x-12 animate-shine group-hover:animate-none"></div>
                        </>
                    )}
                    
                    {/* STATE 0: The "Create Roadmap" Button Content */}
                    <div className={`
                        absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300
                        ${isExpanded ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'}
                    `}>
                        <span className="text-lg font-bold tracking-widest text-white uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]">
                            Tạo lộ trình
                        </span>
                        {/* REMOVED INTERNAL MOUSE POINTER */}
                    </div>

                    {/* STATE 1+: The Application Content */}
                    <div className={`
                        flex-1 flex flex-col min-h-0 w-full p-6 md:p-8 transition-opacity duration-500 delay-100
                        ${showContent ? 'opacity-100 visible' : 'opacity-0 invisible'}
                    `}>
                        {/* Progress Bar */}
                        {userState.step > 0 && userState.step < 4 && (
                            <div className="flex justify-center gap-2 mb-6 shrink-0">
                            {[1, 2, 3].map((s) => (
                                <div 
                                key={s} 
                                className={`h-1 rounded-full transition-all duration-500 ${
                                    userState.step >= s ? 'w-8 bg-green-400 shadow-[0_0_10px_#34d399]' : 'w-2 bg-slate-800'
                                }`}
                                />
                            ))}
                            </div>
                        )}

                        {/* Content Switching */}
                        <div className="flex-1 min-h-0 relative">
                            {userState.step === 1 && (
                                <IndustrySelector onSelect={handleIndustrySelect} />
                            )}
                            
                            {userState.step === 2 && currentIndustry && (
                                <PainPoints
                                    industry={currentIndustry}
                                    onConfirm={handlePainPointConfirm}
                                    onBack={handleBackToIndustries}
                                />
                            )}

                            {userState.step === 3 && (
                                <div className="h-full flex items-center justify-center">
                                    <LeadForm onSubmit={handleLeadSubmit} isSubmitting={false} />
                                </div>
                            )}

                            {userState.step === 4 && currentIndustry && (
                                <Roadmap 
                                    industry={currentIndustry}
                                    userState={userState} 
                                    onReset={handleReset} 
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            <style>{`
                @keyframes shine {
                    0% { left: -100%; }
                    20% { left: 200%; }
                    100% { left: 200%; }
                }
                .animate-shine {
                    animation: shine 4s infinite linear;
                }
                
                @keyframes cursor-click {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(8px, 2px); } /* Slight diagonal push towards the button */
                }
                .animate-cursor-click {
                    animation: cursor-click 1.2s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}
 
export default DiagnosticTool;