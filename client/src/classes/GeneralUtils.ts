import { SyntheticEvent } from 'react'
import { ProductSortType } from '../types/productTypes'

const GetCapitalizeWord = (val: string): string => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const GetSearchString = (e:SyntheticEvent<HTMLFormElement>): string => {
    e.preventDefault()
    const searchList = document.querySelectorAll<HTMLInputElement>(`input[type="search"]`)
    if (!searchList || searchList.length === 0) return ""

    const defaultSearch = searchList[0] as HTMLInputElement
    return defaultSearch.value.trim()
}

const GetProductSortType = (e: SyntheticEvent<HTMLSelectElement>): ProductSortType => {
    const target = e.target as HTMLSelectElement
    const selectedValue = target.options[target.selectedIndex].value
    switch (selectedValue) {
        case "R":
            return ProductSortType.Recommened
        case "T":
            return ProductSortType.Rating
        case "LowHigh":
            return ProductSortType.LowHigh
        case "HighLow":
            return ProductSortType.HighLow
        case "AZ":
            return ProductSortType.AZ
        case "ZA":
            return ProductSortType.ZA
    }

    return ProductSortType.Recommened;
}

export { GetCapitalizeWord, GetSearchString, GetProductSortType }