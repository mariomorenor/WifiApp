<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { Storage } from "@ionic/storage";
import { store } from "./store";

const st = new Storage({
  name: "data",
});
st.create();

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  data() {
    return {
      store,
    };
  },
  mounted() {
    this.getServerHost();
  },
  methods: {
    async getServerHost() {
      let host = await st.get("server_host");

      console.log(host);
      if (host) {
        this.store.host = host;
      }
    },
  },
});
</script>
