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
        <ion-label position="floating">Contraseña</ion-label>
        <ion-input></ion-input>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonButtons,
  IonBackButton,
  IonHeader,
  IonToolbar,
  IonContent,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "EditPage",
  components: {
    IonPage,
    IonButtons,
    IonBackButton,
    IonHeader,
    IonToolbar,
    IonContent,
  },
  computed:{
    user(){
      return this.$route.params
    }
  }
});
</script>

<style scoped></style>
