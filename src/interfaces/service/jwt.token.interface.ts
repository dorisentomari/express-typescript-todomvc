export interface JwtTokenInterface {
  token: string;
  expiresIn: number;
}

export interface JwtTokenUserInterface {
  id: string;
}
