export interface Farm {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  name?: string;
  type?: string;
  code?: string;
  logo?: string;
  address?: string;
  nPonds?: number;
  nFishPerPond?: number;
  timezone?: string;
  contactPhone?: number;
  contactEmail?: string;
  order?: string;
  is_archived?: false;
}
