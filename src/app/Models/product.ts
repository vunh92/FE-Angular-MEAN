export class Product{
    id_user: string
    name: string
    slug: string
    parent: string
    price: number
    discount: number
    gallery:Array<string>
    status: boolean
    detail:string
    img:string
    date_created:Date
    date_updated:Date
    
    constructor(
        id_user?: string, name?: string, slug?: string, parent?: string, 
        price?: number, discount?: number, gallery?:Array<string>, status?:boolean, detail?:string, img?: string,
        date_created?:Date, date_updated?:Date
    ){
        this.id_user = id_user;
        this.name = name || '';
        this.slug = slug || '';
        this.parent = parent || '';
        this.price = price || 0;
        this.discount = discount || 0;
        this.gallery = gallery || [];
        this.status = status || true;
        this.detail = detail || '';
        this.img = img || '';
        this.date_created = date_created;
        this.date_updated = date_updated;
    }
}