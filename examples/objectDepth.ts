import { ObjectDepth } from "../mod.ts"

// USAGE Example
type ProductlinesType = {
    productLine: string;
    html: {
        textDescription?: string;
        htmlDescription?: string[];
    },
    image?: string | null;
} // End of productlinesType


export type ProductsType = {
    productCode: symbol;
    productName: string;
    productLine: ProductlinesType;
    productScale: string;
    productVendor: string;
    productDescription: string;
    stockInfo: {
        quantityInStock: number;
        buyPrice: number;
        MSRP: number;
    }
} // End of productsType


const product: ProductsType = {
    productCode: Symbol("EXAMPLE"),
    productName: "Guitarstring",
    productLine: {
        productLine: "Music",
        html: {
            textDescription: "Music Store Inc.",
            htmlDescription: [
                "<h1>Deine Mega Music Store ins Germania</h1>",
                "<p>Wird sind ein SuperStore</p>"
            ] as string[],
        },
        image: null,
    },
    productScale: "46",
    productVendor: "Fender",
    productDescription: "A-String",
    stockInfo: {
        quantityInStock:999,
        buyPrice: 10,
        MSRP: 999,
    }
} as const

const depth = new ObjectDepth(product)
console.log( `Object Depth: ${depth.getDepth()}`)
console.log('\Display the flattened Object:')
for ( const [key,val] of depth.flat! ) {
    console.log( `\t${key}: ${typeof val === 'symbol' ? "symbol (no displayable value)" : JSON.stringify(val) }`)
}
console.log( 'Fetch a field using the path')
console.log(`\tGetRefByPath( "productLine.html.htmlDescription.1" ): ${depth.getRefByPath("productLine.html.htmlDescription.1")}`)
