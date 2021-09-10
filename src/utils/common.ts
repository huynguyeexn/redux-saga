export const capitilizedString = (str: string): string => {
	return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
};

export const markColor = (mark: number): string => {
	if (mark >= 8) return 'green';
	if (mark >= 5) return 'goldenrod';
	return 'red';
};
