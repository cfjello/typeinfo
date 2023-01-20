import {  getTypes } from "../TypeInfo.ts"
import { expect }  from 'https://deno.land/x/expect/mod.ts'

function G() { }

const functionProperties0 = {
    field_01: async function(){ return await 1 },
    field_02: function getField_01() { return 1},
    field_03: new Function( 'a', 'b' , 'console.log( "Bitte, do nothing" )'),
    field_04: () => { return 1 },
    field_05: G,
    // field_09: decodeURIComponent(encodeURIComponent('шеллы')),
}


Deno.test( {
    name: '00 - Funtion Properties inferred correctly', 
    fn: () => {
        // deno-lint-ignore no-explicit-any
        const p: any  = getTypes('functionProperties', functionProperties0)
        expect(p.props!.field_01.type).toEqual("AsyncFunction")
        expect(p.props!.field_02.type).toEqual("function")
        expect(p.props!.field_03.type).toEqual("Function")
        expect(p.props!.field_04.type).toEqual("function")
        expect(p.props!.field_05.type).toEqual("function")
    },
    sanitizeResources: false,
    sanitizeOps: false
})

const valueProperties = {
    field_01: Infinity,
    field_02: NaN,
    field_03: undefined,
    field_04: globalThis
}

Deno.test( {
    name: '01 - Value Properties inferred correctly', 
    fn: () => {
        // deno-lint-ignore no-explicit-any
        let p: any  = getTypes('valueProperties', valueProperties)
        expect(p.props!.field_01.type).toEqual("number")
        expect(p.props!.field_02.type).toEqual("number")
        expect(p.props!.field_03.type).toEqual("undefined")
        expect(p.props!.field_04.type).toEqual("Window")
    },
    sanitizeResources: false,
    sanitizeOps: false
})

const functionProperties = {
    field_01: eval('2 + 2'),
    field_02: parseInt('0xF', 16) ,
    field_03: isFinite(1000 / 17),
    field_04: isNaN( NaN ),
    field_05: parseFloat( '4.567' ) * 2.0 * Math.PI,
    field_06: encodeURI('https://mozilla.org/?x=шеллы'),
    field_07: decodeURI(encodeURI('https://mozilla.org/?x=шеллы')),
    field_08: encodeURIComponent('шеллы'),
    field_09: decodeURIComponent(encodeURIComponent('шеллы')),

}

Deno.test( {
    name: '02 - Funtion Properties inferred correctly', 
    fn: () => {
        // deno-lint-ignore no-explicit-any
        const p: any  = getTypes('functionProperties', functionProperties)
        expect(p.props!.field_01.type).toEqual("number")
        expect(p.props!.field_02.type).toEqual("number")
        expect(p.props!.field_03.type).toEqual("boolean")
        expect(p.props!.field_04.type).toEqual("boolean")
        expect(p.props!.field_05.type).toEqual("number")
        expect(p.props!.field_06.type).toEqual("string")
        expect(p.props!.field_07.type).toEqual("string")
        expect(p.props!.field_08.type).toEqual("string")
        expect(p.props!.field_09.type).toEqual("string")
    },
    sanitizeResources: false,
    sanitizeOps: false
})

const arrayTypes = {
    field_01: new Int8Array(8),
    field_02: new Uint8Array(8),
    field_03: new Uint8ClampedArray(8),
    field_04: new Int16Array(8),
    field_05: new Float32Array(8),
    field_06: new Float64Array(8),
    field_07: new Uint32Array(8),
    field_08: new BigInt64Array(8),
    field_09: new BigUint64Array(8),
}

Deno.test( {
    name: '03 - Array Properties inferred correctly', 
    fn: () => {
        // deno-lint-ignore no-explicit-any
        const p: any  = getTypes('arrayTypes', arrayTypes)
        expect(p.props!.field_01.type).toEqual("Int8Array")
        expect(p.props!.field_02.type).toEqual("Uint8Array")
        expect(p.props!.field_03.type).toEqual("Uint8ClampedArray")
        expect(p.props!.field_04.type).toEqual("Int16Array")
        expect(p.props!.field_05.type).toEqual("Float32Array")
        expect(p.props!.field_06.type).toEqual("Float64Array")
        expect(p.props!.field_07.type).toEqual("Uint32Array")
        expect(p.props!.field_08.type).toEqual("BigInt64Array")
        expect(p.props!.field_09.type).toEqual("BigUint64Array")

    },
    sanitizeResources: false,
    sanitizeOps: false
})

const keyedTypes = {
    field_01: new Map(),
    field_02: new Set().add({a: 1, b: 2}),
    field_03: new WeakMap(),
    field_04: new WeakSet().add({a: 1, b: 2}),
}

