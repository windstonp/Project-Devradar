import React, {useState,useEffect} from "react";
import {StyleSheet, Image,View,Text, TextInput,TouchableOpacity, Keyboard} from 'react-native';
import MapView, {Marker, Callout} from "react-native-maps";
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import {MaterialIcons} from '@expo/vector-icons';
import api from '../services/api';
function Main({navigation}){
    const [techs,setTechs] = useState('');
    const [devs,setDevs] = useState([]);
    const [currentRegion,setCurrentRegion] = useState(null);
    useEffect(()=>{
        //carrega a função inicial do mapa
        async function LoadInitialPosition(){
            const {granted} =await requestPermissionsAsync();
            if(granted){
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
                const {latitude, longitude} = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.015,
                });
            }
        }
        LoadInitialPosition();
    },[]);
    async function loadDevs(){
        const {latitude, longitude} = currentRegion;
        const response = await api.get('/search',{
            params:{
                latitude,
                longitude,
                techs
            }
        });
        setDevs(response.data.devs);
    }
    function handleRegionChanged(region){
        console.log(region)
        setCurrentRegion(region);
    }
    if (!currentRegion) {
        return null;
    }
    return(
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>
                {devs.map(dev=>(
                    <Marker key={dev._id} coordinate={{ latitude: dev.location.coordinates[1] , longitude: dev.location.coordinates[0] }}>
                        <Image style={styles.avatar} source={{ uri: dev.avatar_url }}/>
                        <Callout onPress={()=>{
                            //navegação
                            navigation.navigate('Profile',{ github_username: dev.github_username });
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style= {styles.searchForm}>
                <TextInput 
                    style= {styles.searchInput}
                    placeholder="Search Devs by technologies"
                    placeholderTextColor = "#888"
                    autoCapitalize = "words"
                    autoCorrect = {false}
                    value = {techs}
                    onChangeText={setTechs}
                />
                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#fff"/>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 50,
        borderWidth:3,
        borderColor:'#7138E1'
    },
    callout: {
        width: 260,
    },
    devName:{
        fontWeight: 'bold',
        fontSize:16,
        textAlign: 'center'
    },
    devBio:{
        color: 888,
        marginTop: 5,
        textAlign: 'center'
    },
    devTechs:{
        marginTop: 5,
        textAlign: 'center'
    },
    searchForm:{
        position:'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchInput:{
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius:25,
        paddingHorizontal:20,
        fontSize:16,
        shadowColor:'#000',
        shadowOpacity:0.5,
        shadowOffset:{
            width:5,
            height:5
        },
        elevation: 5,
    },
    loadButton:{
        width: 50,
        height:50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems:'center',
        marginLeft: 20
    }
})

export default Main;