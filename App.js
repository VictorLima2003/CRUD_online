import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import Item from './src/Item';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        lista:[],
        input:''
    };

    this.url = 'https://b7web.com.br/todo/41069';

    this.loadLista = this.loadLista.bind(this);
    this.addButton = this.addButton.bind(this);

    this.loadLista();

  }

  loadLista(){
    fetch(this.url)
      .then((r)=>r.json())
      .then((json)=>{
          let state = this.state;
          state.lista = json.todo;
          this.setState(state);
      });

  }

  addButton(){
      let texto = this.state.input;

      let state = this.state;
      state.input = '';
      this.setState(state);

      fetch(this.url, {
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          item:texto
        })
      })
        .then((r)=> r.json())
        .then((json)=>{
            alert('item inserido com sucesso!');
            this.loadLista();
        });

  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.addArea}>
              <Text style={styles.text}>Adicione uma nova tarefa</Text>
              <TextInput style={styles.input} onChangeText={(text)=> {
                  let state = this.state;
                  state.input = text;
                  this.setState(state);
              }} value={this.state.input}/>
                
              <TouchableOpacity style={styles.btn} onPress={this.addButton}>
                  <Text style={styles.btntxt}>Adicionar</Text>
              </TouchableOpacity>   

          </View>
          <FlatList 
              data={this.state.lista}
              renderItem={({item})=> <Item data={item} url={this.url} loadFunction={this.loadLista}/>}
              keyExtractor={(item,index)=>item.id} 
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    backgroundColor: '#fff',
  },
  addArea:{
    marginBottom:20,
    backgroundColor:'#DDDDDD',
    height:170,
    alignItems:'center'
  },
  text:{
    margin:10,
    fontSize:20
  },
  input:{
    height:40,
    width:300,
    backgroundColor:'#CCCCCC',
    margin:20,
    padding:10,
    borderRadius:10,
  },
  btntxt:{
    fontSize:22,
    color:'#8e44ad'
  }
});
