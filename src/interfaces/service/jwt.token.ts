export interface JwtTokenInterface {
  token: string;
  expiresIn: number;
}

export interface JwtTokenUserInterface {
  iat: number;
  exp: number;
  id: string;
}
