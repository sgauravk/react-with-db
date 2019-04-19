import React, { Component } from "react";
import "./services.css";
import Service from "./sercive";
import Pay from "./pay";

class Services extends Component {
  constructor(props) {
    super(props);
    this.showPaymentPopup = this.showPaymentPopup.bind(this);
    this.payAmmount = this.payAmmount.bind(this);
    this.form = ["pay-number", "pay-money", "pay"];
    this.state = { money: 0 };
  }

  componentDidMount() {
    document.getElementById("img").style.visibility = "hidden";
  }

  handleFormEvent(value, id) {
    document.getElementById(id).style.visibility = value;
  }

  showPaymentPopup() {
    const name = document.getElementById("login-box").value;
    if (!name) return alert("login to pay");
    this.form.forEach(element => this.handleFormEvent("visible", element));
    this.handleFormEvent("visible", "pay-overlay");
    fetch("/getMoney", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    })
      .then(res => res.text())
      .then(text => this.setState({money: text}));
  }

  isValidNo(){
    const number = document.getElementById("pay-number").value;
    if(number.length !== 10) alert("Invalid Number");
    const isValid = +number && number > 0;
    return number.length === 10 && isValid;
  }

  isValidAmmount(){
    const amount = +document.getElementById("pay-money").value;
    if(!amount) return;
    if(amount > this.state.money) alert("Insufficient ammount");
    return amount <= this.state.money && amount > 0;
  }

  payMoney(){
    const money = +document.getElementById("pay-money").value;
    const username = document.getElementById("login-box").value;
    const totalBalance = this.state.money - money;
    document.getElementById("current-balance").innerText = totalBalance;
    fetch("/payMoney", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalBalance, username })
    });
    document.getElementById("pay-number").value = "";
    document.getElementById("pay-money").value = "";
  }

  payAmmount() {
    if(!this.isValidNo() || !this.isValidAmmount()) return;
    this.form.forEach(element => this.handleFormEvent("hidden", element));
    this.handleFormEvent("visible", "img");
    setTimeout(() => {
      this.handleFormEvent("hidden", "img");
      this.handleFormEvent("hidden", "pay-overlay");
    }, 2000);
    this.payMoney(); 
  }

  render() {
    return (
      <ul>
        <div className="overlay" id="pay-overlay">
          <div className="popup" id="form">
            <input id="pay-number" placeholder="Enter Mobile Number" />
            <input id="pay-money" placeholder="Enter Amount" />
            <button onClick={this.payAmmount} id="pay">Pay</button>
            <img id="img" className="pay-logo" src="https://bit.ly/2Pi2lWq" alt="success"/>
          </div>
        </div>
        <Pay className="fas fa-money-bill-wave-alt" onclick={this.showPaymentPopup}/>
        <Service className="fas fa-mobile-alt" name="Mobile" />
        <Service className="far fa-lightbulb" name="Electricity" />
        <Service className="fas fa-coins" name="Gold" />
        <Service className="fas fa-book" name="Fees" />
        <Service className="fas fa-phone-volume" name="Landline" />
        <Service className="fab fa-usb" name="DataCard" />
        <Service className="fas fa-satellite-dish" name="DTH" />
        <Service className="fas fa-tv" name="CableTv" />
        <Service className="fas fa-subway" name="Metro" />
        <Service className="fas fa-hands" name="Flood Relief" />
        <Service className="fas fa-ellipsis-h" name="More" />
      </ul>
    );
  }
}

export default Services;