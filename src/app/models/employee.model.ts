export interface IUser {
  id: string;
  name: string;
  username: string;
  role: 'ADMIN' | 'EMPLOYEE';
  accessToken?: string;
  createAt?: Date;
}
