export interface ProductCard {
    _id: string;
    title: string;
    type :"product";
    price: number;
    description?: string;
    discountPercentage:number;
    imageUrl: {
      asset: {
        _ref: string;
       __type : "image";
      };
    };
    slug: {
      current: string;
    };
  }
  