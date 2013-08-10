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
        expect(Ruby.every(array, function ( n ){ return n % 2 === 0 })).toBe(true);
      });
      it("returns false if any values in the Array fail the truth test", function (){
        var array = [1,2,3,4,5];
        expect(Ruby.every(array, function ( n ){ return n % 2 === 0 })).toBe(false);
      });
      it("returns false if any values in the Object fail the truth test", function (){
        var obj = { one: 1, two: 2, three: 3, four: 4, five: 5 };
        expect(Ruby.every(array, function ( n ){ return n % 2 === 0 })).toBe(false);
      });
    });
  });
});
