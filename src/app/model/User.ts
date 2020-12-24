export class User {
  id: number;
  name: string;
  type: string;
  password: string;

  constructor(name?: string, password?: string, type?: string) {
    this.name= name;
    this.password = password;
    this.type = type;
  }

}
