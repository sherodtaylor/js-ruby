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
    if ( Array.isArray(list) ){
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

  var find = Ruby.find = Ruby.detect = function ( list, iterator, context ){
    if ( Array.isArray(list) ){
      var isTrue = false;
      for ( var i = 0; i < list.length; i++ ){
        if ( iterator.call(context, list[i], list) ){
          isTrue = true;
          return list[i];
        }
      }
    } else {
      var isTrue = false;
      var keys = Ruby.keys(list);
      for ( var i = 0; i < keys.length; i++ ){
        if ( iterator.call(context, list[keys[i]], list) ){
          return list[keys[i]];
        }
      };
    };
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
      propKeys = Ruby.keys(properties),
      valKeys = Ruby.keys(val);
      each( propKeys, function ( key ){
        if ( val[key] === properties[key] ){
          truth = true;
        };
      });
      if ( truth === true ){
        array.push(val);
        truth = false;
      };
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
    return true ? passed === true : false
  };

  var contains = Ruby.contains = Ruby.include = function ( list, value ){
    var present = false;
    each(list, function ( val ){
      if ( val === value ){
        present = true;
      }
    });
    return present;
  }

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
}).call(this);

