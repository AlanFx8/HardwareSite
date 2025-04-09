import { ProductType, ProductSortType } from '../types/productTypes'

const SortProducts = (products: ProductType[], arg: ProductSortType): ProductType[] => {
    switch(arg) {
        case ProductSortType.Recommened:
            products.sort((a, b) => {
                let x = a.id;
                let y = b.id;
                if (x < y) {return -1;}
                if (x > y) {return 1;}        
                return 0;
            });
            break;
        case ProductSortType.Rating:
            products.sort((a, b) => {
                let x = a.rating;
                let y = b.rating;
                if (x < y) {return 1;}
                if (x > y) {return -1;}        
                return 0;
            });
            break;
        case ProductSortType.LowHigh:
            products.sort((a, b) => {
                let x = (a.discountPrice) ? a.discountPrice : a.price;
                let y = (b.discountPrice) ? b.discountPrice : b.price;
                if (x < y) {return -1;}
                if (x > y) {return 1;}        
                return 0;
            });
            break;
        case ProductSortType.HighLow:
            products.sort((a, b) => {
                let x = (a.discountPrice) ? a.discountPrice : a.price;
                let y = (b.discountPrice) ? b.discountPrice : b.price;
                if (x < y) {return 1;}
                if (x > y) {return -1;}        
                return 0;
            });
            break;
        case ProductSortType.AZ:
            products.sort((a, b) => {
                let x = a.name.toLocaleLowerCase();
                let y = b.name.toLocaleLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}        
                return 0;
            });
            break;
        case ProductSortType.ZA:
            products.sort((a, b) => {
                let x = a.name.toLocaleLowerCase();
                let y = b.name.toLocaleLowerCase();
                if (x < y) {return 1;}
                if (x > y) {return -1;}        
                return 0;
            });
            break;
        default:
            //Do nothing.
            break;
    }
    
    //Return the sorted products
    return products
}

//*** EXPORTS ***//
export default SortProducts