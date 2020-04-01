import React from "react";
import "./App.css";
import Axios from "axios";
import { Stretch } from "styled-loaders-react";
import {
  IonApp,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel
} from "@ionic/react";

class App extends React.Component {
  state = {
    confirmed: 0,
    recovered: 0,
    deaths: 0,
    count: 0,
    loading: true,
    date: new Date()
  };

  componentDidMount() {
    this.getData();
    this.country();
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 3000);
  }

  async country() {
    const ccount = await Axios.get(
      "https://coronavirus-tracker-api.herokuapp.com/v2/locations"
    );
    this.setState({
      count: ccount.data.locations.length - 50,
      loading: false
    });
  }

  async getData() {
    const res = await Axios.get("https://covid19.mathdro.id/api");
    this.setState({
      confirmed: res.data.confirmed.value,
      recovered: res.data.recovered.value,
      deaths: res.data.deaths.value
    });
  }
  render() {
    return (
      <IonApp mode="ios">
        <IonHeader>
          <IonToolbar color="primary" className="title">
            <IonTitle className="headtitle">CoVid-19 Tracker</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent color="dark" class="ion-padding">
          <ion-text color="light" className="total">
            <h1>
              {this.state.date.toLocaleDateString("nl")}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;at-
              {this.state.date.toLocaleTimeString()}
            </h1>
          </ion-text>
          <ion-text class="total">
            {this.state.loading ? (
              <Stretch color="white" />
            ) : (
              <div class="ion-text-center">
                Total Effected Countries : {this.state.count}
              </div>
            )}
          </ion-text>
          <ion-card>
            <ion-card-header color="warning">
              <ion-card-title>Total Confirmed Cases</ion-card-title>
              <ion-card-title>{this.state.confirmed}</ion-card-title>
            </ion-card-header>
          </ion-card>
          <ion-card>
            <ion-card-header color="success">
              <ion-card-title>Recovered Cases</ion-card-title>
              <ion-card-title> {this.state.recovered}</ion-card-title>
            </ion-card-header>
          </ion-card>
          <ion-card color="danger">
            <ion-card-header>
              <ion-card-title color="light">Deaths</ion-card-title>
              <ion-card-title>{this.state.deaths}</ion-card-title>
            </ion-card-header>
          </ion-card>
        </IonContent>
        <ion-footer class="ion-no-border" translucent="true">
          <ion-toolbar color="dark">
            <ion-title>github.com/vasu2912</ion-title>
          </ion-toolbar>
        </ion-footer>
      </IonApp>
    );
  }
}

export default App;
