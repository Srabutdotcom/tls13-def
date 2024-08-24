import { assertEquals, equal } from "@std/assert";
import { alert, Alert } from "../src/mod.js";

Deno.test(
   "Alert test",
   () => {

      const alert1 = new Alert(2, 20);
      const alert2 = new Alert("fatal", "bad_certificate")
      const alert3 = new Alert(Alert.level.fatal, Alert.description.bad_certificate)

      assertEquals(alert1[0], 2);
      assertEquals(alert1[1], 20);
      assertEquals(alert1.meaning(),"fatal[2]-bad_record_mac[20]");
      assertEquals(alert2[0], 2);
      assertEquals(alert2[1], 42);
      assertEquals(alert2.meaning(),"fatal[2]-bad_certificate[42]");
      equal(alert().level.fatal().description.bad_certificate(),new Uint8Array([Alert.level.fatal, Alert.description.bad_certificate]))

   }
)