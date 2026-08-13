const XP_PER_LEVEL = 150;
const levelTiers = [
    {
        minLevel: 1,
        title: "Coder",
        color: "#D97706"
    },
    {
        minLevel: 10,
        title: "Developer",
        color: "#2563EB"
    },
    {
        minLevel: 20,
        title: "Engineer",
        color: "#7C3AED"
    },
    {
        minLevel: 30,
        title: "Architect",
        color: "#059669"
    },
    {
        minLevel: 40,
        title: "Master",
        color: "#DC2626"
    },
    {
        minLevel: 50,
        title: "Legend",
        color: "#CA8A04"
    }
] as const;

function getLevel(xp: number) {
    return Math.floor(xp / XP_PER_LEVEL) + 1;
}

function getNextLevelXp(xp: number) {
    const currentLevel = getLevel(xp);
    return currentLevel * XP_PER_LEVEL;
}

function getLevelTier(level: number) {
    return [...levelTiers].reverse().find(tier => level >= tier.minLevel)!;
}

export function calculateLevelProgress(xp: number = 0) {
    const currentLevelStart = (getLevel(xp) - 1) * XP_PER_LEVEL;
    const nextLevel = getNextLevelXp(xp);
    const tier = getLevelTier(getLevel(xp));

    return {
        current: xp,
        required: nextLevel,
        percentage: ((xp - currentLevelStart) / (nextLevel - currentLevelStart)) * 100,
        currentLevel: getLevel(xp),
        tier: tier,
    };
}