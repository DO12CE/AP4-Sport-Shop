export class Item {
  reference: string;
  name: string;
  desc: string;
  price: number;
  quantity: number;

  constructor(reference: string, name: string, desc: string, price: number, quantity: number) {
    this.reference = reference;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.quantity = quantity;
  }
}

export class Cart {
  items: Item[];

  constructor() {
    this.items = []
  }

  ItemCount(): number {
    return this.items.length;
  }

  findCartItemIndex(reference: string): number {
    return this.items.findIndex((el) => el.reference == reference);
  }

  PrixTotal(): number {
    let res = 0;

    for (let item of this.items) {
      res += item.price * item.quantity;
    }

    return res;
  }

  AddProduct(item: Item) {
    const index = this.findCartItemIndex(item.reference);

    if (index == -1) {
      this.items.push(item);
    } else {
      this.items[index].quantity++;
    }
  }

  RemoveProduct(item: Item) {
    const index = this.findCartItemIndex(item.reference);

    if (index != -1) {
      const item = this.items[index];

      if (--item.quantity == 0) {
        this.items.splice(index, 1);
      }
    }
  }
}

export let cart = new Cart();