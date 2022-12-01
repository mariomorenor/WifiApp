<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button></ion-back-button>
          <ion-title>Actualizar usuario</ion-title>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-loading :is-open="searching" message="Guardando Usuario, Espere por favor no sea apurado...">
      </ion-loading>
      <form id="form">
        <ion-item>
          <ion-label>Usuario:</ion-label>
          <ion-input @change="setEmail()" required v-model="user.username"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Cédula:</ion-label>
          <ion-input @change="setPossiblyPassword()" required type="number" v-model="user.identity"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Contraseña:</ion-label>
          <ion-input required v-model="user.password"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Email:</ion-label>
          <ion-input type="email" v-model="user.email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Nombres:</ion-label>
          <ion-input required v-model="user.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Apellidos:</ion-label>
          <ion-input required v-model="user.last_name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Carrera:</ion-label>
          <ion-input v-model="user.career"></ion-input>
        </ion-item>
        <ion-button type="submit" expand="block" @click="saveUser()">ACTUALIZAR <ion-icon class="ion-padding-start"
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
  IonLoading,
  IonTitle
} from "@ionic/vue";
import { defineComponent } from "vue";

import { save } from "ionicons/icons";

import { store, st } from "../store";
import { Http, HttpResponse } from "@capacitor-community/http";

export default defineComponent({
  name: "EditUserPage",
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
        career: ""
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
    IonLoading,
    IonTitle
  },
  mounted() {
    let form = document.getElementById("form");

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this.user = Object.assign({ password: this.store.user.value, career: this.store.user['career-unit'] }, { ...this.store.user })
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

      this.searching = true;

      let options = {
        url: `${this.store.host}/updateUser`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { user: this.user },
      };
      const toast = await toastController.create({
        duration: 2000,
        position: "bottom",
      });
      const result: HttpResponse = await Http.post(options);
      if (result.status == 500) {
        toast.color = "danger";
        toast.message =
          "Error Al insertar el usuario, verifique que el usuario no exista en la base de datos";
        toast.present();
        this.searching = false
        return;
      }
      toast.message = `Se ha actualizado al usuario ${this.user.username} con éxito`;
      toast.color = "success";
      toast.present();
      this.resetUser();
      this.searching = false
    },
    resetUser() {
      this.store.user.value = this.user.password;
      this.store.user.name = this.user.name;
      this.store.user.last_name = this.user.last_name;
      this.store.user.username = this.user.username;
      this.store.user.identity = this.user.identity;
      this.store.user["career-unit"] = this.user.career;
      console.log(this.store.user);
      
    },
    setPossiblyPassword() {
      this.user.password = this.user.identity
    },
    setEmail() {
      this.user.email = `${this.user.username}@pucesd.edu.ec`
    }
  },
});
</script>

<style scoped>

</style>