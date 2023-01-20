# TypeInfo 
#### Note: This has only been testet server-side with Deno + V8

This package provides Extended Type detection for an instantiated javascript object. The getTypes() function returns an object. The detected javascript data types are: 

- symbol
- string
- number
- bigint
- Date
- boolean
- Regexp
- object
- Array
- function
- User defined classes

as well as:

- null
- undefined


You should Note: 
- Since the data type lookup is done on an instantiated javascript object you will have to initialize the object with values that allow for detection of the type - 'null' and 'undefined' are by definition not very telling. In the same vain, it is not possible to assign multiple types to an object key.
- Some types like 'enum' in the TypeScript example below, as well all other non-primitive TypeScript types, are not detectable once compiled and assigned to a javascript object, but user defined classes are detected.
- This extented type detection has only been tested using the Deno default V8 (Typescript to) javascript compile target.

Given an instantiated object (the complete file can be found in the './examples' directory):

```
import { getTypes } from "../mod.ts"
(...)
const employee  = {
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
    scoreText: DirectionText.Up,
    image: new Image('Office'),
    image2: new Image2('Cubicle'),
    images: [ new Image('Table'),  new Image2('Computer') ]
}

const dataTypes = getTypes('Employee', employee)
console.log(JSON.stringify(dataTypes, undefined, 2))
```
and running it form within the examples directory: 

```
deno run ./examples/typeInfo.ts

```
produces the following output, where you should note:

- The resulting object will have the same nesting as the original.
- Even though the enum type is not detected, the correct type of the value assigned is found
- For an Array with multiple types are assigned, these types are correctly listed
- User defined classes are listed

```
{
  "name": "Employee",
  "desc": "Employee",
  "type": "object",
  "props": {
    "recId": {
      "desc": "Rec Id",
      "type": "symbol"
    },
    "employeeNumber": {
      "desc": "Employee Number",
      "type": "bigint"
    },
    "lastName": {
      "desc": "Last Name",      
      "type": "string"
    },
    "firstName": {
      "desc": "First Name",     
      "type": "string"
    },
    "extension": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "officeCode": {
      "desc": "Office Code",
      "type": "undefined"
    },
    "reportsTo": {
      "desc": "Reports To",
      "type": "null"
    },
    "jobTitle": {
      "desc": "Job Title",
      "type": "string"
    },
    "hired": {
      "type": "Date",
      "props": {}
    },
    "active": {
      "type": "boolean"
    },
    "regexp": {
      "type": "RegExp",
      "props": {}
    },
    "tools": {
      "type": "Array",
      "props": {
        "0": {
          "type": "string"
        },
        "1": {
          "type": "number"
        },
        "2": {
          "type": "symbol"
        }
      }
    },
    "scoreText": {
      "desc": "Score Text",
      "type": "string"
    },
    "image": {
      "type": "Image",
      "props": {
        "name": {
          "type": "string"
        },
        "format": {
          "type": "string"
        }
      }
    },
    "image2": {
      "desc": "Image 2",
      "type": "Image2",
      "props": {
        "name": {
          "type": "string"
        },
        "format": {
          "type": "string"
        },
        "score": {
          "type": "number"
        }
      }
    },
    "images": {
      "type": "Array",
      "props": {
        "0": {
          "type": "Image",
          "props": {
            "name": {
              "type": "string"
            },
            "format": {
              "type": "string"
            }
          }
        },
        "1": {
          "type": "Image2",
          "props": {
            "name": {
              "type": "string"
            },
            "format": {
              "type": "string"
            },
            "score": {
              "type": "number"
            }
          }
        }
      }
    }
  }
}
```
