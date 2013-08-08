describe("Ruby Methods", function (){
  describe("Each Method", function (){
    it("iterates over an Array", function (){
      var array = [1,2,3,4,5];
      var count = 0;
      Ruby.each( array, function ( n ){ count++; });
      expect(count).toBe(5);
    });
    it("iterates over an Object", function (){
      var array = { one: 1, two: 2, three:3, four:4, five:5 };
      var count = 0;
      Ruby.each( array, function ( n ){ count++; });
      expect(count).toBe(5);
    });
  });
});
