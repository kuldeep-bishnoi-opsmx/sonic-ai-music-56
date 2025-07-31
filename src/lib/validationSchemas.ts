
import { z } from 'zod';

// Playlist validation schema
export const playlistSchema = z.object({
  name: z.string()
    .min(1, 'Playlist name is required')
    .max(100, 'Playlist name must be less than 100 characters')
    .regex(/^[a-zA-Z0-9\s\-_.!?]+$/, 'Playlist name contains invalid characters'),
  description: z.string()
    .max(500, 'Description must be less than 500 characters')
    .optional()
});

// Track upload validation schema
export const trackUploadSchema = z.object({
  title: z.string()
    .min(1, 'Track title is required')
    .max(200, 'Track title must be less than 200 characters')
    .regex(/^[a-zA-Z0-9\s\-_.!?&()]+$/, 'Track title contains invalid characters'),
  genre: z.string()
    .min(1, 'Genre is required')
    .max(50, 'Genre must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s\-]+$/, 'Genre contains invalid characters')
});

// Profile settings validation schema
export const profileSettingsSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  displayName: z.string()
    .min(1, 'Display name is required')
    .max(50, 'Display name must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s\-_.]+$/, 'Display name contains invalid characters'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
});

// Search query validation
export const searchQuerySchema = z.string()
  .max(100, 'Search query is too long')
  .regex(/^[a-zA-Z0-9\s\-_.!?&()]*$/, 'Search query contains invalid characters');
