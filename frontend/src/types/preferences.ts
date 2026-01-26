/**
 * src/types/preferences.ts
 * The "Amazon of CME" Lifestyle Dictionary
 */

export type PreferenceTagId = string;

export interface PreferenceTag {
  id: PreferenceTagId;
  label: string;
  emoji: string;
}

export interface PreferenceCategory {
  id: string;
  label: string;
  emoji: string;
  tags: PreferenceTag[];
}

export const PREFERENCE_CATEGORIES: PreferenceCategory[] = [
  {
    id: 'leisure',
    label: 'Leisure & Sport',
    emoji: '⛳',
    tags: [
      { id: 'golf', label: 'Golf', emoji: '⛳' },
      { id: 'skiing', label: 'Skiing', emoji: '⛷️' },
      { id: 'tennis', label: 'Tennis', emoji: '🎾' },
      { id: 'hiking', label: 'National Parks', emoji: '🥾' },
      { id: 'wine', label: 'Wine Tasting', emoji: '🍷' }
    ]
  },
  {
    id: 'family',
    label: 'Family & Fun',
    emoji: '🎢',
    tags: [
      { id: 'theme-parks', label: 'Theme Parks', emoji: '🎢' },
      { id: 'kids', label: 'Kids Activities', emoji: '🧒' },
      { id: 'cruise', label: 'Cruises', emoji: '🛳️' },
      { id: 'pets', label: 'Pet Friendly', emoji: '🐾' },
      { id: 'all-inclusive', label: 'All-Inclusive', emoji: '🏨' }
    ]
  },
  {
    id: 'relaxation',
    label: 'Relaxation',
    emoji: '🧖‍♀️',
    tags: [
      { id: 'spa', label: 'Spa & Wellness', emoji: '🧖‍♀️' },
      { id: 'beach', label: 'Beachfront', emoji: '🏖️' },
      { id: 'yoga', label: 'Yoga/Retreat', emoji: '🧘' },
      { id: 'fine-dining', label: 'Fine Dining', emoji: '🍽️' },
      { id: 'boutique', label: 'Boutique Stay', emoji: '🏰' }
    ]
  },
  {
    id: 'logistics',
    label: 'Travel Ease',
    emoji: '✈️',
    tags: [
      { id: 'direct-flights', label: 'Direct Flights', emoji: '✈️' },
      { id: 'driving', label: 'Driving Distance', emoji: '🚗' },
      { id: 'international', label: 'International', emoji: '🌍' },
      { id: 'urban', label: 'Big City/Arts', emoji: '🎭' },
      { id: 'wifi', label: 'Workation Ready', emoji: '💻' }
    ]
  }
];

export const PLANNING_HORIZON_OPTIONS = [
  { label: '3 Months (Emergency)', value: 3 },
  { label: '6 Months (Strategic)', value: 6 },
  { label: '12 Months (Roadmap)', value: 12 }
];

export const getAllTagsFlat = (): PreferenceTag[] => 
  PREFERENCE_CATEGORIES.flatMap(cat => cat.tags);

export const getTagEmoji = (id: string): string => 
  getAllTagsFlat().find(t => t.id === id)?.emoji || '🔹';

export const getTagLabel = (id: string): string => 
  getAllTagsFlat().find(t => t.id === id)?.label || id;

export type PlanningHorizonMonths = 3 | 6 | 12;