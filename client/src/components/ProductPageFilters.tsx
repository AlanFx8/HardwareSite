import React from 'react'
import { ProductType, ProductFilterSetArguments } from '../types/productTypes'
import '../styles/product-page-filters.scss'

//#region TYPES
type ProductPageFiltersProps = {
    products: ProductType[],
    handleFilterChange: (filterSets: ProductFilterSetArguments[]) => void,
    resetFilters: () => void
}

type ProductPageFiltersSubComProps = {
    optionsPanel: FilterOptionsPanel
    onFilterRequest: () => void
}

type FilterOption = {
    name: string,
    quantity: number
}

type FilterOptionsPanel = {
    propName: string,
    options: FilterOption[]
}
//#endregion

//#region PRODUCT PAGE FILTERS
const ProductPageFilters: React.FC<ProductPageFiltersProps> = ({ products, handleFilterChange, resetFilters }) => {
    //Make a unsorted copy of the products for a consistent panel layout
    const productsCopy = [...products]
    productsCopy.sort((a, b) => {
        let x = a.id;
        let y = b.id;
        if (x < y) {return -1;}
        if (x > y) {return 1;}        
        return 0;
    })

    //Build the FilterPanels
    const filterPanels: ProductFilterSetArguments[] = [
        { name: 'rating', args: [] },
        { name: 'price', args: [] },
        { name: 'brand', args: [] }
    ]

    //Build extra filter panels such as Batttery Type, PoweredBy, Stage, etc.
    const extraPanels: string[] = []
    for (let x = 0; x < productsCopy.length; x++) {
        for (const prop in productsCopy[x]){
            if (prop !== 'id'
            && prop !== 'name'
            && prop !== 'department'
            && prop !== 'brandID'
            && prop !== 'brand'
            && prop !== 'img'
            && prop !== 'price'
            && prop !== 'reviewCount'
            && prop !== 'rating'
            && prop !== 'hiddenByFilter'
            && prop !== 'discountPrice'
            && prop !== 'subDepartment'
            ){
                const dup = extraPanels.find(x => x === prop)
                if (!dup){
                    extraPanels.push(prop);            
                    filterPanels.push({
                        name: prop,
                        args: []
                    })
                }
            }
        }
    }

    //Create the FilterOptionsPanels
    const initialFilterOptionPanels: FilterOptionsPanel[] = []
    for (let x = 0; x < filterPanels.length; x++) {
        const panel = filterPanels[x]
        const options: FilterOption[] = (panel.name === "rating") ?
            RatingsCheckboxBuilder(productsCopy, panel.name) : (panel.name === "price") ?
            PricesCheckboxBuilder(productsCopy, panel.name) : BasicCheckBuilder(productsCopy, panel.name)
        initialFilterOptionPanels.push({
            propName: filterPanels[x].name,
            options: options
        })
    }

    //Remove FilterOptionsPanels if there is only one option and its qty is equal the the number of products
    const filterOptionsPanels = initialFilterOptionPanels.filter(x => x.options.length > 1 || x.options[0].quantity !== productsCopy.length)

    //Methods
    const _OnFilterRequest = () => {
        //Note: to save on syncing up a useState with a initial state
        //We can just go through all panels since 'checked' is not reset on re-renders
        for (let x = 0; x < filterPanels.length; x++) {
            const name = filterPanels[x].name
            const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`) as NodeList
            const args = []
            for (let y = 0; y < checkboxes.length; y++) {
                const input = checkboxes[y] as HTMLInputElement
                args.push(input.value)
            }
            filterPanels[x].args = args
        }

        //Call the parent compnent
        handleFilterChange(filterPanels)
    }

    const _OnResetFilters = () => {
        for (let x = 0; x < filterPanels.length; x++) {
            const name = filterPanels[x].name
            const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`) as NodeList
            for (let y = 0; y < checkboxes.length; y++) {
                const checkbox = checkboxes[y] as HTMLInputElement
                checkbox.checked = false
            }
        }

        //Call the parent compnent
        resetFilters()
    }

    //Render
    const data = filterOptionsPanels.map((item, index) => {
        return <FilterPanelBuilder
            optionsPanel={ item }
            onFilterRequest={ _OnFilterRequest }
            key= { index }
        />
    })

    return <section className="products-filter">
        <button
            type="button"
            className="reset-filters-btn"
            onClick={ _OnResetFilters }
        >
            RESET FILTERS
        </button>
        {data}
    </section>
}
//#endregion

