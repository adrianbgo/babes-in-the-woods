export interface Character {
    basics: {
        name: string;
        age: number;
        look: string;
    };
    stats: {
        steam: number;
        noodle: number;
        mush: number;
    }
    harm: number;
    items: string[];
    hope: string[];
    friends: string[];
    fear: number;
    wishes: number;
    xp: number;
    questions: string[];
}