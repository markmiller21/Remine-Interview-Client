/**
 * This function converts a CamelCase string into a string of split capitalized words
 *
 * @param string CamelCase string you need manipulated
 *
 * @returns Capitalized string spilt on Capitalization
 */

export function splitCamelString(string) {
    // Use regex to split word on Capital Letters and join them back into a string
    let splitString = string.split(/(?=[A-Z])/).join(' ');
    // Capitalize the first letter in the string and return string
    return splitString.charAt(0).toUpperCase() + splitString.slice(1);
}
