<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
<<<<<<< HEAD
        <ion-buttons>
          <ion-back-button></ion-back-button>
        </ion-buttons>
=======
        <ion-button @click="home()" color="tertiary"> Regresar </ion-button>
>>>>>>> f974e71326d55ad2337b652376b44955a218d1a8
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
<<<<<<< HEAD
        <ion-label position="floating">Contraseña</ion-label>
        <ion-input></ion-input>
      </ion-item>
=======
        <ion-label position="stacked">Contraseña:</ion-label>
        <ion-input v-model="user.value"></ion-input>
      </ion-item>
      <ion-button @click="updatePassword()" color="primary" expand="block"
        >ACTUALIZAR</ion-button
      >
>>>>>>> f974e71326d55ad2337b652376b44955a218d1a8
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
<<<<<<< HEAD
=======
  data() {
    return {
      user: {} as string | null,
      d: "",
    };
  },
>>>>>>> f974e71326d55ad2337b652376b44955a218d1a8
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
  computed:{
    user(){
      return this.$route.params
    }
  }
});
</script>

<style scoped></style>
