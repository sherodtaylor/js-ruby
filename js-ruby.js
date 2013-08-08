(function(){
  var root = this;

  var
    ArrayProto = Array.prototype,
    ObjProto = Object.prototype,
    FunctProto = Function.prototype;


  var Ruby = root.Ruby =  function(obj) {
    if (obj instanceof Ruby) return obj;
    if (!(this instanceof Ruby)) return new Ruby(obj);
    this._wrapped = obj;
  };

  Ruby.keys = function (obj){
    var keys = [];
    for ( var key in obj ){
      keys.push(key);
    }
    return keys;
  }

  var each = Ruby.each = function ( list, iterator, context ){
    if ( list == null ) return;
    if (  Array.isArray(list)){
      for ( var i = 0; i < list.length; i++ ){
        var element = list[i],
            index = i;
        iterator.call(context, element, index, list);
      }
    } else if ( typeof list === "object" ){
      var keys = Ruby.keys(list);
      for ( var i = 0; i < keys.length; i++ ){
        var key = keys[i],
            value = list[key],
            index = i;
        iterator.call(context, value, key, index, list);
      };
    };
  };

  var map = Ruby.map = Ruby.collect = function ( list, iterator, context ){
    var array = [];
    each( list, function ( val ){
      var newValue = iterator.call( context, val );
      array.push(newValue);
    });
    return array;
  };

  var reduce = Ruby.inject = Ruby.reduce = Ruby.inject = function ( list, iterator, memo, context ){
    each( list, function ( val, index ){
      memo = iterator.call( context, memo, val, index , list );
    });
    return memo
  };

}).call(this);
