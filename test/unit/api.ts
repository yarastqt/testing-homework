import {
  CartState,
  CheckoutFormData,
  CheckoutResponse,
  ProductShortInfo,
} from "../../src/common/types";

export class MockExampleApi {
  private readonly basename: string;

  constructor(private config: { products: ProductShortInfo[] }) {}

  async getProducts() {
    return this.config.products;
  }

  async getProductById(id: number) {
    return this.config.products.find((product) => product.id === id);
  }

  async checkout(
    form: CheckoutFormData,
    cart: CartState
  ): Promise<CheckoutResponse> {
    return null as any;
  }
}
