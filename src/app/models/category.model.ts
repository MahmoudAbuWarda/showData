import IProduct from "./product.model";

export default interface ICategory{
    id?:number,
    category:string,
    slug?:string,
    created_at?:string,
    updated_at?:string,
    products?:IProduct
}