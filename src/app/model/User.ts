import { Pedido } from "./Pedido";

export class User {
  id: number;
  name: string;
  type: string;
  password: string;
  pedidos: Array<Pedido>;

  constructor(name?: string, password?: string, type?: string) {
    this.name= name;
    this.password = password;
    this.type = type;
  }

}
