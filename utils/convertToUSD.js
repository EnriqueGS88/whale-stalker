const convertToUSD = ( text ) => {
            
    // if K = * 1000
    // if EUR = * 1.1
    // if EUR = delete sign
    // if $ = delete sign
    // if .  = move decimal

    let noEuro = text.replace('€', '');
    let noSign = noEuro.replace( '$', '' );
    
    
    const decimals = noSign.length - noSign.indexOf( '.' ) - 1 ;

    console.log( "decimals ", decimals );




//    let thousands = noDollar.replace( 'K', '000' );
//    let millions = thousands.replace( 'M', '000000');
//    let millionsWithoutDecimals = millions.replace( '.', '' );
   
//    let value = Number( millionsWithoutDecimals );
//    console.log( value );

//    return value;

};

convertToUSD( '$21.1' );