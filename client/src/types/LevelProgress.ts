export type LevelProgress = {
    current: number;
    required: number;
    percentage: number;
    currentLevel: number;
    tier: {
        readonly minLevel: number;
        readonly title: string;
        readonly color: string;
    };
};