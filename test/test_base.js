import { Struct, VectorFix, VectorVar, Uint32, Uint24, Uint16, Uint8, Enum } from "../src/mod.js";
import { assertEquals, equal } from "@std/assert";

Deno.test(
   "Struct",
   () => {
      const actual = new Struct(new Uint8Array([0, 1, 2]), new Uint8Array([3, 7, 10]));
      const expected = new Uint8Array([0, 1, 2, 3, 7, 10]);

      equal(actual, expected)

      const member = [new Uint8Array([0, 1, 2]), new Uint8Array([3, 7, 10])]
      assertEquals(actual.member(), member)
   }
)

Deno.test(
   "VectorFix",
   () => {
      const actual = new VectorFix(new Uint8Array([1, 2, 3, 4]), 4);
      const expected = new Uint8Array([1, 2, 3, 4]);

      equal(actual, expected)
   }
)

Deno.test(
   "VectorVar",
   () => {
      const actual = new VectorVar(new Uint8Array([1, 2, 3, 4]), 0, 2 ** (8 * 4) - 1);
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
      assertEquals(level.value("fatal"), 2);
      assertEquals(level.maxvalue(), 255)
   }
)

const level = new Enum({
   warning: 1,
   fatal: 2,
   [Enum.max]: 255
});

debugger;