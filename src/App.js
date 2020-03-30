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
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonTitle>CoVid-19 Tracker</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <ion-card>
            <ion-card-header>
              <ion-card-subtitle>Confirmed Cases</ion-card-subtitle>
              <ion-card-title>{this.state.confirmed}</ion-card-title>
            </ion-card-header>
          </ion-card>
          <ion-card>
            <ion-card-header>
              <ion-card-subtitle>Recovered Cases</ion-card-subtitle>
              <ion-card-title>{this.state.recovered}</ion-card-title>
            </ion-card-header>
          </ion-card>
          <ion-card>
            <ion-card-header>
              <ion-card-subtitle>Deaths</ion-card-subtitle>
              <ion-card-title>{this.state.deaths}</ion-card-title>
            </ion-card-header>
          </ion-card>
        </IonContent>
      </IonApp>
    );
  }
}

export default App;
