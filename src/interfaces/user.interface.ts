export interface Profile {
  id: number,
  email: string,
  address: string,
  name: string,
  phone: string
}

export interface LoginResponse {
  access_token: string;
}