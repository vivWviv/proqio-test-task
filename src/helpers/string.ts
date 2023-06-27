export function firstLetterCapitalize(string: string | undefined): string {
    if (!string) return "";
    const firstChar = string.charAt(0).toUpperCase();
    const restOfString = string.slice(1);
    return firstChar + restOfString;
}