//#region EXTERNAL FUNCTIONS
const BasicCheckBuilder = (products: ProductType[], propName: string): FilterOption[] => {
    const options: FilterOption[] = []

    for (let x = 0; x < products.length; x++){
        const indexProduct: {[index: string]:any} = products[x]
        const prop = indexProduct[propName]
        
        //Check is property exists in this product
        //For example 'Start Type' does not apply to grills, etc.
        if (!prop) continue

        //Either add quantity to an existing option or add a new one
        const duplicate = options.find(op => op.name === prop);
        if (duplicate){
            duplicate.quantity += 1
        }
        else {
            options.push({
                name: prop,
                quantity: 1
            });
        }
    }

    return options
}

const RatingsCheckboxBuilder = (products: ProductType[], propName: string): FilterOption[] => {
    const options = [
        { name: '1', quantity: 0 },
        { name: '1-2', quantity: 0 },
        { name: '2-3', quantity: 0 },
        { name: '3-4', quantity: 0 },
        { name: '4-5', quantity: 0 },
        { name: '5', quantity: 0 }
    ]

    for (let x = 0; x < products.length; x++){
        const rating = products[x].rating

        //Lower than 1 star
        if (rating < 1){
            options[0].quantity++
            continue
        }

        //1-2
        if (rating >= 1 && rating < 2){
            options[1].quantity++
            continue
        }

        //2-3
        if (rating >= 2 && rating < 3){
            options[2].quantity++
            continue
        }

        //3-4
        if (rating >= 3 && rating < 4){
            options[3].quantity++
            continue
        }

        //4-5
        if (rating >= 4 && rating < 5){
            options[4].quantity++
            continue
        }

        //5 stars
        options[5].quantity++
    }

    //Filter any options that have zero matches
    const fixedOptions = []
    for (let x = 0; x < options.length; x++){
        if (options[x].quantity > 0){
            fixedOptions.push(options[x]);
        }
    }

    return fixedOptions
}

const PricesCheckboxBuilder = (products: ProductType[], propName: string): FilterOption[] => {
    const options = [
        { name: 'Less than $50', quantity: 0 },
        { name: '$50 - $100', quantity: 0 },
        { name: '$100 - $250', quantity: 0 },
        { name: '$250 - $500', quantity: 0 },
        { name: '$500 - $1000', quantity: 0 },
        { name: '$1000 plus', quantity: 0 }
    ]

    for (let x = 0; x < products.length; x++){
        const price: (number | null) = products[x].discountPrice ? products[x].discountPrice : products[x].price
        if (price == null) continue

        //Less than $50
        if (price < 50){
            options[0].quantity++
            continue
        }

        //$50 - $100
        if (price >= 50 && price < 100){ 
            options[1].quantity++
            continue
        }

        //$100 - $250
        if (price >= 100 && price < 250){ 
            options[2].quantity++
            continue
        }

        //$250 - $500
        if (price >= 250 && price < 500){ 
            options[3].quantity++
            continue
        }

        //$500 - $1000
        if (price >= 500 && price < 1000){ 
            options[4].quantity++
            continue
        }

        //$1000 plus
        options[5].quantity++
    }

    //Filter any options that have zero matches
    const fixedOptions = []
    for (let x = 0; x < options.length; x++){
        if (options[x].quantity > 0){
            fixedOptions.push(options[x]);
        }
    }

    return fixedOptions
}
//#endregion

//#region EXTERNAL COMPONENTS
const FilterPanelBuilder: React.FC<ProductPageFiltersSubComProps> = ({ optionsPanel, onFilterRequest }) => {
    //Build the stylized name for the panel
    let name = optionsPanel.propName.replace("_", " ")
    name = name.charAt(0).toUpperCase() + name.slice(1)

    //Set class name
    const checkboxName = `${optionsPanel.propName}-header`

    //***Render***//
    return <div className="filter-panel">
        <input type="checkbox" className="filter-panel-header" name={ checkboxName } id={ checkboxName } value="default" />
        <label className='filter-panel-label' htmlFor= { checkboxName }><h1>{ name }</h1></label>
        <div className="filter-panel-content">
            <FilterButtonsBuilder optionsPanel={ optionsPanel } onFilterRequest={ onFilterRequest } />
        </div>
    </div>
}

const FilterButtonsBuilder: React.FC<ProductPageFiltersSubComProps> = ({ optionsPanel, onFilterRequest }) => {
    const items = optionsPanel.options.map((op, index) => {
        return <li className="panel-option" key={ index }>
            <input
                type="checkbox"
                name={ optionsPanel.propName }
                value={ op.name }
                id={ optionsPanel.propName+index }
                onChange={ onFilterRequest }
            />
            <label htmlFor={optionsPanel.propName+index}>
                {op.name} ({op.quantity})
            </label>
        </li>
    })

    //return options
    return <ul className="filter-panel-options">
        { items }
    </ul>
}
//#endregion

//*** EXPORTS ***//
export default ProductPageFilters