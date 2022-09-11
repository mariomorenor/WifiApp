import { reactive } from "vue";

type User = {
  id: number;
  username: string;
  value: string;
  name: string;
  last_name: string;
  status: number;
};

import { Storage } from "@ionic/storage";
const s = new Storage();
s.create();

export const st = s;

export const store = reactive({
  users: [] as Array<User>,
  user: {} as User,
  host: "http://127.0.0.1:3000",
});
