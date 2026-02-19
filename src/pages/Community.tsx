import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import { getCountryDisplay } from '../constants/countries';

interface Post {
    id: string;
    user_id: string;
    vibe: string;
    reflection: string;
    created_at: string;
    profiles: {
        display_name: string;
        avatar_url: string;
        country: string;
    };
}

const Community: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const { t, i18n } = useTranslation();
    const { profile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('posts')
                    .select(`
            *,
            profiles:user_id (
              display_name,
              avatar_url,
              country
            )
          `)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setPosts(data || []);
            } catch (err) {
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const getVibeEmoji = (vibeId: string) => {
        const vibes: Record<string, string> = {
            hopeful: '✨',
            happy: '😊',
            calm: '😌',
            neutral: '😐',
            thoughtful: '🤔',
            sad: '😔',
            stressed: '😤'
        };
        return vibes[vibeId] || '✨';
    };

    const getTimeAgo = (dateString: string) => {
        const now = new Date();
        const past = new Date(dateString);
        const diffInMs = now.getTime() - past.getTime();
        const diffInMins = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

        if (diffInMins < 60) return `${diffInMins} mins ago`;
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        return past.toLocaleDateString();
    };

    return (
        <div className="bg-[#f6f8f6] font-sans text-slate-800 min-h-screen flex flex-col items-center overflow-hidden">
            <div className="w-full max-w-[430px] bg-white h-screen relative flex flex-col shadow-xl overflow-hidden">
                {/* Background Image with Overlay - Match Wellness Scan */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
                        alt="Misty forest"
                        className="w-full h-full object-cover brightness-[0.7]"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                </div>

                {/* Header Navigation - App Standard */}
                <Header title={t('common.app_name')} transparent dark />

                <main className="flex-1 px-4 py-2 pb-24 overflow-y-auto no-scrollbar">
                    {/* My Current Vibe Section - Strict Match */}
                    <div className="mb-8 fade-in-up">
                        <div className="flex items-center justify-between mb-2 px-2">
                            <h2 className="text-xs font-bold text-white/80 uppercase tracking-widest">{t('community.my_vibe')}</h2>
                        </div>
                        <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-3.5 flex items-center justify-between shadow-lg relative overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="relative">
                                    {profile ? (
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full border-2 border-primary shadow-sm overflow-hidden bg-white/20 flex items-center justify-center">
                                                {profile.avatar_url.startsWith('http') ? (
                                                    <img src={profile.avatar_url} alt="My Avatar" className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-xl">{profile.avatar_url}</span>
                                                )}
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white/20">
                                                <span className="material-icons-outlined text-[8px]">check</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <div
                                                className="w-10 h-10 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-white/40 cursor-pointer"
                                                onClick={() => navigate('/login')}
                                            >
                                                <span className="material-icons-outlined text-xl">person</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-white font-medium text-sm">
                                            {profile ? `${t('community.feeling')} Peaceful` : t('common.guest_user')}
                                        </span>
                                        <span className="text-xs">🧘‍♀️</span>
                                        {profile?.country && (
                                            <span className="text-[8px] bg-white/10 px-1 py-0.5 rounded text-white/70 font-bold tracking-wider">
                                                {getCountryDisplay(profile.country)}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-white/60 text-xs italic font-display">
                                        {profile ? '"Morning meditation complete."' : `"${t('community.ready_to_share')}"`}
                                    </p>
                                </div>
                            </div>
                            <div className="relative z-10">
                                <button className="bg-white/10 hover:bg-white/20 text-white rounded-full p-1.5 transition-colors">
                                    <span className="material-icons-outlined text-sm">more_horiz</span>
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/scan')}
                            className="w-full mt-3 flex items-center justify-center gap-2 text-primary hover:text-white transition-all active:scale-95 py-2 rounded-lg group"
                        >
                            <span className="material-icons-outlined text-lg group-hover:rotate-12 transition-transform duration-300">spa</span>
                            <span className="text-sm font-semibold tracking-wide uppercase">{t('community.post_new')}</span>
                        </button>
                    </div>

                    {/* Vibe Stream Header - Strict Match */}
                    <div className="mb-4 px-2 fade-in-up delay-100">
                        <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{t('community.title')}</h2>
                        <h1 className="text-3xl font-display text-white leading-tight">{t('community.vibe_feed')}</h1>
                    </div>

                    <div className="space-y-4">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : posts.length > 0 ? (
                            posts.map((post, index) => (
                                <div
                                    key={post.id}
                                    className={`fade-in-up bg-glass-light dark:bg-glass-dark backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col gap-3 shadow-lg group hover:bg-white/20 transition-all duration-300`}
                                    style={{ animationDelay: `${(index + 2) * 100}ms` }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full border-2 border-primary/50 overflow-hidden bg-white/10 flex items-center justify-center">
                                                {post.profiles?.avatar_url?.startsWith('http') ? (
                                                    <img src={post.profiles.avatar_url} alt={post.profiles.display_name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-xl">{post.profiles?.avatar_url}</span>
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-white text-sm">{post.profiles?.display_name || 'Anonymous'}</h3>
                                                    {post.profiles?.country && (
                                                        <span className="text-[8px] bg-white/10 px-1 py-0.5 rounded text-white/70 font-bold tracking-wider">
                                                            {getCountryDisplay(post.profiles.country)}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-white/60 text-xs">{getTimeAgo(post.created_at)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 bg-black/20 rounded-full px-2 py-1">
                                            <span className="text-lg">{getVibeEmoji(post.vibe)}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-1">
                                        <p className="text-white/80 text-sm font-display italic">"{post.reflection}"</p>
                                        <button className="flex items-center gap-1.5 text-white/70 hover:text-primary transition-colors group-hover:scale-110 transform duration-200">
                                            <span className="material-icons-outlined text-[18px]">spa</span>
                                            <span className="text-xs font-medium">{Math.floor(Math.random() * 50)}</span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-white/40 italic">
                                {t('community.no_posts')}
                            </div>
                        )}
                    </div>

                    <div className="h-20 flex items-center justify-center mt-6">
                        <p className="text-xs text-white/40 tracking-widest uppercase">{t('community.end_stream')}</p>
                    </div>
                </main>

                <BottomMenu />
            </div>
        </div>
    );
};

export default Community;
