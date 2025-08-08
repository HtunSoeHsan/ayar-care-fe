import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useLocale } from 'next-intl';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts the correct language property from an object based on the current locale
 * @param obj - The object containing language-specific properties (e.g., { en: 'English', mm: 'Myanmar' })
 * @param locale - The current locale (e.g., 'en' or 'my')
 * @returns The value in the appropriate language or a fallback
 */
export function getLocalizedProperty(obj: any, locale: string, fallbackLocale: string = 'en'): string {
  if (!obj) return '';
  
  // If the object has a property matching the current locale, return it
  if (obj[locale]) {
    return obj[locale];
  }
  
  // If the object has a property matching the fallback locale, return it
  if (obj[fallbackLocale]) {
    return obj[fallbackLocale];
  }
  
  // If the object itself is a string, return it
  if (typeof obj === 'string') {
    return obj;
  }
  
  // Return the first available property or empty string
  const firstKey = Object.keys(obj)[0];
  return firstKey ? obj[firstKey] : '';
}

/**
 * Custom hook to get localized property based on current i18n locale
 * @param obj - The object containing language-specific properties
 * @returns The value in the current language
 */
export function useLocalizedProperty(obj: any): string {
  // Get the current language directly from the i18n instance
  const locale = useLocale();
  return getLocalizedProperty(obj, locale);
}
