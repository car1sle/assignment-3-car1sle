// Translate seconds to HH:MM:SS
const translateFromSeconds = seconds => {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
};

// Translate 3 values HH:MM:SS to seconds
const translateToSeconds = (hours, minutes, seconds) => {
    return ((hours * 60) * 60) + (minutes * 60) + seconds;
};

// Translate STRING HH:MM:SS to seconds
const translateStringToSeconds = string => {
    const temp = string.split(':');
    return (+temp[0]) * 60 * 60 + (+temp[1]) * 60 + (+temp[2]); 
};

export { translateFromSeconds, translateToSeconds, translateStringToSeconds };