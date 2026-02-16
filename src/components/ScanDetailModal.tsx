import React from 'react';
import { X, Calendar, Clock, Brain, Wind, Activity, Heart, Sun } from 'lucide-react';
import { ScanHistoryItem } from '../services/historyService';

interface ScanDetailModalProps {
    scan: ScanHistoryItem;
    onClose: () => void;
}

const ScanDetailModal: React.FC<ScanDetailModalProps> = ({ scan, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[85vh]">

                {/* Header */}
                <div className="bg-[#f6f8f6] p-5 border-b border-slate-100 flex justify-between items-center shrink-0">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(scan.timestamp).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                            <Clock className="w-3 h-3" />
                            {new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tracking Vibe */}
                {scan.vibe && (
                    <div className="bg-white p-6 pb-2 text-center shrink-0">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#13ec13]/10 rounded-full">
                            <span className="text-2xl font-bold text-[#13ec13]">{scan.vibe}</span>
                        </div>
                    </div>
                )}

                {/* Scrollable Body */}
                <div className="p-6 pt-2 overflow-y-auto space-y-6">

                    {/* Insight */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-2 mb-2 text-[#13ec13] text-xs font-bold uppercase tracking-wider">
                            <Brain className="w-4 h-4" />
                            AI Insight
                        </div>
                        <p className="text-slate-700 font-medium italic leading-relaxed">
                            "{scan.insight}"
                        </p>
                    </div>

                    {/* Micro Actions (if available) */}
                    {scan.microActions && scan.microActions.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recommended Actions</h4>
                            {scan.microActions.map((action, i) => (
                                <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                                    <div className="w-6 h-6 rounded-full bg-[#13ec13]/10 flex items-center justify-center text-[#13ec13] mt-0.5 shrink-0">
                                        <span className="text-xs font-bold">{i + 1}</span>
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-700">{action.text}</div>
                                        <div className="text-xs text-slate-500 mt-1">{action.instruction}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Scan Details Grid */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <Activity className="w-3.5 h-3.5" />
                                Body Scan
                            </div>
                            <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                {scan.body}
                            </p>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <Heart className="w-3.5 h-3.5" />
                                Heart Scan
                            </div>
                            <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                {scan.heart}
                            </p>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <Sun className="w-3.5 h-3.5" />
                                Environment
                            </div>
                            <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                {scan.environment}
                            </p>
                        </div>

                        {scan.breathAction && (
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    <Wind className="w-3.5 h-3.5" />
                                    Breath Action
                                </div>
                                <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    {scan.breathAction}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Quote */}
                    {scan.upliftingQuote && (
                        <div className="text-center pt-4 border-t border-slate-100">
                            <p className="text-xs text-slate-400 italic">"{scan.upliftingQuote}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScanDetailModal;
