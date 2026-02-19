import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

interface Profile {
    id: string;
    display_name: string;
    avatar_url: string;
    country: string;
    updated_at: string;
}

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: Profile | null;
    loading: boolean;
    hasProfile: boolean;
    refreshProfile: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchInProgress = useRef<string | null>(null);

    const fetchProfile = async (userId: string) => {
        if (fetchInProgress.current === userId) return;
        fetchInProgress.current = userId;

        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    setProfile(null);
                } else {
                    console.error('Error fetching profile:', error);
                    // Don't set profile to null on random errors to avoid loops
                }
            } else {
                setProfile(data);
            }
        } catch (error) {
            console.error('Unexpected error fetching profile:', error);
        } finally {
            fetchInProgress.current = null;
        }
    };

    const refreshProfile = async () => {
        if (user) {
            await fetchProfile(user.id);
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        setProfile(null);
    };

    useEffect(() => {
        const initSession = async () => {
            // Set a maximum timeout for initialization to prevent hanging
            const timeoutId = setTimeout(() => {
                console.warn('Auth initialization timed out, proceeding with default state.');
                setLoading(false);
            }, 5000);

            try {
                const { data: { session } } = await supabase.auth.getSession();
                setSession(session);
                const currentUser = session?.user ?? null;
                setUser(currentUser);

                if (currentUser) {
                    await fetchProfile(currentUser.id);
                }
            } catch (error) {
                console.error('Error during auth initialization:', error);
            } finally {
                clearTimeout(timeoutId);
                setLoading(false);
            }
        };

        initSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            const currentUser = session?.user ?? null;
            setUser(currentUser);

            if (currentUser) {
                await fetchProfile(currentUser.id);
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            session,
            profile,
            loading,
            hasProfile: !!profile,
            refreshProfile,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
