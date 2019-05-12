const daysRange: number = 8;
const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const getCalendarDates: (startDate: Date) => {startDate: Date, endDate: Date} = (startDate) => {
    const endDate: Date = addDays(startDate, daysRange - 1);

    return {startDate, endDate}
};

export const formatFullDate: (date: Date) => string = (date) => {
    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();
    return `${month} ${day}, ${year}`;
};

export const formatOneDigitDate: (digit: number) => string = (digit) => {
    return ('0' + digit.toString()).slice(-2);
};

export const getDateLabels: (startDate: Date) => string[] = (startDate) => {
    const result = [];
    for (let i = 0; i < daysRange; i++) {
        const day = addDays(startDate, i);
        const dayLabel = `${formatOneDigitDate(day.getDate())}.${formatOneDigitDate(day.getMonth() + 1)}`;
        result.push(dayLabel);
    }
    return result;
};

export const addDays: (date: Date, daysToAdd: number) => Date = (date, daysToAdd) => {
    const result: Date = new Date(date);
    result.setDate(result.getDate() + daysToAdd);
    return result;
};