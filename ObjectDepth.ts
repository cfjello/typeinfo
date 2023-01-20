import { assert } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { flatten } from 'https://raw.githubusercontent.com/hughsk/flat/master/index.js'
//
// Find the depth and paths of a given user Object
//
export class ObjectDepth {
    flat =  new Map()
    keys = [] as string[]
    
    // deno-lint-ignore no-explicit-any
    constructor ( private obj: any ) {
        try {
            Object.entries(flatten(obj)).forEach( ( [path, _val] ) => {
                let subPath = ''
                path.split('.').forEach( (part, i) => {
                    subPath = i === 0 ? part : subPath + '.' + part
                    if ( ! this.flat.has(part) ) this.flat.set(subPath, this.getRefByPath(subPath))
                })
            })
            this.keys = Array.from(this.flat.keys())
        }
        catch(err) {
            console.error(err)
        }
    }

    getDepth = ( path = '' ): number =>{
        assert( path === '' ||  this.flat!.has(path), `ObjectDepth.getDepth() - path: '${path} does not exist`)
        let res = 1
        if(this.keys.length === 0) 
            res = 1
        else {
            if ( path === '' ) {
                const depthOfKeys = this.keys.map(key => key.split(".").length)
                res = Math.max(...depthOfKeys)
            }
            else {
                if ( this.flat!.has(path) ) {
                     res = path.split(".").length
                }
            }
        }
        return res
    }

    getJSON() {
        return JSON.stringify(this.flat, undefined,4)
    }

    // deno-lint-ignore no-explicit-any
    getRefByPath( _path = ''): any  {
        let objRef = this.obj
        if ( _path !== '' ) {
            const path= _path.split('.')
            for (let i=0, len=path.length; i<len; i++) {
                objRef = objRef[path[i]]
            }
        }
        return objRef
    }
}
