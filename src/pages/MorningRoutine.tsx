import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Droplets, Wind, ArrowRight, CheckCircle2, Activity } from 'lucide-react';
import Header from '../components/Header';

const MorningRoutine: React.FC = () => {
    const navigate = useNavigate();
    const [steps, setSteps] = React.useState([
        { id: 1, text: 'Hydration: Drink a glass of water', icon: <Droplets className="w-5 h-5" />, completed: false },
        { id: 2, text: 'Light: 5 minutes of sunlight', icon: <Sun className="w-5 h-5" />, completed: false },
        { id: 3, text: 'Movement: 2-minute light stretch', icon: <Activity className="w-5 h-5" />, completed: false },
        { id: 4, text: 'Breath: 3 deep conscious breaths', icon: <Wind className="w-5 h-5" />, completed: false },
    ]);
    const [showSuccess, setShowSuccess] = React.useState(false);

    const toggleStep = (id: number) => {
        setSteps(steps.map(step =>
            step.id === id ? { ...step, completed: !step.completed } : step
        ));
    };

    const handleComplete = () => {
        setShowSuccess(true);
        setTimeout(() => {
            navigate('/transition');
        }, 1500);
    };

    const allCompleted = steps.every(step => step.completed);

    return (
        <div className="bg-[#f6f8f6] font-sans text-slate-800 min-h-screen flex flex-col items-center">
            <div className="w-full max-w-[430px] bg-white min-h-screen relative flex flex-col shadow-xl overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2670&auto=format&fit=crop"
                        alt="Morning sunrise"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#102210]/30 via-transparent to-[#102210]/40" />
                </div>

                {/* Header */}
                <Header title="KOZENDO" transparent dark />

                {/* Main Content */}
                <main className="relative z-10 flex-1 px-6 pt-8 flex flex-col">
                    <section className="mb-8 font-sans">
                        <p className="text-[#13ec13] font-bold tracking-widest uppercase text-xs mb-2">Morning Ritual</p>
                        <h1 className="text-3xl text-white font-light leading-tight">
                            Awaken your <span className="font-bold">Senses.</span>
                        </h1>
                        <p className="text-white/60 text-sm mt-2">Before we dive deep, let's ground ourselves in the present moment.</p>
                    </section>

                    {/* Ritual Checklist */}
                    <div className="space-y-4">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                onClick={() => toggleStep(step.id)}
                                className={`group p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${step.completed
                                    ? 'bg-white/95 border-[#13ec13] shadow-[0_0_15px_rgba(19,236,19,0.2)]'
                                    : 'bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${step.completed ? 'bg-[#13ec13] text-white' : 'bg-white/20 text-white'
                                    }`}>
                                    {step.completed ? <CheckCircle2 className="w-6 h-6" /> : step.icon}
                                </div>
                                <div className="flex-1">
                                    <p className={`text-sm font-medium transition-colors ${step.completed ? 'text-slate-900' : 'text-white'
                                        }`}>
                                        {step.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Hint */}
                    <div className="mt-auto pb-32 text-center">
                        <p className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase">
                            {allCompleted ? 'Ready to begin' : 'Complete your ritual to proceed'}
                        </p>
                    </div>
                </main>

                {/* Bottom Action Bar */}
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-6 pb-8 pt-4 bg-gradient-to-t from-black/20 to-transparent z-40">
                    {showSuccess ? (
                        <div className="w-full bg-[#13ec13] text-slate-900 font-bold py-4 rounded-2xl shadow-lg shadow-[#13ec13]/30 flex items-center justify-center animate-in zoom-in duration-300">
                            You're all set for a great day!
                        </div>
                    ) : (
                        <button
                            onClick={handleComplete}
                            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${allCompleted
                                ? 'bg-[#13ec13] text-slate-900 shadow-[#13ec13]/30'
                                : 'bg-white/10 text-white/40 backdrop-blur-md border border-white/10 cursor-not-allowed'
                                }`}
                            disabled={!allCompleted}
                        >
                            <span>Ritual Completed</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MorningRoutine;
