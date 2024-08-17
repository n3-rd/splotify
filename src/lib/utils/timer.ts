export const convertMilliseconds = (ms: number) => {
	const totalSeconds = ms / 1000;
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = Math.floor(totalSeconds % 60);

	return `${hours > 0 ? `${hours}:` : ''}${minutes < 10 && hours > 0 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};
