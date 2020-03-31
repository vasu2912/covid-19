import React from "react";
import "./App.css";
import Axios from "axios";
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
  IonLabel,
  IonButton
} from "@ionic/react";

class App extends React.Component {
  state = {
    confirmed: 0,
    recovered: 0,
    deaths: 0
  };

  componentDidMount() {
    this.getData();
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
          <IonToolbar>
            <IonTitle className="title">CoVid-19 Tracker</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent color="dark">
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
      </IonApp>
    );
  }
}

export default App;
