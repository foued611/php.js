/* 
* @author Niklas von Hertzen <niklas at hertzen.com>
* @created 22.7.2012 
* @website http://hertzen.com
 */
PHP.Modules.prototype.unserialize = function( valueObj ) {

    var COMPILER = PHP.Compiler.prototype,
    unserialize = "unserialize",
    VARIABLE = PHP.VM.Variable.prototype;


    var value =  valueObj[ COMPILER.VARIABLE_VALUE ],
    parts = value.split(":");
    
    
    var item, pos, len, val;
    
    switch( parts[ 0 ]) {
        case "C":
            
            item = new (this.$Class.Get( parts[ 2 ].substring(1, parts[ 2 ].length - 1 ) ))( true );
            pos = 6 + parts[ 1 ].length + (parts[ 1 ]-0);
            
            break;
        case "N;":
            item = null;
            pos = 2;
            break;
    }
    

    
    value = value.substring( pos );
    
    while( value.length > 0 ) {
       var pos = value.indexOf(":");
       if (pos !== -1) {
           len = value.substring( 0, pos );
       } else {
           break;
       }
       value = value.substring( len.length + 1 );
       val = value.substr( 1, len  );
       value = value.substring( val.length + 2);
     
        
        
    }
    


    if(  item !== null && (item[ PHP.VM.Class.METHOD + unserialize] ) !== undefined ) {
        item[ COMPILER.METHOD_CALL ]( this, unserialize, new PHP.VM.Variable( val ) );
            
    }
    


    return new PHP.VM.Variable( item );
        


};