Deno.test( {
    name: '04 - Keyed Collections are inferred correctly', 
    fn: () => {
        // deno-lint-ignore no-explicit-any
        const p: any  = getTypes('keyedTypes', keyedTypes)
        expect(p.props!.field_01.type).toEqual("Map")
        expect(p.props!.field_02.type).toEqual("Set")
        expect(p.props!.field_03.type).toEqual("WeakMap")
        expect(p.props!.field_04.type).toEqual("WeakSet")
    },
    sanitizeResources: false,
    sanitizeOps: false
})

const structuredData = {
    field_01: new Int8Array(8),
    field_02: new Uint8Array(8),
    field_03: new Uint8ClampedArray(8),
    field_04: new Int16Array(8),
    field_05: new Float32Array(8),
    field_06: new Float64Array(8),
    field_07: new Uint32Array(8),
    field_08: new BigInt64Array(8),
    field_09: new BigUint64Array(8),
}

Deno.test( {
    name: '05 - structuredData is inferred correctly', 
    fn: () => {
        // deno-lint-ignore no-explicit-any
        const p: any  = getTypes('structuredData', structuredData)
        expect(p.props!.field_01.type).toEqual("Int8Array")
        expect(p.props!.field_02.type).toEqual("Uint8Array")
        expect(p.props!.field_03.type).toEqual("Uint8ClampedArray")
        expect(p.props!.field_04.type).toEqual("Int16Array")
        expect(p.props!.field_05.type).toEqual("Float32Array")
        expect(p.props!.field_06.type).toEqual("Float64Array")
        expect(p.props!.field_07.type).toEqual("Uint32Array")
        expect(p.props!.field_08.type).toEqual("BigInt64Array")
        expect(p.props!.field_09.type).toEqual("BigUint64Array")
    },
    sanitizeResources: false,
    sanitizeOps: false
})

/*
const controlAbstractionTypes = {
    field_01: new Int8Array(8),
    field_02: new Uint8Array(8),
    field_03: new Uint8ClampedArray(8),
    field_04: new Int16Array(8),
    field_05: new Float32Array(8),
    field_06: new Float64Array(8),
    field_07: new Uint32Array(8),
    field_08: new BigInt64Array(8),
    field_09: new BigUint64Array(8),
}

Deno.test( {
    name: '06 - controlAbstractionTypes are inferred correctly', 
    fn: () => {
        // deno-lint-ignore no-explicit-any
        const p: any  = getTypes('controlAbstractionTypes', controlAbstractionTypes)
        expect(p.props!.field_01.type).toEqual("Int8Array")
        expect(p.props!.field_02.type).toEqual("Uint8Array")
        expect(p.props!.field_03.type).toEqual("Uint8ClampedArray")
        expect(p.props!.field_04.type).toEqual("Int16Array")
        expect(p.props!.field_05.type).toEqual("Float32Array")
        expect(p.props!.field_06.type).toEqual("Float64Array")
        expect(p.props!.field_07.type).toEqual("Uint32Array")
        expect(p.props!.field_08.type).toEqual("BigInt64Array")
        expect(p.props!.field_09.type).toEqual("BigUint64Array")
    },
    sanitizeResources: false,
    sanitizeOps: false
})
*/ 
 type ProductlinesType = {
    productLine: string;
    textDescription?: string;
    htmlDescription?: string;
    image?: string | null;
} // End of productlinesType


export type ProductsType = {
    productCode: symbol;
    productName: string;
    productLine: ProductlinesType;
    productScale: string;
    productVendor: string;
    productDescription: string;
    quantityInStock: number;
    buyPrice: number;
    MSRP: number;
} // End of productsType

const products: ProductsType = {
    productCode: Symbol("ID"),
    productName: "Guitarstring",
    productLine: {
        productLine: "Music",
        textDescription: "Music Store Inc.",
        htmlDescription: "<p>Deine Mega Store ins Germania<p>",
        image: null,
    },
    productScale: "46",
    productVendor: "Fender",
    productDescription: "A-String",
    quantityInStock:999,
    buyPrice: 10,
    MSRP: 999,
}

Deno.test( {
    name: '06 - Types should be inferred correctly', 
    fn: () => {
        // deno-lint-ignore no-explicit-any
        const p: any  = getTypes('ProductType7', products)
        // console.debug(`07 JSON: ${JSON.stringify(p, undefined, 4)}`)
        expect(p.props!.productCode.type).toEqual("symbol")
        expect(p.props!.productName.type).toEqual("string")
        expect(p.props!.quantityInStock.type).toEqual("number")
        expect(p.props!.productLine.props.image.type).toEqual("null")
    
    },
    sanitizeResources: false,
    sanitizeOps: false
})

enum Direction {
    Up,
    Down,
    Out,
 }

enum DirectionText {
    Up = "UP",
    Down = "DOWN",
    Out = "OUT",
}     

