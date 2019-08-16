import axios from "axios";
import React, { Component } from "react";
import { Field, Label, Input, A } from "../style/styles";

export class CsvLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      url: null
    };
  }
  inputs = {};
  onChange = () => {
    let minDate = this.inputs.minDate.value;
    let maxDate = this.inputs.maxDate.value;
    if (minDate && maxDate && minDate <= maxDate) {
      console.log(`send ${minDate}, ${maxDate}`);
      this.setState({
        message: `Cliquez sur le lien ci-dessus`,
        url: `https://ipw21gnfgd.execute-api.eu-west-1.amazonaws.com/dev/csv/${minDate}/${maxDate}/scores.csv`
      });
    } else {
      this.setState({ message: "Précisez des dates valides", url: null });
    }
    setTimeout(() => this.setState({ message: "" }), 5000);
  };
  onClickLink = async () => {
    try {
      const result = await axios.get(this.state.url);
      console.log(JSON.stringify(result));

      this.setState({ message: "" });
    } catch (e) {
      console.log(JSON.stringify(e));
      this.setState({ message: "erreur de chargement" });
    }
    setTimeout(() => this.setState({ message: "" }), 5000);
  };

  render({ match } = this.props) {
    return (
      <div>
        <Field>
          <Label>Scores à charger du</Label>
          <Input
            name="minDate"
            placeholder="date min"
            required
            ref={input => (this.inputs.minDate = input)}
            type="date"
            onChange={this.onChange}
          />
          <Label>au</Label>
          <Input
            name="maxDate"
            placeholder="date max"
            required
            ref={input => (this.inputs.maxDate = input)}
            type="date"
            onChange={this.onChange}
          />
        </Field>
        {this.state.url && <A href={this.state.url}>lien de téléchargement</A>}
        <div>{this.state.message}</div>
      </div>
    );
  }
}
