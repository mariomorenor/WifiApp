<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { store, st } from "./store";

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
      let biotime_host = await st.get("biotime_host");

      if (host == null) {
        st.set("server_host", this.store.host);
      } else {
        st.set("server_host", host);
        this.store.host = host;
      }


      if (biotime_host == null) {
        st.set("biotime_host", this.store.biotime_host);
      } else {
        st.set("biotime_host", host);
        this.store.biotime_host = biotime_host;
      }

    },
  },
});
</script>
