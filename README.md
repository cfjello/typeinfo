# TypeInfo 
#### Note: This has only been testet server-side with Deno V8

This package provides Extended Type Detection for an instantiated javascript object. The `getTypes()` function traverses a single- or multi-level user defined object and returns another object showing the inferred types. The detected javascript data types are: 

- symbol
- string
- number
- bigint
- Date
- boolean
- Regexp
- object
- Array, including typed arrays like `Int16Array`
- function
- null
- undefined

as well as:
- User defined classes

You should Note: 
- This implementation uses `Object.getPrototypeOf(obj).constructor.name` when dealing with classes, a field that has not always been present in the past, as well as the V8 parameter `Object.getOwnPropertyDescriptor(obj, 'name').value`, which used to be called `storeName` and thus may as well be subject to change in the future.
- Since the data type lookup is done on an instantiated javascript object you will have to initialize the object with values that allow for detection of the type - 'null' and 'undefined' are by definition not very telling. In the same vain, it is not possible to assign multiple types to an object key.
- Some types like 'enum' in the TypeScript example below, as well all other non-primitive TypeScript types, are not detectable once compiled to javascript, and only the assigned value type can be found.
- User defined classes are detected.

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
The call format is `getTypes('Employee', employee, false)` and the arguments are:
  1) *name*: Your name for the type object
  2) *obj*:  The object to infer types from
  3) *flatten*: if set to `true` the returned object will be flattened (the default is 'false').

Try running the example: 
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
Calling  `getTypes('Employee', employee, true)` will return:
```
{
  "name": "Employee",
  "type": "object",
  "props.recId.desc": "Rec Id",
  "props.recId.type": "symbol",
  "props.employeeNumber.desc": "Employee Number",
  "props.employeeNumber.type": "bigint",
  "props.lastName.desc": "Last Name",
  "props.lastName.type": "string",
  "props.firstName.desc": "First Name",
  "props.firstName.type": "string",
  "props.extension.type": "string",
  "props.email.type": "string",
  "props.officeCode.desc": "Office Code",
  "props.officeCode.type": "undefined",
  "props.reportsTo.desc": "Reports To",
  "props.reportsTo.type": "null",
  "props.jobTitle.desc": "Job Title",
  "props.jobTitle.type": "string",
  "props.hired.type": "Date",
  "props.hired.props": {},
  "props.active.type": "boolean",
  "props.regexp.type": "RegExp",
  "props.regexp.props": {},
  "props.tools.type": "Array",
  "props.tools.props.0.type": "string",
  "props.tools.props.1.type": "number",
  "props.tools.props.2.type": "symbol",
  "props.scoreText.desc": "Score Text",
  "props.scoreText.type": "string",
  "props.image.type": "Image",
  "props.image.props.name.type": "string",
  "props.image.props.format.type": "string",
  "props.image2.desc": "Image 2",
  "props.image2.type": "Image2",
  "props.image2.props.name.type": "string",
  "props.image2.props.format.type": "string",
  "props.image2.props.score.type": "number",
  "props.images.type": "Array",
  "props.images.props.0.type": "Image",
  "props.images.props.0.props.name.type": "string",
  "props.images.props.0.props.format.type": "string",
  "props.images.props.1.type": "Image2",
  "props.images.props.1.props.name.type": "string",
  "props.images.props.1.props.format.type": "string",
  "props.images.props.1.props.score.type": "number"
}
```