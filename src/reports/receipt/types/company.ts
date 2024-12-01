export type Address = {
  id?: number;
  code?: string | null;
  country_id?: number;
  state_id?: number;
  city?: string;
  street?: string;
  number?: string | null;
  cp?: string;
  obs?: string | null;
  geocoder?: string | null;
  addressable_id?: number;
  addressable_type?: string;
  type_id?: number | null;
  active?: number;
  between_streets?: string | null;
  created_at?: string;
  updated_at?: string;
  localidad?: string;
};

export type Voucher = {
  id: number;
  value: number;
  afip_code: string;
  name: string;
};

export type Cbu = {
  id: number;
  alias: string;
  bank_id: number;
  bank: string;
  cbu: string;
};

export type Company = {
  activity_init: string;
  address: Address;
  afip_environment: string;
  billing_concept: number;
  created_at: string;
  cuit: string;
  document: string;
  fantasy_name: string;
  id: number;
  iibb: string;
  inscription_id: number;
  inscription: string;
  lastName: string;
  logo_base64: string;
  name: string;
  perception_iibb: number;
  perception_iva: number;
  pto_vta_fe: number;
  pto_vta_recibo: number;
  pto_vta_remito: number;
  type_company: number;
  user_id: number;
  vouchers?: Voucher[];
  cbus?: Cbu[];
  phone1: string;
  phone2: string;
  email: string;
  webSite: string;
};

export type CompanyData = {
  name: string;
  address: string;
  phone1: string;
  phone2: string;
  email: string;
  webSite: string;
  logo_base64: string;
};
