<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-label position="stacked">Server:</ion-label>
        <ion-input v-model="host"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Server Time:</ion-label>
        <ion-input v-model="biotime_host"></ion-input>
      </ion-item>
      <ion-button expand="block" @click="setConfig()">ACTUALIZAR</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  toastController,
  IonBackButton,
  IonButtons,
} from "@ionic/vue";
import { defineComponent } from "vue";

import { store, st } from "../store";

export default defineComponent({
  name: "ConfigPage",

  data() {
    return {
      store,
      host: "",
      biotime_host:""
    };
  },
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
    IonBackButton,
    IonButtons,
  },
  mounted() {
    this.host = this.store.host;
    this.biotime_host = this.store.biotime_host;
  },
  methods: {
    home() {
      this.$router.back();
    },
    async setConfig() {
      const toast = await toastController.create({
        message: "Se ha cambiado la dirección del servidor con éxito",
        duration: 1500,
        position: "middle",
      });
      this.store.host = this.host;
      this.store.biotime_host = this.biotime_host;

      st.set("server_host", this.host);
      st.set("biotime_host", this.biotime_host);
      toast.present();
    },
  },
});
</script>

<style scoped></style>
