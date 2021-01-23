import { Pedido } from "./Pedido";

export class Game {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  idCatT: number;
  developer: string;
  price: number;
  picByte: string;
  retrievedImage: string;
  isAdded: boolean;
  pedidos: Array<Pedido>;
}
