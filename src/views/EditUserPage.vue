<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content> </ion-content>
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
  name: "HomePage",
  components: {
    IonPage,
    IonButtons,
    IonBackButton,
    IonHeader,
    IonToolbar,
    IonContent,
  },
});
</script>

<style scoped></style>
