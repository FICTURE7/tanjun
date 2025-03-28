import { mapUser, User } from ".";

export default interface Auth {
  user: User;
  token: string;
}

export function mapAuth(data: any): Auth {
  return {
    user: mapUser(data.user),
    token: data.token
  }
}
