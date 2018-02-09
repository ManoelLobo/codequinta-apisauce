import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import api from './services/api';

export default class App extends Component {
  state = {
    gist: undefined,
    draft: '',
    last: '',
  }
  createGist = () => {
    if (!this.state.draft) return;

    const gist = {
      "description": "anongist",
      "public": true,
      "files": {
        "anon.gist": {
          "content": this.state.draft,
        }
      }
    }

    api.post('/gists', JSON.stringify(gist)).then( (response) => { this.setState({ gist: response.data.html_url }) } );
  }

  readLastGist = () => {
    api.get('/gists').then( (response) => { this.setState({ last: response.data[0].html_url }) } );
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          underlineColorAndroid='transparent'
          style={styles.draft}
          onChangeText={ (content) => { this.setState({ draft: content }) } }
        />
        {
          this.state.gist ?
          <Text style={styles.label}>Você criou um gist em {this.state.gist}</Text> :
          null
        }
        <Button onPress={this.createGist} title='Criar um gist anônimo' />
        {<View style={styles.divider} /> }
        <Button onPress={this.readLastGist} title='Descobrir o último gist anônimo do mundo' />
        {
          this.state.last ?
          <Text style={styles.label}>O último gist anônimo publicado NO MUNDO está disponível em {this.state.last}</Text> :
          null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    margin: 10,
  },
  divider: {
    margin: 10,
    height: 4,
    backgroundColor: '#000',
    width: '90%'
  },
  draft: {
    borderWidth: 1,
    width: '90%',
    height: 60,
    marginBottom: 10,
  },
  label: {
    width: '90%',
    textAlign: 'center',
  },
});