export type EmployeesType = {
    recId: symbol,
	employeeNumber: bigint;
	lastName: string;
	firstName: string;
	extension: string;
	email: string;
	officeCode: string | undefined;
	reportsTo?: number | null;
    jobTitle: string;
    hired: Date;
    active: boolean;
    regexp: RegExp,
    tools: string[],
    score: Direction.Down,
    scoreText: DirectionText,
    error: Error,
    // deno-lint-ignore no-explicit-any
    infinit: any;
    // deno-lint-ignore no-explicit-any
    nan: any;
} // End of employeesType

const employee: EmployeesType = {
    recId: Symbol('REC-ID'),
    employeeNumber: BigInt(9007199254740991),
	lastName: "Hope",
	firstName: "Bob",
	extension: "A",
	email: "bob.hope@heaven.com",
	officeCode: undefined,
	reportsTo: null,
    jobTitle: "BS Manager",
    hired: new Date(2018, 11, 24, 10, 33, 30, 0),
    active: true,
    regexp: /^.*XXX.*$/,
    tools: ['pen', 'table', 'laptop'],
    score: Direction.Down,
    scoreText: DirectionText.Up,
    error: new Error('Assigning blame'),
    infinit: Infinity,
    nan: NaN
}

Deno.test( {
    name: '07 - Javascript specific Types should be inferred correctly', 
    fn: () => {
        // deno-lint-ignore no-explicit-any
        const p: any  = getTypes('Employee', employee)
        expect(p.props!.recId.type).toEqual("symbol")
        expect(p.props!.lastName.type).toEqual("string")
        expect(p.props!.employeeNumber.type).toEqual("bigint")
        expect(p.props!.officeCode.type).toEqual("undefined")
        expect(p.props!.hired.type).toEqual("Date")
        expect(p.props!.regexp.type).toEqual("RegExp")
        expect(p.props!.tools.type).toEqual("Array")
        expect(p.props!.tools.props[0].type).toEqual("string")
        expect(p.props!.tools.props[2].type).toEqual("string")
        expect( p.props!.error.type ).toEqual('Error')
        expect( p.props!.infinit.type ).toEqual('number')
        expect( p.props!.nan.type ).toEqual('number')
    },
    sanitizeResources: false,
    sanitizeOps: false
})

export type EmployeesType2 = {
    recId: symbol,
	employeeNumber: bigint;
	lastName: string;
	firstName: string;
	extension: string;
	email: string;
	officeCode: string | undefined;
	reportsTo?: number | null;
    jobTitle: string;
    hired: Date;
    active: boolean;
    regexp: RegExp,
    tools: any[],
    score: Direction.Down,
    scoreText: DirectionText
} // End of employeesType

const employee2: EmployeesType2 = {
    recId: Symbol('REC-ID'),
    employeeNumber: BigInt(9007199254740991),
	lastName: "Hope",
	firstName: "Bob",
	extension: "A",
	email: "bob.hope@heaven.com",
	officeCode: undefined,
	reportsTo: null,
    jobTitle: "BS Manager",
    hired: new Date(2018, 11, 24, 10, 33, 30, 0),
    active: true,
    regexp: /^.*XXX.*$/,
    tools: ['pen', 10, Symbol('ARR-ID')],
    score: Direction.Down,
    scoreText: DirectionText.Up,
}


Deno.test( {
    name: '08 - Javascript multiple typed should be inferred correctly', 
    fn: () => {
        // deno-lint-ignore no-explicit-any
        let p: any  = getTypes('Employee', employee2)
        expect( p.props!.tools.props[0].type ).toEqual('string')
        expect( p.props!.tools.props[1].type ).toEqual('number')
        expect( p.props!.tools.props[2].type ).toEqual('symbol')
    },
    sanitizeResources: false,
    sanitizeOps: false
})

type ProductlinesType2 = {
    productLine: string;
    textDescription?: string;
    htmlDescription?: string;
    // deno-lint-ignore ban-types
    renderFunc: Function,
    // deno-lint-ignore ban-types
    genFunc: Function;
    typedArray: Int8Array;
} // End of productlinesType

const productLine2: ProductlinesType2 =   {
    productLine: "Guitars",
    textDescription: "Music Store Inc.",
    htmlDescription: "<p>Deine Mega Store<p>",
    renderFunc: new Function( 'a', 'b' , 'console.log( "Bitte, do nothing" )'),
    genFunc: function* generator() {
        yield 1;
        yield 2;
        yield 3;
      },
    typedArray: new Int8Array(8)
}

Deno.test( {
    name: '09 - Javascript functions should be inferred correctly', 
    fn:  () => {
        // deno-lint-ignore no-explicit-any
        const p: any  = getTypes('ProductLine', productLine2)
        expect( p.props!.renderFunc.type ).toEqual('Function')
        expect( p.props!.genFunc.type ).toEqual('GeneratorFunction')
        expect( p.props!.typedArray.type ).toEqual('Int8Array')
    },
    sanitizeResources: false,
    sanitizeOps: false
})

