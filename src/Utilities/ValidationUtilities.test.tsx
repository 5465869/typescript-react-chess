import { getSubsetOfPointsBetweenTwoPointsOnLinearFunction, getSubsetOfPointsBetweenTwoPointsOnAVerticalLine } from "./ValidationUtilities";
import { Coordinate } from "../Pieces/Coordinate";



describe("getSubsetOfPointsBetweenTwoPoints", () => {
   it("should return all points between the two points with slope of positive 1", () => {
      const expected = [new Coordinate(2,4), new Coordinate(3,5), new Coordinate(4,6)];
   
      const point1 = new Coordinate(1,3);
      const point2 = new Coordinate(5,7);

      const subset = getSubsetOfPointsBetweenTwoPointsOnLinearFunction(point1, point2);
   
      expect(subset).toEqual(expect.arrayContaining(expected));
      expect(subset.length).toEqual(expected.length);
   });

   it("should return all points between the two points with slope of positive 1 with points reversed", () => {
      const expected = [new Coordinate(2,4), new Coordinate(3,5), new Coordinate(4,6)];
   
      const point1 = new Coordinate(1,3);
      const point2 = new Coordinate(5,7);
      const subset = getSubsetOfPointsBetweenTwoPointsOnLinearFunction(point2, point1);

      expect(subset).toEqual(expect.arrayContaining(expected));
      expect(subset.length).toEqual(expected.length);
   });

   it("should return all points between the two points with slope of negative 1", () => {
      //arrange
      const expected = [new Coordinate(4,1), new Coordinate(3,2)];
   
      const point1 = new Coordinate(5,0);
      const point2 = new Coordinate(2,3);

      //act
      const subset = getSubsetOfPointsBetweenTwoPointsOnLinearFunction(point1, point2);
      
      //assert
      expect(subset).toEqual(expect.arrayContaining(expected));
      expect(subset.length).toEqual(expected.length);
   });

   it("should return all points between the two points with slope of negative 1 with coordinates reversed", () => {
      //arrange
      const expected = [new Coordinate(4,1), new Coordinate(3,2)];
   
      const point1 = new Coordinate(5,0);
      const point2 = new Coordinate(2,3);

      //act
      const subset = getSubsetOfPointsBetweenTwoPointsOnLinearFunction(point2, point1);
      
      //assert
      expect(subset).toEqual(expect.arrayContaining(expected));
      expect(subset.length).toEqual(expected.length);
   });

   it("should return all points between two points with slope 0", () => {
      //arrange
      const expected = [new Coordinate(2,3), new Coordinate(3,3), new Coordinate(4,3)];
   
      const point1 = new Coordinate(5,3);
      const point2 = new Coordinate(1,3);

      //act
      const subset = getSubsetOfPointsBetweenTwoPointsOnLinearFunction(point1, point2);
      
      //assert
      expect(subset).toEqual(expect.arrayContaining(expected));
      expect(subset.length).toEqual(expected.length);
   });

   it("should return all points between two points with slope 0 with points reversed", () => {
      //arrange
      const expected = [new Coordinate(2,3), new Coordinate(3,3), new Coordinate(4,3)];
   
      const point1 = new Coordinate(5,3);
      const point2 = new Coordinate(1,3);

      //act
      const subset = getSubsetOfPointsBetweenTwoPointsOnLinearFunction(point2, point1);
      
      //assert
      expect(subset).toEqual(expect.arrayContaining(expected));
      expect(subset.length).toEqual(expected.length);
   });
})

describe("getSubsetOfPointsBetweenTwoPointsOnAVerticalLine", () => {
   it("should return all points between two points", () => {
      const expected = [new Coordinate(1,3), new Coordinate(1,4), new Coordinate(1,5), new Coordinate(1,6)];
   
      const point1 = new Coordinate(1,2);
      const point2 = new Coordinate(1,7);

      const subset = getSubsetOfPointsBetweenTwoPointsOnAVerticalLine(point1, point2);
   
      expect(subset).toEqual(expect.arrayContaining(expected));
      expect(subset.length).toEqual(expected.length);
   });

   it("should return all points between two points with points reversed", () => {
      const expected = [new Coordinate(1,3), new Coordinate(1,4), new Coordinate(1,5), new Coordinate(1,6)];
   
      const point1 = new Coordinate(1,2);
      const point2 = new Coordinate(1,7);

      const subset = getSubsetOfPointsBetweenTwoPointsOnAVerticalLine(point2, point1);
   
      expect(subset).toEqual(expect.arrayContaining(expected));
      expect(subset.length).toEqual(expected.length);
   });
})