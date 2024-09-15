import { Struct, Fixed, Minmax, Uint32, Uint24, Uint16, Uint8, Enum } from "../src/base.js";
import { assertEquals, equal } from "@std/assert";

Deno.test(
   "Struct",
   () => {
      const actual = new Struct(new Uint8Array([0, 1, 2]), new Uint8Array([3, 7, 10]));
      const expected = new Uint8Array([0, 1, 2, 3, 7, 10]);

      equal(actual, expected)

      const member = [new Uint8Array([0, 1, 2]), new Uint8Array([3, 7, 10])]
      assertEquals(actual.member, member)
   }
)

Deno.test(
   "Fixed",
   () => {
      const actual = new Fixed(2,new Uint8Array([1, 2]), new Uint8Array([ 3, 4]));
      const expected = new Uint8Array([1, 2, 3, 4]);

      equal(actual, expected)
   }
)

Deno.test(
   "Minmax",
   () => {
      const actual = new Minmax(0, 2 ** (8 * 4) - 1,new Uint8Array([1, 2, 3, 4]));
      const expected = new Uint8Array([0, 0, 0, 4, 1, 2, 3, 4]);

      equal(actual, expected)
   }
)

Deno.test(
   "Numbers",
   () => {
      let actual = new Uint32(16909060)
      let expected = new Uint8Array([1, 2, 3, 4]);
      equal(actual, expected)
      assertEquals(actual.value(), 16909060)

      actual = new Uint24(131844)
      expected = new Uint8Array([2, 3, 4]);
      equal(actual, expected)
      assertEquals(actual.value(), 131844)

      actual = new Uint16(772)
      expected = new Uint8Array([3, 4]);
      equal(actual, expected)
      assertEquals(actual.value(), 772)

      actual = new Uint8(4)
      expected = new Uint8Array([4]);
      equal(actual, expected)
      assertEquals(actual.value(), 4)

   }
)

Deno.test(
   "Enum",
   ()=>{
      const level = new Enum({
         warning: 1,
         fatal: 2,
         [Enum.max]: 255
      });
      assertEquals(level.key(1),"warning");
      equal(level.value("fatal"), new Uint8Array([2]));
      assertEquals(level.maxvalue(), 255)
      equal(new Uint8Array([1]), level.warning);
   }
)

Deno.test(
   "Fixed and Minmax",
   ()=>{
      const fixed4 = Fixed.length(4).bytes(new Uint8(1), new Uint8(2), new Uint8(3), new Uint8(4));
      assertEquals(fixed4.length, 4);

      const minmax = Minmax.min(0).max(10).byte(new Uint16(12));
      assertEquals(minmax.min, 0);
      assertEquals(minmax.max, 10);

      const m = Minmax.min(0).max(12).byte(); 
      equal(m, new Uint8(0))
   }
)
