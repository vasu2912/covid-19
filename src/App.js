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
    inconfirmed: 0,
    inrecovered: 0,
    indeaths: 0,
    count: 0,
    loading: true,
    date: new Date()
  };

  componentDidMount() {
    this.getData();
    this.country();
    this.india();
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
  async india() {
    const ind = await Axios.get("https://covid19.mathdro.id/api/countries/IN");
    this.setState({
      inconfirmed: ind.data.confirmed.value,
      inrecovered: ind.data.recovered.value,
      indeaths: ind.data.deaths.value
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
              <Stretch color="white" size="30px" />
            ) : (
              <div class="ion-text-center">
                <h2 id="tot">Total Effected Countries : {this.state.count}</h2>
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
          <Ion-text>
            <div class="ion-text-center">
              <h3 id="indtitle">Total Cases - India</h3>
              <p id="numbers">{this.state.inconfirmed}</p>
              <h3 id="indtitle">Recovered</h3>
              <p id="numbers">{this.state.inrecovered}</p>
              <h3 id="indtitle">Deaths</h3>
              <p id="numbers">{this.state.indeaths}</p>
            </div>
          </Ion-text>
        </IonContent>
        <ion-footer class="ion-no-border" translucent="true">
          <ion-toolbar color="dark">
            <ion-title className="bottomtitle">
              <a href="https://github.com/vasu2912/">github.com/vasu2912</a>
            </ion-title>
          </ion-toolbar>
        </ion-footer>
      </IonApp>
    );
  }
}

export default App;
