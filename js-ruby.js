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
  };


/*
 * Collection Methods
 */

  var each = Ruby.each = function ( list, iterator, context ){
    if ( list === null ) return;
    if ( Array.isArray(list) ){
      for ( var _i = 0; _i < list.length; _i++ ){
        iterator.call(context, list[_i], _i, list);
      }
    } else if ( typeof list === "object" ){
      var keys = Ruby.keys(list);
      for ( var prop in list ){
        iterator.call(context, list[prop], prop, list);
      }
    }
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
    return memo;
  };

  // I would use
  var find = Ruby.find = Ruby.detect = function ( list, iterator, context ){
    if ( Array.isArray(list) ){
      for ( var i = 0; i < list.length; i++ ){
        if ( iterator.call(context, list[i], list) ){
          return list[i];
        }
      }
    } else {
      for ( var prop in list ){
        if ( iterator.call(context, list[prop], list) ){
          return list[prop];
        }
      }
    }
  };

  var filter = Ruby.filter = Ruby.select = function ( list, iterator, context ){
   var array = [];
   each( list, function ( val ){
     if ( iterator.call( context, val ) ){
       array.push(val);
     }
   });
   return array;
  };

  var where = Ruby.where = function ( list, properties ){
    var array = [],
        truth = false;
    each( list, function ( val ){
      var propKeys = Ruby.keys(properties),
          valKeys = Ruby.keys(val);
      each( propKeys, function ( key ){
        if ( val[key] === properties[key] ){
          truth = true;
        }
      });
      if ( truth === true ){
        array.push(val);
        truth = false;
      }
    });
    return array;
  };

  var findWhere = Ruby.findWhere = function (list, properties){
    return where(list, properties)[0];
  };

  var reject = Ruby.reject = function ( list, iterator, context ){
    var array = [];
    each(list, function ( val ){
      if ( !iterator.call(context, val) ){
        array.push(val);
      }
    });
    return array;
  };

  var every = Ruby.every = Ruby.all = function ( list, iterator, context ){
    var failed = false;
    each(list, function ( val ){
      if ( !iterator.call(context, val) ){
        failed = true;
      }
    });
    return !failed;
  };

  var some = Ruby.some = Ruby.any = function ( list, iterator, context ){
    var passed = false;
    each(list, function ( val ){
      if ( iterator.call(context, val) ){
        passed = true;
      }
    });
    return passed;
  };

  var contains = Ruby.contains = Ruby.include = function ( list, value ){
    var present = false;
    each(list, function ( val ){
      if ( val === value ){
        present = true;
      }
    });
    return present;
  };

  Ruby.pluck = function ( list, property ){
    var array = [];
    each(list, function ( val ){
      array.push(val[property]);
    });
    return array;
  };

  Ruby.max = function ( list, iterator, context ){
    if ( iterator && ( list.length < 65535 ) ){
      var array = [];
      each(list, function ( val ){
        array.push(iterator.call(context,val));
      });
      return Math.max.apply(Math, array);
    } else {
      return Math.max.apply(Math, list);
    }
  };

  Ruby.min = function ( list, iterator, context ){
    if ( iterator && ( list.length < 65535 ) ){
      var array = [];
      each(list, function ( val ){
        array.push(iterator.call(context,val));
      });
      return Math.min.apply(Math, array);
    } else {
      return Math.min.apply(Math, list);
    }
 };

  var lookupIterator = function(value) {
    return typeof value === "function" ? value : function(obj){ return obj[value]; };
  };

  Ruby.sortBy = function(obj, value, context) {
   var iterator = lookupIterator(value);
   return Ruby.pluck(Ruby.map(obj, function(value, index, list) {
     return {
             value: value,
             index: index,
             criteria: iterator.call(context, value, index, list)
           };
   }).sort(function(left, right) {
       var a = left.criteria;
       var b = right.criteria;
       if (a !== b) {
               if (a > b || a === void 0) return 1;
               if (a < b || b === void 0) return -1;
             }
       return left.index - right.index;
     }), 'value');
  };

  Ruby.groupBy = function ( list, value, context){
    var iterator = lookupIterator(value);
    var grouped = {};
    each(list, function ( val, index ){
      var calledIterator = iterator.call(context, val, index, list);
      if ( grouped[calledIterator] !== undefined ){
        grouped[calledIterator] = [ grouped[calledIterator] ]; // val turned into an array
        grouped[calledIterator].push(val);
      } else {
        grouped[calledIterator] = val;
      }
    });
    return grouped;
  };

  /*
   *  Array Methods
   */

  Ruby.first = function ( array, n ){
    return array[0];
  };

  Ruby.initial = function ( array, n ){
    clone = array.slice(0);
    clone.pop();
    return clone;
  };

  Ruby.last = function ( array, n ){
    return array[(array.length - 1)];
  };

  Ruby.rest = function ( array, val ){
    var clone = array.slice(0);
    clone.splice(clone.indexOf(val), 1);
    return clone;
  };

  Ruby.compact = function ( array ){
    return Ruby.filter(array, function ( val ) { return val; });
  };

  Ruby.flatten = function ( array, shallow ){
    var newArray = [];
    var count = 0;
    each(array, function ( val ){
      checker(val, shallow);
      count = 0;
    });
    function checker ( value, onelevel ){
      if ( ( ObjProto.toString.call(value) !== "[object Array]" ) ){
        newArray.push(value);
      } else {
        count++;
        each(value, function ( nextVal ){
          if ( ( count === 1 ) && onelevel ) {
            newArray.push(nextVal);
          } else {
            checker(nextVal);
          }
        });
      }
    }
    return newArray;
  };

  Ruby.indexOf = function ( array, index ){
      return ArrayProto.indexOf.call(array, index);
  };
}).call(this);

