import { ProductType, ProductFilterSetArguments } from '../types/productTypes'

//#region FILTER PRODUCTS
const FilterProducts = (products: ProductType[], filterSets: ProductFilterSetArguments[]): ProductType[] => {
    //First, reset all products
    for (let x = 0; x < products.length; x++){
        products[x].hiddenByFilter = false
    }

    //Second, loop and filter
    for (let x = 0; x < filterSets.length; x++){
        const filterSet = filterSets[x]
        //If a filter has no args, ignore it
        if (filterSet.args.length === 0)
            continue
        
        for (let y = 0; y < products.length; y++){
            const product: {[index: string]:any} = products[y]

            if (product.hiddenByFilter) //If it's already hidden by another filter, skip it
                continue
            
            if (filterSet.name === 'rating'){
                product.hiddenByFilter = _HideProductByRating(filterSet.args, product[filterSet.name])
            }
            else if (filterSet.name === 'price'){
                const _prop = (product.discountPrice)?product.discountPrice:product.price
                product.hiddenByFilter = _HideProductByPrice(filterSet.args, _prop)
            }
            else {
                //Some basic prop-types may not be global - ensure a product has property first
                const _propType = product[filterSet.name]
                if (_propType){
                    product.hiddenByFilter = _HideProduct(filterSet.args, product[filterSet.name])
                }
                else {
                    product.hiddenByFilter = true
                }
            }
        }
    }

    return products;
}

const ResetFilters = (products: ProductType[]): ProductType[] => {
    for (let x = 0; x < products.length; x++){
        products[x].hiddenByFilter = false
    }
    return products
}
//#endregion

//#region SUB METHODS
const _HideProduct = (args: string[], property: string) => {
    for (let x = 0; x < args.length; x++){
        if (property.toString() === args[x]){
            return false
        }
    }
    return true
}

const _HideProductByRating = (args: string[], rating: number) => {
    for (let x = 0; x < args.length; x++){
        const val = args[x]

        if (val === '1'){
            if (rating < 1){
                return false
            }
        }
        else if (val === '1-2'){
            if (rating >= 1 && rating < 2){
                return false
            }
        }
        else if (val === '2-3'){
            if (rating >= 2 && rating < 3){
                return false
            }
        }
        else if (val === '3-4'){
            if (rating >= 3 && rating < 4){
                return false
            }
        }
        else if (val === '4-5'){
            if (rating >= 4 && rating < 5){
                return false
            }
        }
        else {
            if (rating === 5){
                return false
            }
        }
    }
    return true;
}

const _HideProductByPrice = (args: string[], price: number) => {
    for (let x = 0; x < args.length; x++){
        const val = args[x]

        if (val === 'Less than $50'){
            if (price < 50){
                return false
            }
        }
        else if (val === '$50 - $100'){
            if (price >= 50 && price < 100){
                return false
            }
        }
        else if (val === '$100 - $250'){
            if (price >= 100 && price < 250){
                return false
            }
        }
        else if (val === '$250 - $500'){
            if (price >= 250 && price < 500){
                return false
            }
        }
        else if (val === '$500 - $1000'){
            if (price >= 500 && price < 1000){
                return false
            }
        }
        else { //$1000 plus
            if (price >= 1000 ){
                return false
            }
        }
    }
    return true
}
//#endregion

//*** EXPORTS ***//
export { FilterProducts, ResetFilters }