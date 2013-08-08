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

  describe("Produces a new array of value", function (){
    it("maps each value in an array and returns an array of transformed values", function (){
      var array = [1,2,3];
      expect(Ruby.map( array, function ( n ){ return n * 2; })).toEqual([2,4,6]);
    });
    it("maps each value in an object and returns an array of transformed values", function (){
      var array = [1,2,3];
      expect(Ruby.map( array, function ( n ){ return n * 2; })).toEqual([2,4,6]);
    });
  });
});
