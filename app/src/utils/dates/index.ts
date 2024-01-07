export const getUnixForDayAfterDays = (startDayUnix:number, days:number) => {
    const endDayUnix = startDayUnix + days * 24 * 60 * 60;
    return endDayUnix;
}