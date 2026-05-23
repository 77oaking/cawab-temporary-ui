/** Department model — mirrors the planned MongoDB `departments` collection. */
export interface DepartmentOfficer {
  role: string;          // e.g. "Secretary", "Joint Secretary"
  name?: string;         // populated where known, otherwise vacant
  institution?: string;  // short code, e.g. "SCPSC"
  batch?: string;        // e.g. "S2008H2010"
}

export interface Department {
  id: string;
  index: number;
  name: string;
  nameBn?: string;
  icon: string;          // emoji / icon key used by the UI
  summary: string;
  officers: DepartmentOfficer[];
}
