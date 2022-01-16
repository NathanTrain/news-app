import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {db} from './firebase.js';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';

LogBox.ignoreAllLogs(true);

function HomeScreen({navigation}) {

  const [noticias, setNoticias] = useState([]);

  useEffect(()=>{
    db.collection('noticias').orderBy('data','desc').onSnapshot(snapshot=>{
      setNoticias(snapshot.docs.map((doc)=>{
        return {info: doc.data()}
      }));
    })
  }, []);


  return (
    <View style={{flex:1}}>
      <View style={{ flex:0.3 }}>
        <ScrollView horizontal contentContainerStyle={{width:'200%', height:'100%'}} style={{flex:1}} >
          {
            noticias.map((val, index)=>{
              if (index < 2){
                return(                  
                  <ImageBackground source={{uri: val.info.imagem}} style={styles.image}>
                  <TouchableOpacity onPress={()=>navigation.navigate('Notícia',{
                      titulo: val.info.titulo,
                      conteudo: val.info.conteudo,
                      imagem: val.info.imagem
                    })} style={styles.imgCover} >
                    <Text style={{fontSize:27, color:'#fff'}} > {val.info.titulo} </Text>
                  </TouchableOpacity>
                </ImageBackground>
                )
              }
            })
          }
        </ScrollView>
      </View>

      <View style={{flex:0.7, padding:20}} >
        <View style={{width:140, height:2, backgroundColor:'#069',
          position:'absolute', left:20, top:50}} ></View>
        <Text style={{fontSize:20}} >Mais notícias:</Text>

        <ScrollView contentContainerStyle={{padding:20}} style={{flex:1}} >
          {
            noticias.map((val, index)=>{
              if (index >= 2){
                return (
                  <View style={{marginBottom:20}} >
                    <TouchableOpacity onPress={()=>navigation.navigate('Notícia',{
                        titulo: val.info.titulo,
                        conteudo: val.info.conteudo,
                        imagem: val.info.imagem
                      })} style={{flexDirection:'row'}} >
                      <Image source={{uri:val.info.imagem}} style={{width:125, height:100}} />
                      <Text style={{paddingLeft:13, fontSize:18, maxWidth:210}} >{val.info.titulo}</Text>
                    </TouchableOpacity>
                  </View>
                )
              }
            })
          }
        </ScrollView>
      </View>
    </View>
  );
}

function NoticiaScreen({route, navigation}) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{flex:1}}>
        <ImageBackground source={{uri: route.params.imagem}} style={styles.imageContent}>
          <View style={{...styles.imgCover, justifyContent:'flex-end', padding:10 }}>
            <Text style={{fontSize:27, color:'#fff'}} > {route.params.titulo }</Text>
          </View>
        </ImageBackground>
        <View style={{flex:1}}>
          <Text style={styles.noticiaConteudo} >{route.params.conteudo} </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer >
      <StatusBar style='dark' />
      <Stack.Navigator initialRouteName="Portal">
        <Stack.Screen name="Portal" component={HomeScreen} />
        <Stack.Screen name="Notícia" component={NoticiaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  image:{
    flex:1,
    resizeMode:'cover',
    justifyContent:'flex-end',
    width:'100%'
  },
  imgCover:{
    width: '100%', height:'100%',
    backgroundColor:'#0006',
    justifyContent:'flex-end',
  },
  imageContent:{
    resizeMode:'cover',
    width:'100%',
    flex:0.5,
    height:200
  },
  noticiaConteudo:{
    fontSize:16,
    padding:20,
    textAlign:'justify'
  },
})