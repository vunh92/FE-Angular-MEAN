export class Like{
    id_user: string;
    name: string;
    id_product: string;
    price: number;
    img: string;
    
    constructor(
        id_user?: string, name?: string, id_product?: string,
        price?: number, img?: string
    ){
        this.id_user = id_user || '';
        this.name = name || '';
        this.id_product = id_product || '';
        this.price = price || 0;
        this.img = img || '';
    }
}