export class UserWithoutPassword {
  id: string;
  username: string;
  createDate: Date;
  updatedDate: Date;
  lastLogin: Date;
  hashRefreshToken: string;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
