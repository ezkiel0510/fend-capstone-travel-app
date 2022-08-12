// Import the js file to test
import { getDays } from "../src/client/js/helper";

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing the helper functionality", () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.
  test("Testing the getDays() function", () => {
    // Define the input for the function, if any, in the form of variables/array
    // Define the expected output, if any, in the form of variables/array
    // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
    // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
    const d1 = new Date();
    const d2 = new Date(`2021-10-10`);
    expect(getDays(d1, d2)).toEqual(0);
  });
  test("two plus two is four", () => {
    expect(2 + 2).toBe(4);
  });
});
