import { assertEquals, equal } from "@std/assert";
import { Alert } from "../src/alert.js";
import { concat } from "@aicone/byte"

Deno.test(
   "Alert test",
   () => {

      const alert1 = Alert.bad_record_mac;
      const alert2 = Alert.bad_certificate;
      const { level, description } = Alert; 

      assertEquals(alert1[0], 2);
      assertEquals(alert1[1], 20);
      assertEquals(alert1.meaning(),"fatal[2]-bad_record_mac[20]");
      assertEquals(alert2[0], 2);
      assertEquals(alert2[1], 42);
      assertEquals(alert2.meaning(),"fatal[2]-bad_certificate[42]");
      equal(Alert.bad_certificate,concat[level.fatal, description.bad_certificate])

   }
)