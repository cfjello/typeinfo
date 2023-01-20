import { ObjectDepth } from './ObjectDepth.ts'
import { flatten } from 'https://raw.githubusercontent.com/hughsk/flat/master/index.js'
import { unCamel } from "./unCamel.ts"

type ResType = {
    name?: string,
    desc?: string,
    type: string,
    props?: Record<string | number, ResType>,
}

type PointerType = {
    key:       string | number,
    entry:     ResType,
    isArray:   boolean
}

const primitiveTypes = [ 'string', 'boolean', 'number', 'bigint', 'null', 'undefined', 'symbol' ]
/**
 * Finds a more specific type for a given property in an JS object
 * The function vs. Function trick in inspectObject is courtesy of mozilla, 
 * but updated to work with current V8
 * 
 * @param obj The object to be examined
 * @returns string  The property type 
 */
// deno-lint-ignore no-explicit-any
const inspectObject = (obj: any| null ): string => { 
    if (obj == null) { return 'null' }
    let matchType = typeof obj as string
    const proto = Object.getPrototypeOf(obj)

    // Check for Classes an Functions 
    if ( proto && proto.constructor && proto.constructor.name !== 'Object' ) {
        matchType = proto.constructor.name 
    }
    // Make the destinction between Function and function - in V8 it seems that 
    // Function has a storeName property value: {"value":"anonymous","writable":false,"enumerable":false,"configurable":true} 
    // where function has a storeName property value with an actual function storeName: {"value":"G","writable":false,"enumerable":false,"configurable":true}
    //
    // V8 for some reason changed 'storeName' to 'name'
    if ( matchType === 'Function' && Object.getOwnPropertyDescriptor(obj, 'name')?.value !== 'anonymous' ) {
        matchType = 'function'
    }
    return matchType;
}

/**
 * Finds the types of an object with assigned values
 * 
 * @param name The object to be examined
 * @returns string  The property type 
 */
export function getTypes<T>(  name: string, masterObj: T, flat = false ): Record<string, unknown> {
    const res = {
        name: name,
        // desc: unCamel(name),
        type: "object",
        props: {},
    } as ResType

    const resMap = new Map<string, ResType>().set('root', res)
    
    try {   
        const objDepth = new ObjectDepth(masterObj)
       
        objDepth.keys.forEach( path => {
            // Find the object name and the parent object path
            const pos = path.lastIndexOf('.')
            const objName  = path.substring( pos + 1 )
            let parent  = 'root'
            if (  path.includes('.') ) parent = path.substring( 0,  pos )

            // Find the type of the current object path
            const currObj = objDepth.getRefByPath(path)
            let currType  =  typeof  currObj as string
            if ( currType === 'object' || currType === 'function' ) {
                currType = inspectObject(currObj).toString() as string
            }

            // Build the result object
            const propObj: Partial<ResType> = {}
            const desc = unCamel(objName)
            if ( desc.length > objName.length ) propObj.desc =  desc 
            propObj.type = currType
            if ( ! primitiveTypes.includes(currType) ) propObj.props = {}

            // Store the result
            resMap.get(parent)!.props![objName] = propObj as ResType
            resMap.set(path, propObj as ResType)
        })
    }   
    catch(err) {
        console.error(err)
    }
    if ( flat ) 
        return flatten(res) as Record<string, unknown>
    else 
        return res
}