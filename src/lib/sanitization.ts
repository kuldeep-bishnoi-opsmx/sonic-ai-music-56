
// Input sanitization utilities
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length as additional safety
};

export const sanitizePlaylistName = (name: string): string => {
  return sanitizeInput(name).substring(0, 100);
};

export const sanitizeTrackTitle = (title: string): string => {
  return sanitizeInput(title).substring(0, 200);
};

export const sanitizeDescription = (description: string): string => {
  return sanitizeInput(description).substring(0, 500);
};

export const sanitizeSearchQuery = (query: string): string => {
  return sanitizeInput(query).substring(0, 100);
};
