// Translate seconds to HH:MM:SS
const translateFromSeconds = seconds => {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
};

// Translate HH:MM:SS to seconds
const translateToSeconds = (hours, minutes, seconds) => {
    return ((hours * 60) * 60) + (minutes * 60) + seconds;
};

export { translateFromSeconds, translateToSeconds };