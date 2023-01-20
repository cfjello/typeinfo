export function unCamel( str: string )  {
    let res = '' 
    str.split('').forEach( ( c, i ) => {
        if ( i === 0  )
            res += c.toUpperCase() 
        else if  ( c === c.toUpperCase() && ! c.match(/\s/) ) {
            const prev = res[res.length-1]
            if ( prev.match(/\s/) || prev === prev.toUpperCase() ) 
                res += c
            else
                res += ' ' + c // .toLowerCase(); 
        }
        else {
            res += c
        }
    })
    return res
}

// console.log( unCamel( "thisCamelHasManyBumps") )
// console.log( unCamel( "thisCamelHasToManyBumpsAndLivesIn Vanløse Copenhagen") )