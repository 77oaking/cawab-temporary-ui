/** Leadership model — Founders, Advisory, Central Executive Board, Directors. */
export type CouncilType =
  | 'Founders'
  | 'Advisory'
  | 'Central Executive'
  | 'Directors';

export interface Leader {
  id: string;
  name: string;
  institution?: string;  // short code
  batch?: string;        // e.g. "H2021"
  role: string;
  council: CouncilType;
  photo?: string;        // asset path, optional for now
  memorial?: boolean;    // true for the late founder
  order: number;
}
