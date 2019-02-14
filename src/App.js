import React, { Component } from 'react';
import  axios  from 'axios';
import './App.css';

axios.defaults.headers.common['x-api-key'] = '5E8mftCnJ92ttL71HKepv5XjgumUufxc5Y9We6n1';

class Code extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };

  }
  inputs = {};
  send = async () => {
    const label = this.inputs.label.value;
    const points = +this.inputs.points.value;
    const nbDays = +this.inputs.nbDays.value;
    const nbPlayers = +this.inputs.nbPlayers.value;
    if(label && points > 0 && nbDays > 0 && nbPlayers > 0) {
      console.log(`send ${label} ${points} ${nbDays} ${nbPlayers}`);
      this.inputs.button.disabled = true;

      try {
        const result = await axios.post("https://ipw21gnfgd.execute-api.eu-west-1.amazonaws.com/dev/code", {label, points, nbPlayers, nbDays});
        console.log(JSON.stringify(result));

        this.setState({code: result.data.code});
      } catch (e) {
        console.log(JSON.stringify(e));
        this.setState({message: e.response.data.message});
      }
      this.inputs.button.disabled = false;
    }
    else {
      this.setState({message: "Remplissez tous les champs"});
    }
    setTimeout(() => this.setState({message: ''}), 5000);
  };
  render({match} = this.props) {
    return (<div>
      <h2>Création de code</h2>
      <div><label>nom activité</label> <input name="label" placeholder="nom de l'activité" required ref={input => this.inputs.label = input} type="text"/></div>
      <div><label>points</label> <input name="points" required ref={input => this.inputs.points = input} type="number" min={1} /></div>
      <div><label>nombre de participants</label> <input name="nbPlayers" required ref={input => this.inputs.nbPlayers = input} type="number" min={1}/></div>
      <div><label>nombre de jours actif</label> <input name="nbDays" required ref={input => this.inputs.nbDays = input} type="number" min={1}/></div>
      <button ref={input => this.inputs.button = input} onClick={this.send}>Envoyer</button>
      <div>{this.state.message}</div>
      {this.state.code && (<div>
        Le nouveau code est <strong>{this.state.code}</strong> (mémorisez le)
      </div>)}
    </div>);
  }
}

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };

  }
  inputs = {};
  send = async () => {
    let pseudo = this.inputs.pseudo.value;
    if(pseudo) {
      pseudo = pseudo.toLocaleLowerCase();
      console.log(`send ${pseudo}`);
      this.inputs.button.disabled = true;

      try {
        const result = await axios.post("https://ipw21gnfgd.execute-api.eu-west-1.amazonaws.com/dev/user", {pseudo});
        console.log(JSON.stringify(result));

        this.setState({message: `le pseudo ${result.data.pseudo} a bien été enregistré`});
      } catch (e) {
        console.log(JSON.stringify(e));
        this.setState({message: e.response.data.message});
      }
      this.inputs.button.disabled = false;
    }
    else {
      this.setState({message: "Donnez un pseudo"});
    }
    setTimeout(() => this.setState({message: ''}), 5000);
  };
  render({match} = this.props) {
    return (<div>
      <h2>Ajout d'un pseudo</h2>
        <div>
          <label>pseudo</label> <input name="pseudo" placeholder="nouveau pseudo" required ref={input => this.inputs.pseudo = input} type="text"/>
        </div>
        <button ref={input => this.inputs.button = input} onClick={this.send}>Envoyer</button>
      <div>{this.state.message}</div>
    </div>);
  }
}

class CsvLoader extends Component {
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
    if(minDate && maxDate && minDate <= maxDate) {
      console.log(`send ${minDate}, ${maxDate}`);
      this.setState({
        message: `Cliquez sur le lien ci-dessus`,
        url: `https://ipw21gnfgd.execute-api.eu-west-1.amazonaws.com/dev/csv/${minDate}/${maxDate}/scores.csv`
      });
    }
    else {
      this.setState({message: "Précisez des dates valides", url: null});
    }
    setTimeout(() => this.setState({message: ''}), 5000);
  };
  onClickLink = async () => {
    try {
      const result = await axios.get(
        this.state.url);
      console.log(JSON.stringify(result));

      this.setState({message: ''});
    } catch (e) {
      console.log(JSON.stringify(e));
      this.setState({message: 'erreur de chargement'});
    }
    setTimeout(() => this.setState({message: ''}), 5000);
  };

  render({match} = this.props) {
    return (<div>
      <h2>Chargement des scores</h2>
      <div>
        <label>entre</label> <input name="minDate" placeholder="date min" required ref={input => this.inputs.minDate = input} type="date" onChange={this.onChange}/>
        <label>et</label> <input name="maxDate" placeholder="date max" required ref={input => this.inputs.maxDate = input} type="date" onChange={this.onChange}/>
      </div>
      {this.state.url && <a href={this.state.url}>lien de téléchargement</a>}
      <div>{this.state.message}</div>
    </div>);
  }
}


class App extends Component {
  render() {
    return (
      <div>
        <h1>Ordre Siphonique - admin</h1>
        <Code />
        <User />
        <CsvLoader/>
      </div>
    );
  }
}

export default App;
