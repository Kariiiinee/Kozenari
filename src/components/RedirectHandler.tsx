import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * RedirectHandler is a global observer that ensures authenticated users
 * with missing profiles are always redirected to the profile creation page.
 */
const RedirectHandler: React.FC = () => {
    const { user, profile, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Only redirect if loading is finished
        if (loading) return;

        // If the user is logged in but has no profile data
        if (user && !profile) {
            // Check if we already tried to redirect during this browser session
            const hasAttemptedOnboarding = sessionStorage.getItem('onboarding_redirect_attempted');

            // We only trigger the automatic redirect if they land on the home page
            // and haven't been redirected yet in this session.
            if (location.pathname === '/' && !hasAttemptedOnboarding) {
                console.log('User authenticated, no profile. Triggering one-time onboarding redirect...');
                sessionStorage.setItem('onboarding_redirect_attempted', 'true');
                navigate('/profile-creation', { replace: true });
            }
        }
    }, [user, profile, loading, navigate, location.pathname]);

    return null; // This component doesn't render anything
};

export default RedirectHandler;