class Image {
    constructor( public name: string, public format: string  = "jpeg") {}
    getName() { return this.name }
    setName(name: string) { this.name = name}
}


class Image2 extends Image {
    public score = 0
    constructor( name: string, format: string  = "jpeg") { 
        super(name, format )
    }
    getScore() { return this.score }
    setScore(points: number) { this.score += points}
}


const productLine3 =   {
    productLine: "Guitars",
    textDescription: "Music Store Inc.",
    htmlDescription: "<p>Deine Mega Store<p>",
    image: new Image('Mona Lisa'),
    image2: new Image2('Donna Pisa'),
    images: [ new Image('Miss Timbuktu'),  new Image2('Kalinka Moscova') ]
}

Deno.test( {
    name: '10 - Javascript classes should be inferred correctly', 
    fn:  () => {
        // deno-lint-ignore no-explicit-any
        let p: any  = getTypes('ProductLine3', productLine3)  
        // console.debug(`12 JSON: ${JSON.stringify(p, undefined, 4)}`)
        expect( p.props!.image.type ).toEqual('Image')
        expect( p.props!.image2.type ).toEqual('Image2')
        expect( p.props!.images.props["1"].type ).toEqual('Image2')
        // expect( p.required.includes('images')).toEqual(true)  
        
    },
    sanitizeResources: false,
    sanitizeOps: false
})

Deno.test( {
    name: '11 - Javascript class property types should be inferred correctly', 
    fn: () => {
        const image = new Image('Mona Lisa')
        // deno-lint-ignore no-explicit-any
        const p: any  = getTypes('Image', image)  
        expect( p.props!.name.type ).toEqual('string')
        expect( p.props!.format.type ).toEqual('string')
        // expect( p.props!.setName.type ).toEqual('function')
        
    },
    sanitizeResources: false,
    sanitizeOps: false
})

type ProductlinesType4 = {
    productLine: string;
    html: {
        textDescription?: string;
        htmlDescription?: string[];
    },
    image?: string | null;
} // End of productlinesType


export type ProductsType4 = {
    productCode: symbol;
    productName: string;
    productLine: ProductlinesType4;
    productScale: string;
    productVendor: string;
    productDescription: string;
    stockInfo: {
        quantityInStock: number;
        buyPrice: number;
        MSRP: number;
    }
} // End of productsType

const products4: ProductsType4 = {
    productCode: Symbol("ID"),
    productName: "Guitarstring",
    productLine: {
        productLine: "Music",
        html: {
            textDescription: "Music Store Inc.",
            htmlDescription: [
                "<h1>Deine Mega Store ins Germania</h1>",
                "<p>Wird sind ein SuperStore</p>"
            ],
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
}

// deno-lint-ignore no-explicit-any
type ProductsType2 = ProductsType & { tools: any [],}

const products2: ProductsType2 = {
    productCode: Symbol("ID"),
    productName: "Guitarstring",
    productLine: {
        productLine: "Music",
        textDescription: "Music Store Inc.",
        htmlDescription: "<p>Deine Mega Store ins Germania<p>",
        image: null,
    },
    productScale: "46",
    productVendor: "Fender",
    productDescription: "A-String",
    quantityInStock:999,
    buyPrice: 10,
    MSRP: 999,
    tools: ['pen', 10, Symbol('ARR-ID'), [ 'pencil', 11 , { subOb: 'L3 object'}]]
}

Deno.test( {
    name: '12 - The generated type read allEntries in an Array', 
    fn: () => {
       // deno-lint-ignore no-explicit-any
        const p: any  = getTypes('ProductType2', products2) 
        // console.debug(`12 JSON: ${JSON.stringify(p, undefined, 4)}`)
        expect( p.props!.tools.type ).toEqual('Array')
        expect( p.props!.tools.props['3'].type  ).toEqual('Array')
        expect( p.props!.tools.props['3'].props['2'].type ).toEqual('object')
        expect( p.props!.tools.props['3'].props['2'].props.subOb.desc ).toEqual('Sub Ob')
    },
    sanitizeResources: false,
    sanitizeOps: false
})


Deno.test( {
    name: '13 - TypeInfo can generate a flattened response object', 
    fn: () => {
       // deno-lint-ignore no-explicit-any
        const p: any  = getTypes('ProductType2', products2, true) 
        // console.debug(`13 JSON: ${JSON.stringify(p, undefined, 4)}`)
        expect( p["props.tools.props.3.type"] ).toEqual('Array')
        expect( p["props.tools.props.3.props.2.props.subOb.desc"] ).toEqual('Sub Ob')
    },
    sanitizeResources: false,
    sanitizeOps: false
})
