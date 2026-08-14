const levelTiers = [
    {
        minLevel: 1,
        title: "Coder",
        color: "#D97706",
        xpPerLevel: 150
    },
    {
        minLevel: 10,
        title: "Developer",
        color: "#2563EB",
        xpPerLevel: 200
    },
    {
        minLevel: 20,
        title: "Engineer",
        color: "#7C3AED",
        xpPerLevel: 300
    },
    {
        minLevel: 30,
        title: "Architect",
        color: "#059669",
        xpPerLevel: 400
    },
    {
        minLevel: 40,
        title: "Master",
        color: "#DC2626",
        xpPerLevel: 500
    },
    {
        minLevel: 50,
        title: "Legend",
        color: "#CA8A04",
        xpPerLevel: 650
    }
] as const;

function getLevelTier(level: number) {
    return [...levelTiers].reverse().find(tier => level >= tier.minLevel)!;
}

function getXpForLevel(level: number) {
    let xp = 0;

    for (let currentLevel = 1; currentLevel < level; currentLevel++) {
        const tier = getLevelTier(currentLevel);
        xp += tier.xpPerLevel;
    }

    return xp;
}

function getLevel(xp: number) {
    let level = 1;

    while (xp >= getXpForLevel(level + 1)) {
        level++;
    }

    return level;
}

function getNextLevelXp(xp: number) {
    const currentLevel = getLevel(xp);
    return getXpForLevel(currentLevel + 1);
}

export function calculateLevelProgress(xp: number = 0) {
    const currentLevel = getLevel(xp);
    const currentLevelStart = getXpForLevel(currentLevel);
    const nextLevel = getNextLevelXp(xp);
    const tier = getLevelTier(currentLevel);

    return {
        current: xp,
        required: nextLevel,
        percentage: ((xp - currentLevelStart) / (nextLevel - currentLevelStart)) * 100,
        currentLevel: currentLevel,
        tier: tier,
    };
}