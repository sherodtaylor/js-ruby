describe("Ruby Methods", function (){
  describe("Collection Methods", function (){
    describe("Each Method", function (){
      it("iterates over an Array", function (){
        var array = [1,2,3,4,5];
        var count = 0;
        Ruby.each( array, function ( n ){ count++; });
        expect(count).toBe(5);
      });
      it("iterates over an Object", function (){
        var obj = { one: 1, two: 2, three: 3, four: 4, five: 5 };
        var count = 0;
        Ruby.each( obj, function ( n ){ count++; });
        expect(count).toBe(5);
      });
    });

    describe("Map Method", function (){
      it("maps each value in an Array and returns an Array of transformed values", function (){
        var array = [1,2,3];
        expect(Ruby.map( array, function ( n ){ return n * 2; })).toEqual([2,4,6]);
      });
      it("maps each value in an Object and returns an Array of transformed values", function (){
        var obj = { one: 1, two: 2, three: 3 };
        expect(Ruby.map( obj, function ( n ){ return n * 2; })).toEqual([2,4,6]);
      });
    });

    describe("Reduce Method", function (){
      it("combines all the values of an Array", function (){
        var array = [1,2,3];
        expect(Ruby.reduce(array, function ( memo, n ){ return memo + n }, 0)).toEqual(6);
      });
      it("combies all values of an Object", function (){
        var obj = { one: 1, two: 2 ,three: 3 };
        expect(Ruby.reduce(obj, function ( memo, n ){ return memo + n }, 0)).toEqual(6);
      });
    });

    describe("Find Method", function (){
      it("looks through an Array and returns the first value that passes", function (){
        var array = [1,2,3,4,5];
        expect(Ruby.find(array, function ( num ){ return num % 2 === 0 } )).toEqual(2);
      });
      it("looks through an Object and returns the first value that passes", function (){
        var obj = { one:1, two:2, three:3, four:4, five:5 };
        expect(Ruby.find(obj, function ( num ){ return num % 2 === 0 } )).toEqual(2);
      });
      it("Returns undefined if truth doesn't pass - Array", function (){
        var array = [1,3,5];
        expect(Ruby.find(array, function ( num ){ return num % 2 === 0 } )).toBeUndefined();
      });
      it("Returns undefined if truth doesn't pass - Object", function (){
        var obj = { one:1, three:3, five:5 };
        expect(Ruby.find(obj, function ( num ){ return num % 2 === 0 } )).toBeUndefined();
      });
    });

    describe("Filter Method", function (){
      it("looks through each value in an Array and returns an Array of values that pass truth test", function (){
        var array = [2,3,4,5];
        expect(Ruby.filter(array, function ( n ){ return n % 2 === 0 }) ).toEqual([2,4]);
      });
      it("looks through each value in an Object and returns an Array of values that pass truth test", function (){
        var obj = { one:1, two:2, three:3, four:4, five:5 };
        expect(Ruby.filter(obj, function ( n ){ return n % 2 === 0 }) ).toEqual([2,4]);
      });
    });

    describe("Where Method", function (){
      it("returns an array of all values that contain a key-value pair", function (){
        var movies = [{ title: "The Conjuring", year: 2013 }, { title: "Training Day", year: 2002 }, { title: "The Departed", year: 2006 },{ title: "Pacific Rim", year: 2013 } ];
        expect(Ruby.where(movies, { year: 2013 })).toEqual([{ title: "The Conjuring", year: 2013 },{title: "Pacific Rim", year: 2013}]);
      });

      it("returns an array of all values that contain multiple key-value pairs", function (){
        var movies = [{ title: "The Conjuring", year: 2013 }, { title: "Training Day", year: 2002, studio: "Universal Studios" }, { title: "The Departed", year: 2002, studio: "Universal Studios" },{ title: "Pacific Rim", year: 2013 } ];
        expect(Ruby.where(movies, { year: 2002, studio: "Universal Studios" })).toEqual([{ title: "Training Day", year: 2002, studio: "Universal Studios" }, { title: "The Departed", year: 2002, studio: "Universal Studios" }])
      });
    });

    describe("FindWhere Method", function (){
      it("returns the first value that matches all the key-value properties", function(){
        var movies = [{ title: "The Conjuring", year: 2013 }, { title: "Training Day", year: 2002 }, { title: "The Departed", year: 2006 },{ title: "Pacific Rim", year: 2013 } ];
        expect(Ruby.findWhere(movies, { year: 2013 })).toEqual({ title: "The Conjuring", year: 2013 });
      });
    });

    describe("Reject Method", function (){
      it("rejects elements in an Array that pass the truth test", function (){
        var array = [1,2,3,4,5];
        expect(Ruby.reject(array, function ( n ){ return n % 2 === 0 })).toEqual([1,3,5]);
      });
      it("rejects elements in an Object that pass the truth test", function (){
        var obj = { one: 1, two: 2, three: 3, four: 4, five: 5 };
        expect(Ruby.reject(obj, function ( n ){ return n % 2 === 0 })).toEqual([1,3,5]);
      });
    });

    describe("Every Method", function (){
      it("returns true if all values in the Array pass the truth test", function (){
        var array = [2,4,6,8];
        expect(Ruby.every(array, function ( n ){ return n % 2 === 0 })).toBe(true);
      });
      it("returns true if all values in the Object pass the truth test", function (){
        var obj = { two: 2, four: 4, six: 6, eight: 8 };
        expect(Ruby.every(obj, function ( n ){ return n % 2 === 0 })).toBe(true);
      });
      it("returns false if any values in the Array fail the truth test", function (){
        var array = [1,2,3,4,5];
        expect(Ruby.every(array, function ( n ){ return n % 2 === 0 })).toBe(false);
      });
      it("returns false if any values in the Object fail the truth test", function (){
        var obj = { one: 1, two: 2, three: 3, four: 4, five: 5 };
        expect(Ruby.every(obj, function ( n ){ return n % 2 === 0 })).toBe(false);
      });
    });

    describe("Some Method", function (){
      it("returns true if any values in the Aray pass", function (){
        var array = [1,2,3,4,5];
        expect(Ruby.some(array, function ( n ){ return n % 2 === 0 })).toBe(true);
      });
      it("returns true if any values in the Object pass", function (){
        var obj = { one: 1, two: 2, three: 3, four: 4, five: 5 };
        expect(Ruby.some(obj, function ( n ){ return n % 2 === 0 })).toBe(true);
      });
      it("returns false if none of the values in the Aray pass", function (){
        var array = [1,3,5];
        expect(Ruby.some(array, function ( n ){ return n % 2 === 0 })).toBe(false);
      });
      it("returns false if none of the values in the Object pass", function (){
        var obj = { one: 1,  three: 3, five: 5 };
        expect(Ruby.some(obj, function ( n ){ return n % 2 === 0 })).toBe(false);
      });
    });

    describe("Contains Method", function (){
      it("returns true if the value is present in the Array", function(){
        var array = [1,2,3,4,5];
        expect(Ruby.contains(array, 2)).toBe(true);
      });
      it("returns true if the value is present in the Object", function(){
        var obj = { one: 1, two: 2, three: 3, four: 4, five: 5 };
        expect(Ruby.contains(obj, 2)).toBe(true);
      });
      it("returns false if the value isn't present in the Array", function(){
        var array = [1,2,3,4,5];
        expect(Ruby.contains(array, 6)).toBe(false);
      });
      it("returns false if the value isn't present in the Object", function(){
        var obj = { one: 1, two: 2, three: 3, four: 4, five: 5 };
        expect(Ruby.contains(obj, 6)).toBe(false);
      });
    });

    describe("Pluck Method", function (){
      it("extracts an array of properties values", function (){
        var array = [{ name: "Sherod" }, { name: "Arleyna" }, { name: "Aurie" }, { name: "Sam" }];
        expect(Ruby.pluck( array, "name")).toEqual(['Sherod',"Arleyna","Aurie","Sam"]);
      });
    });

    describe("Max Method", function (){
      it("returns the max value", function (){
        var array = [1,2,643,4,5];
        expect(Ruby.max(array)).toEqual(643);
      });
      it("returns max value when an iterator is passed", function (){
        var array = [{ name: "Sherod", age: 20 }, { name: "Arleyna", age: 45}, { name: "Aurie", age: 17 }, { name: "Sam", age: 49 }];
        expect(Ruby.max(array, function ( person ){ return person.age })).toEqual(49);
      });
    });

    describe("Min Method", function (){
      it("returns the min value", function (){
        var array = [1,2,643,4,5];
        expect(Ruby.min(array)).toEqual(1);
      });
      it("returns min value when an iterator is passed", function (){
        var array = [{ name: "Sherod", age: 20 }, { name: "Arleyna", age: 45}, { name: "Aurie", age: 17 }, { name: "Sam", age: 49 }];
        expect(Ruby.min(array, function ( person ){ return person.age })).toEqual(17);
      });
    });

    describe("SortBy Method", function (){
      it("returns a sorted copy of the list of numbers", function (){
        var array = [1,4,3,2,6];
        expect(Ruby.sortBy(array, function ( n ){ return n < 2 ? 2 + n : n - 2  })).toEqual([2,3,4,1,6]);
      });
      it("returns a sorted copy of the list of letters", function (){
        var array = ["b","c","a"]
        expect(Ruby.sortBy(array, function ( n ){ return n })).toEqual(["a","b","c"]);
      });
      it("returns a sorted copy of the list when the value is property", function (){
        var array = [[1,2,3],[1,2],[1,2,3,4]];
        expect(Ruby.sortBy(array, "length" )).toEqual([[1,2],[1,2,3],[1,2,3,4]]);
      });
    });

    describe("GroupBy Method", function (){
      it("splits collections into sets for property name if string is passed", function (){
        var people = [{ name: "Sherod", age: 20 }, { name: "Stephanie", age: 24 }, { name: "Arleyna", age: 47 }];
        expect(Ruby.groupBy(people, "age")).toEqual({ 20: { name: "Sherod", age:20 }, 24: { name: "Stephanie", age: 24}, 47: { name: "Arleyna", age: 47 }})
      });
      it("splits collections into sets based on the iterator's returned value", function (){
        var people = [{ name: "Sherod", age: 20 }, { name: "Stephanie", age: 24 }, { name: "Arleyna", age: 47 }];
        expect(Ruby.groupBy(people, function ( person ){
          if ( person.age < 40 ){
            return "young"
          } else { return "old" };
        })).toEqual({young: [{ name: "Sherod", age: 20 }, { name: "Stephanie", age: 24 }], old: { name: "Arleyna", age: 47 }})
      });
    });
  });

  describe("Array Methods", function (){
    describe("First Method", function (){
      it("Should return the first value in the array", function (){
        var array = [1,2,3,4,5];
        expect(Ruby.first(array)).toEqual(1);
      });
    });
    describe("Intial Method", function (){
      it("Should return the everything but the last element in the array", function (){
        var array = [1,2,3,4,5];
        expect(Ruby.initial(array)).toEqual([1,2,3,4]);
      });
      it("Shouldn't damage the original array", function (){
        var array = [1,2,3,4,5];
        Ruby.initial(array);
        expect(array).toEqual([1,2,3,4,5]);
      });
    });
    describe("Last Method", function (){
      it("Should return the last value in the array", function (){
        var array = [1,2,3,4,5];
        expect(Ruby.last(array)).toEqual(5);
      });
    });
    describe("Rest Method", function (){
      it("Should return everything but the value", function (){
        var array = [1,2,3,4,5];
        expect(Ruby.rest(array, 3)).toEqual([1,2,4,5]);
      });
      it("Shouldn't damage the original array", function (){
        var array = [1,2,3,4,5];
        Ruby.rest(array, 3);
        expect(array).toEqual([1,2,3,4,5]);
      });
    });
    describe("Compact Method", function (){
      it("Should return a copy with all falsy value removed", function (){
        var array = ["",1,null,2,undefined,0,3,false,4,NaN,5];
        expect(Ruby.compact(array)).toEqual([1,2,3,4,5]);
      });
      it("Shouldn't damage the original array", function (){
        var original = ["",1,null,2,undefined,0,3,false,4,NaN,5];
        Ruby.compact(original);
        expect(original).toEqual(original);
      });
    });
    describe("Flatten Method", function (){
      it("Should return a flattened array ", function (){
        var array = [1,[2],[[3]]];
        expect(Ruby.flatten(array)).toEqual([1,2,3]);
      });
      it("Should flatten array a single level if shallow is passed as true", function (){
        var array = [1,[2],[[3]]];
        expect(Ruby.flatten(array, true)).toEqual([1,2,[3]]);
      });
      it("Shouldn't damage the original array", function (){
        var array = [1,[2],[[3]]];
        Ruby.flatten(array, 3);
        expect(array).toEqual([1,[2],[[3]]]);
      });
    });
    describe("IndexOf Method", function (){
      it("Should return the index", function (){
        var array = [1,2,3,4];
        expect(Ruby.indexOf(array, 2)).toEqual(1);
      });
    });
  });
});
