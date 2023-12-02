/**
 * Formats a date and hour string.
 * 
 * @param dateString - The date string to format in the format "dd.MM.yyyy".
 * @param hourString - The hour string to format in the format "HH:mm".
 * @param separator - The separator to use between the formatted date and hour.
 * @returns The formatted date and hour string.
 */
export default function formatDateAndHour(dateString: string, hourString: string, separator: string): string {
  if (!dateString || !hourString) {
    return '';
  }
  const formattedDate = dateString.replace(/\./g, '/').slice(0, 6) + dateString.slice(6);
  return `${formattedDate} ${separator} ${hourString}`;
}
