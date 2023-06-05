<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button></ion-back-button>
          <ion-title>Time</ion-title>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-loading :is-open="searching" message="Guardando Marcación, Espere por favor no sea apurado...">
      </ion-loading>
      <div id="form">
        <ion-item>
          <ion-label>Fecha:</ion-label>
          <ion-datetime-button datetime="datetime"></ion-datetime-button>
        </ion-item>
        <ion-item>
          <ion-label>Código de Empleado:</ion-label>
          <ion-input v-model="emp_code"></ion-input>
        </ion-item>
        <ion-button @click="searchTimes()">Buscar</ion-button>
      </div>
      <ion-item v-for="record in records" :key="record.id">
        <ion-datetime-button :datetime="record.id.toString()"></ion-datetime-button>
        <ion-button @click="updateTime(record)" color="warning">Actualizar</ion-button>
        <ion-modal :keep-contents-mounted="true">
          <ion-datetime v-model="record.punch_time" :id="record.id"></ion-datetime>
        </ion-modal>

      </ion-item>

      <ion-modal :keep-contents-mounted="true">
        <ion-datetime v-model="date" presentation="date" id="datetime"></ion-datetime>
      </ion-modal>


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
  IonTitle,
  IonDatetime, IonDatetimeButton, IonModal
} from "@ionic/vue";
import { defineComponent } from "vue";

import { save } from "ionicons/icons";

import { store, st } from "../store";
import { Http, HttpResponse } from "@capacitor-community/http";

export default defineComponent({
  name: "BiotimePage",
  setup() {
    return {
      save,
    };
  },
  data() {
    return {
      store,
      emp_code: 0,
      searching: false,
      date: "2023-05-31",
      records: [] as { id: number, punch_time: string, emp_code: number }[]
    };
  },
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonDatetime,
    IonLabel,
    IonItem,
    IonButton,
    IonBackButton,
    IonButtons,
    // IonIcon,
    IonLoading,
    IonTitle,
    IonDatetimeButton, IonModal,
    IonInput
  },
  mounted() {
    let d = new Date();
    let month = (d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : d.getMonth();
    let day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    this.date = `${d.getFullYear()}-${month}-${day}`

  },

  methods: {
    formatDate(d: Date, time: boolean) {
      let month = (d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : d.getMonth();
      let day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
      let datetime = `${d.getFullYear()}-${month}-${day}`
      if (time) {
        let hour = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
        let minute = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
        let seconds = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();
        datetime = `${datetime} ${hour}:${minute}:${seconds}`
      }
      return datetime;
    },
    searchTimes() {
      const options = {
        url: `${this.store.biotime_host}/get_times`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          emp_code: this.emp_code,
          date: this.date
        },
      };

      this.searching = true

      Http.post(options).then(response => {
        console.log(response.data);
        this.records = response.data
        this.searching = false

      }).catch(() => {
        this.searching = false
      });

    },
    updateTime(rec: { id: number, punch_time: string, emp_code: number }) {

      const options = {
        url: `${this.store.biotime_host}/update_times`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          record_id: rec.id,
          date: this.formatDate(new Date(rec.punch_time), true)
        },
      };

      this.searching = true
      console.log(options);

      Http.post(options).then(response => {
        console.log(response.data);
        this.searching = false

      }).catch(() => {
        this.searching = false
      });
    }
  },
});
</script>

<style scoped></style>