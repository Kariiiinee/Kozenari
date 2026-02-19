import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireProfile?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireProfile = true }) => {
    const { user, profile, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F0FFFE] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#13ec13] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireProfile && !profile && location.pathname !== '/profile-creation') {
        // Redirect to profile creation if profile is missing
        return <Navigate to="/profile-creation" replace />;
    }

    if (profile && location.pathname === '/profile-creation') {
        // Already has a profile, don't need to create one
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
