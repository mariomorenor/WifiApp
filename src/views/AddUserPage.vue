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
      <ion-loading :is-open="searching"
        message="Ajustando tornillos, moviendo las caderas y... Guardando al Usuario :3">
      </ion-loading>
      <form id="form">
        <ion-item>
          <ion-label position="floating">Usuario:</ion-label>
          <ion-input required v-model="user.username"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Contraseña:</ion-label>
          <ion-input required v-model="user.password"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Cédula:</ion-label>
          <ion-input required @change="setPossiblyPassword()" type="number" v-model="user.identity"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Email:</ion-label>
          <ion-input type="email" v-model="user.email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Nombres:</ion-label>
          <ion-input required v-model="user.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Apellidos:</ion-label>
          <ion-input required v-model="user.last_name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Carrera:</ion-label>
          <ion-input v-model="user.career"></ion-input>
        </ion-item>
        <ion-button type="submit" expand="block" @click="saveUser()">GUARDAR <ion-icon class="ion-padding-start"
            :icon="save"></ion-icon>
        </ion-button>
      </form>
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
  IonIcon,
  IonLoading
} from "@ionic/vue";
import { defineComponent } from "vue";

import { save } from "ionicons/icons";

import { store, st } from "../store";
import { Http, HttpResponse } from "@capacitor-community/http";

export default defineComponent({
  name: "AddUserPage",
  setup() {
    return {
      save,
    };
  },
  data() {
    return {
      store,
      user: {
        username: "",
        password: "",
        identity: "",
        email: "",
        name: "",
        last_name: "",
        career: "",
      },
      searching: false
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
    IonIcon,
    IonLoading
  },
  mounted() {
    let form = document.getElementById("form");

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  },
  methods: {
    home() {
      this.$router.back();
    },
    async saveUser() {
      if (
        !this.user.username ||
        !this.user.password ||
        !this.user.identity ||
        !this.user.email ||
        !this.user.name ||
        !this.user.last_name
      ) {
        return;
      }
      this.searching = true
      let options = {
        url: `${this.store.host}/createUser`,
        headers: {
          "Content-Type": "application/json",
        },
        data: this.user,
      };
      const toast = await toastController.create({
        duration: 2000,
        position: "bottom",
      });
      
      Http.post(options).then((result) => {
        if (result.status == 500) {
          throw result;
          
        }
        toast.message = `Se ha insertado al usuario ${this.user.username} con éxito`;
        toast.color = "success";
        toast.present();
        this.resetUser();
      }).catch((err) => {
        toast.color = "danger";
        toast.message =
          "Error Al insertar el usuario, verifique que el usuario no exista en la base de datos";
        toast.present();
      }).finally(() => {
        this.searching = false;
      });


    },
    resetUser() {
      this.user.username = "";
      this.user.name = "";
      this.user.password = "";
      this.user.identity = "";
      this.user.email = "";
      this.user.last_name = "";
      this.user.career = "";
    },
    setPossiblyPassword() {
      if (this.user.password == "") {
        this.user.password = this.user.identity
      }
    }
  },
});
</script>

<style scoped>

</style>
