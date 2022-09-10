import { reactive } from 'vue'


type User = {
  id: number;
  username: string;
  value: string;
  name: string;
  last_name: string;
  status: number;
};

export const store = reactive({
  users: [] as Array<User>,
  user:{} as User
})