export interface ScanData {
    body: string;
    heart: string;
    environment: string;
    breathAction: string;
    reflection: string;
    vibe: string | null;
}

export interface AIInsight {
    mainInsight: string;
    microActions: { id: number; text: string; icon: string }[];
    upliftingQuote: string;
    recommendedActivity: {
        title: string;
        duration: string;
        image: string;
    };
}

export const generateAIInsights = async (data: ScanData): Promise<AIInsight> => {
    try {
        // Attempt to call the real AI API proxy
        const response = await fetch('/api/generate-insights', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            return await response.json();
        }

        // If response is not ok (e.g., 404, 500), throw to trigger fallback
        throw new Error('API unavailable, falling back to simulation');
    } catch (error) {
        console.log('AI API not reachable, using local simulation:', error);

        // LOCAL SIMULATION FALLBACK (Existing Logic)
        await new Promise(resolve => setTimeout(resolve, 2000));

        const bodyLower = data.body.toLowerCase();
        const heartLower = data.heart.toLowerCase();
        const envLower = data.environment.toLowerCase();

        let mainInsight = "It sounds like you're taking a meaningful moment for self-reflection. Your awareness is the first step toward balance.";
        let microActions = [
            { id: 1, text: "Unclench Check (30 sec)", icon: "accessibility_new" },
            { id: 2, text: "Hydration Pause (1 min)", icon: "water_drop" },
            { id: 3, text: "Extended Exhale Breathing (1–2 min)", icon: "air" }
        ];

        // Logic based on Vibe
        if (data.vibe === 'Stressed / Frustrated') {
            mainInsight = "I notice you're feeling a bit pressured. Remember that it's okay to slow down; your productivity isn't your worth.";
            microActions = [
                { id: 1, text: "Physiological Sigh (1 min)", icon: "air" },
                { id: 2, text: "Gentle Neck Roll (1 min)", icon: "accessibility_new" },
                { id: 3, text: "Lower the Pace (1 min)", icon: "accessibility_new" }
            ];
        } else if (data.vibe === 'Sad / Low') {
            mainInsight = "It's completely valid to feel heavy right now. Be gentle with yourself—you don't have to 'fix' everything today.";
            microActions = [
                { id: 1, text: "Label the Feeling (30 sec)", icon: "accessibility_new" },
                { id: 2, text: "Light Exposure Reset (2 min)", icon: "water_drop" },
                { id: 3, text: "Warm Sensation (2 min)", icon: "accessibility_new" }
            ];
        } else if (data.vibe === 'Calm / Peaceful') {
            mainInsight = "It's wonderful that you're in a space of ease. Take a moment to anchor this feeling so you can return to it later.";
            microActions = [
                { id: 1, text: "Unclench Check (30 sec)", icon: "accessibility_new" },
                { id: 2, text: "Music Micro-Boost (2 min)", icon: "water_drop" },
                { id: 3, text: "Same Last Action Nightly (30 sec)", icon: "air" }
            ];
        }

        // Keyword Matching - Motivation / Tired
        if (bodyLower.includes('tired') || bodyLower.includes('exhausted')) {
            microActions[1] = { id: 2, text: "Cold Water Splash (30 sec)", icon: "water_drop" };
        }

        if (heartLower.includes('lazy') || heartLower.includes('stuck') || bodyLower.includes('lazy')) {
            microActions[0] = { id: 1, text: "Define Tiny Step (30 sec)", icon: "accessibility_new" };
            microActions[2] = { id: 3, text: "2-Minute Rule", icon: "air" };
        }

        return {
            mainInsight,
            microActions: microActions.slice(0, 3), // Keep it to top 3
            upliftingQuote: data.vibe === 'Stressed / Frustrated'
                ? "Pause. Breathe. You are more than your to-do list."
                : "Small steps lead to great journeys. You're doing enough.",
            recommendedActivity: {
                title: data.vibe === 'Stressed / Frustrated' ? "Stress Release Yoga" : "Gentle Morning Flow",
                duration: "15 min",
                image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
            }
        };
    }
};

