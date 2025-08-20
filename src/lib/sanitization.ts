// Input sanitization utilities
export const sanitizeInput = (input: string): string => {
  // Limit input length before sanitization to avoid truncating sanitized content
  let sanitized = input.trim();
  if (sanitized.length > 1000) {
    sanitized = sanitized.slice(0, 1000);
  }

  // Only allow a safe subset of characters: alphanumerics, spaces, and basic punctuation
  sanitized = sanitized.replace(/[^a-zA-Z0-9 \-_.!?&()]/g, '');

  return sanitized;
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
