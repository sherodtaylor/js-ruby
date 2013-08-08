describe("Ruby Methods", function (){
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
});
