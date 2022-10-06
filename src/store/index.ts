import { reactive } from "vue";

import { Storage } from "@ionic/storage";
import { User } from "@/types";
const s = new Storage();
s.create();

export const st = s;

export const store = reactive({
  users: [] as Array<User>,
  user: {} as User,
  host: "http://127.0.0.1:3000",
});
