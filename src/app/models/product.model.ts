import ICategory from "./category.model"
export default interface IProduct{
    id:string,
    name:string,
    price:number,
    description?:string,
    created_at?:string,
    updated_at?:string,
    category:ICategory|null
}  