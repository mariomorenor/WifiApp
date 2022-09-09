<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-button @click="home()" color="tertiary"> Regresar </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
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
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "EditPage",
  data() {
    return {
      user: {} as string | null,
      d: "",
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
  },
  mounted() {
    let user = sessionStorage.getItem("user");
    if (typeof user == "string") {
      this.user = JSON.parse(user);
    }
  },
  methods: {
    home() {
      this.$router.replace("/");
    },
    updatePassword() {
      this.axios
        .post("/updatePassword", {
          user: this.user,
        })
        .then(async(res) => {
          sessionStorage.setItem("user", JSON.stringify(this.user));
          const toast = await toastController.create({
            message: "Se ha cambiado la contraseña con éxito",
            duration: 1500,
            position: "middle",
          });

          await toast.present();
        });
    },
  },
});
</script>

<style scoped></style>
