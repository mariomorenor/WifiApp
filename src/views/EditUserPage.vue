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
        <ion-label>
          <h2>Usuario: {{ user.username }}</h2>
          <p>Correo: {{ user.email }}</p>
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Contraseña:</ion-label>
        <ion-input v-model="user.value"></ion-input>
      </ion-item>
      <ion-button @click="updatePassword()" color="primary" expand="block"
        >ACTUALIZAR</ion-button
      >
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { Http, HttpResponse } from "@capacitor-community/http";
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
  IonButtons
} from "@ionic/vue";
import { defineComponent } from "vue";

import { store,st } from "../store";

type User = {
  id: number;
  username: string;
  value: string;
  name: string;
  last_name: string;
  status: number;
};

export default defineComponent({
  name: "EditPage",

  data() {
    return {
      store,
      user: {} as User,
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
    IonButtons
  },
  mounted() {
    this.user = this.store.user;
  },
  methods: {
    home() {
      this.$router.back();
    },
    async updatePassword() {
      const options = {
        url: `${this.store.host}/updatePassword`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          user: this.user,
        },
      };
      const toast = await toastController.create({
        message: "Se ha cambiado la contraseña con éxito",
        duration: 1500,
        position: "middle",
      });
      Http.post(options).then((res) => {
        this.store.users.forEach((u) => {
          if (u.id == this.user.id) {
            u.value = this.user.value;
          }
        });
        toast.present();
      });
    },
  },
});
</script>

<style scoped></style>
