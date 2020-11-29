export namespace Api {
  export namespace ClientInfo {
    export interface Response {}
  }

  export namespace Product {
    export interface ProductCategories {
      id: number;
      slug: string;
      title: string;
    }

    export interface Size {
      size: string;
      code: string;
      quantity: number;
    }

    export interface Fibers {
      title: string;
      description: string;
    }

    export interface Item {
      id: number;
      slug: string;
      title: string;
      price: number;
      description?: string;
      isAvailable: boolean;
      sizes: Size[];
      fibers?: Fibers[];
      photos: string[];
    }
  }
}
