export default interface User {
  id: number;
  username: string;
}

export function mapUser(data: any): User {
  return {
    id: data.id,
    username: data.username,
  };
}
