/**
 * Institution model — mirrors the planned MongoDB `institutions` collection.
 * Sourced from the "Institution A-Z" dataset.
 */
export type InstitutionCategory =
  | 'Cantonment Public'
  | 'Cantonment Board'
  | 'Cantonment English'
  | 'BN College'
  | 'BAF Shaheen';

export type ForceBranch =
  | 'Bangladesh Army'
  | 'Military Lands & Cantonments'
  | 'Bangladesh Navy'
  | 'Bangladesh Air Force';

export interface Institution {
  id: string;
  name: string;
  shortName: string;
  category: InstitutionCategory;
  force: ForceBranch;
  founded?: string;
  eiin?: string;
  website?: string;
  phone?: string;
  email?: string;
}
