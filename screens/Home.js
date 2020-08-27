import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper';
//redux
import {useSelector, useDispatch} from 'react-redux'
// context
import {Mycontext} from '../App'


const Home = ({navigation}) => {
    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(true)

    //redux
    // const dispatch = useDispatch()
    // const {data, loading} = useSelector((state) => {
    //     return state
    // })

    // context api
    const {state, dispatch} = useContext(Mycontext)
    const {data, loading} = state


    const fetchData = () => {
        fetch("http://10.0.2.2:3000/")
        .then(res => res.json())
        .then(results => {
            // setData(results)
            // setLoading(false)

            // redux/context (common part- as related to reducer.js)
            dispatch({type: "ADD_DATA", payload: results})
            dispatch({type: "SET_LOADING", payload: false})

        }).catch(err=> {
            Alert.alert("Something went wrong")
        })
    }

    //useEffect is similar to DidMount
    useEffect(() => {
       fetchData()

    }, [])

    const renderList = ((item) => {
        return (
            <Card style={[StyleSheet.mycard, {margin: 5}]}
            onPress={() => navigation.navigate("Profile", {item:item})}
            >
            <View style={styles.cardview}>
                <Image 
                    style={{width: 60, height: 60, borderRadius: 30}}
                    source={{uri: item.picture}}
                />
                <View style={{marginLeft: 10}}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text >{item.position}</Text>
                </View>
            </View>
        </Card>
        )
    })

    return (
    
        <View style={{flex: 1}}>
           <FlatList 
            data={data}
            renderItem={({item}) => {
                return renderList(item)
            }}
            keyExtractor={item => item._id}
            onRefresh={() => fetchData()}
            refreshing={loading}
            />
            
            

            
            <FAB 
            style={styles.fab}
            small={false}
            icon="plus"
            theme={{colors: {accent: "#0A79DF"}}}
            onPress={() => navigation.navigate("Create")}
            />
        </View>

        


    
    )
}

const styles = StyleSheet.create({
    mycard: {
        
    },
    cardview: {
        
        flexDirection: "row",
        padding: 6,
    },
    text: {
        fontSize: 18,
        
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
})
export default Home;