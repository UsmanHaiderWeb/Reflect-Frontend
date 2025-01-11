export type MoodType = {
    id: string;
    label: string;
    emoji: string;
    color: string;
    // prompt: string;
}

export const MOODS: MoodType[] = [
    {
        id: "inspired",
        label: "Inspired",
        emoji: "💫",
        color: "violet",
        // prompt: "What's sparking your creativity?",
    },
    {
        id: "accomplished",
        label: "Accomplished",
        emoji: "⭐",
        color: "amber",
        // prompt: "What have you achieved?",
    },
    {
        id: "appreciated",
        label: "Appreciated",
        emoji: "💝",
        color: "rose",
        // prompt: "Who showed you appreciation?",
    },
    {
        id: "motivated",
        label: "Motivated",
        emoji: "🎯",
        color: "emerald",
        // prompt: "What's driving you forward?",
    },
    {
        id: "happy",
        label: "Happy",
        emoji: "😊",
        color: "amber",
        // prompt: "What's making you smile today?",
    },
    {
        id: "excited",
        label: "Excited",
        emoji: "🎉",
        color: "orange",
        // prompt: "What are you looking forward to?",
    },
    {
        id: "confident",
        label: "Confident",
        emoji: "💪",
        color: "emerald",
        // prompt: "What's boosting your confidence?",
    },
    {
        id: "grateful",
        label: "Grateful",
        emoji: "🙏",
        color: "green",
        // prompt: "What are you thankful for today?",
    },
    {
        id: "peaceful",
        label: "Peaceful",
        emoji: "😌",
        color: "blue",
        // prompt: "What's bringing you peace?",
    },
    {
        id: "hopeful",
        label: "Hopeful",
        emoji: "🌱",
        color: "green",
        // prompt: "What gives you hope?",
    },
    {
        id: "creative",
        label: "Creative",
        emoji: "🎨",
        color: "violet",
        // prompt: "What's inspiring your creativity?",
    },
    {
        id: "nostalgic",
        label: "Nostalgic",
        emoji: "🌅",
        color: "fuchsia",
        // prompt: "What memories are you thinking about?",
    },
    {
        id: "neutral",
        label: "Neutral",
        emoji: "😐",
        color: "gray",
        // prompt: "How has your day been?",
    },
    {
        id: "restless",
        label: "Restless",
        emoji: "🌊",
        color: "blue",
        // prompt: "What's making you feel unsettled?",
    },
    {
        id: "tired",
        label: "Tired",
        emoji: "😴",
        color: "purple",
        // prompt: "What's draining your energy?",
    },
    {
        id: "overwhelmed",
        label: "Overwhelmed",
        emoji: "😵",
        color: "sky",
        // prompt: "What's feeling like too much?",
    },
    {
        id: "anxious",
        label: "Anxious",
        emoji: "😰",
        color: "indigo",
        // prompt: "What's causing your anxiety?",
    },
    {
        id: "disappointed",
        label: "Disappointed",
        emoji: "😞",
        color: "stone",
        // prompt: "What didn't go as expected?",
    },
    {
        id: "frustrated",
        label: "Frustrated",
        emoji: "😤",
        color: "orange",
        // prompt: "What's blocking your progress?",
    },
    {
        id: "stressed",
        label: "Stressed",
        emoji: "😫",
        color: "rose",
        // prompt: "What's pressuring you?",
    },
    {
        id: "sad",
        label: "Sad",
        emoji: "😢",
        color: "cyan",
        // prompt: "What's bringing you down?",
    },
    {
        id: "lonely",
        label: "Lonely",
        emoji: "🌙",
        color: "zinc",
        // prompt: "How could you connect with others?",
    },
    {
        id: "angry",
        label: "Angry",
        emoji: "😠",
        color: "red",
        // prompt: "What's frustrating you?",
    },
];


export const getMoodObj = (id: string) => {
    let mood = MOODS.find((mood: MoodType) => mood.id == id);
    return mood;
}