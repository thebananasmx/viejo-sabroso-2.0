/**
 * Remove undefined values from an object to prevent Firebase errors
 * Firebase Firestore doesn't allow undefined values in documents
 */
export const removeUndefinedValues = <T extends Record<string, any>>(
  obj: T,
): Partial<T> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
};

/**
 * Deep clean an object, removing undefined values recursively
 */
export const deepCleanObject = <T extends Record<string, any>>(
  obj: T,
): Partial<T> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === "object" && !Array.isArray(value)) {
        const cleaned = deepCleanObject(value);
        if (Object.keys(cleaned).length > 0) {
          acc[key as keyof T] = cleaned as any;
        }
      } else {
        acc[key as keyof T] = value;
      }
    }
    return acc;
  }, {} as Partial<T>);
};

/**
 * Merge objects while handling undefined values properly
 */
export const safeMerge = <T extends Record<string, any>>(
  target: T,
  source: Partial<T>,
): T => {
  const cleaned = removeUndefinedValues(source);
  return { ...target, ...cleaned };
};
