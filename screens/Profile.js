import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Linking, Platform, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper';
import { MaterialIcons, Entypo } from '@expo/vector-icons';


const Profile = (props) => {

    const {_id, name, picture, phone, salary, email, position } = props.route.params.item
    const deleteEmployee = () => {
        fetch("http://10.0.2.2:3000/delete", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id
            })
        })
        .then(res=> res.json())
        .then(deletedEmployee => {
            Alert.alert(`${deletedEmployee.name} deleted`)
            props.navigation.navigate("Home")
        }).catch(err=> {
            Alert.alert("Something went wrong")
        })
    }
    const openDial = (phone) => {
            if(Platform.OS === "android"){
                Linking.openURL(`tel:${phone}`)
            }else {
                Linking.openURL(`telprompt:${phone}`)
            }
    }
    
    return (
        <View style={styles.root}>
            <LinearGradient 
                colors={["#003cff", "#78f1ff"]}
                style={{height: "20%",}}
            
            />

            <View style={{alignItems: "center"}}>
                <Image 
                    style={{width: 140, height: 140, borderRadius: 70, marginTop: -50}}
                    source={{uri: picture}}
                
                />
            </View>

            <View style={{alignItems: "center", margin: 15}}>
                <Title>{name}</Title>
                <Text style={{fontSize: 15}}>{position}</Text>
            </View>

            <Card style={styles.mycard} onPress={()=> {
                Linking.openURL(`mailto:${email}`)
            }}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="email" size={32} color="#0A79DF" />
                    <Text style={styles.mytext}>{email} </Text>
                </View>

            </Card>
            <Card style={styles.mycard} onPress={() => openDial(phone)}>
                <View style={styles.cardContent}>
                    <Entypo name="phone" size={32} color="#0A79DF" />
                    <Text style={styles.mytext}>{phone}</Text>
                </View>

            </Card>
            <Card style={styles.mycard}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="attach-money" size={32} color="#0A79DF" />
                    <Text style={styles.mytext}>{salary}</Text>
                </View>
            </Card>
            <View style={{flexDirection: "row", justifyContent: "space-around", padding: 10}}>
                <Button 
                icon="account-edit" 
                mode="contained" 
                theme={theme}
                onPress={() => 
                
                    props.navigation.navigate("Create", 
                    {_id, name, picture, phone, salary, email, position }
                    )}>
                    Edit
                </Button>
                <Button 
                icon="delete" 
                mode="contained" 
                theme={theme}
                onPress={() => deleteEmployee()} >
                    Remove Employee
                </Button>
            </View>

        </View>
    )

}

const theme = {
    colors: {
        primary: "#0A79DF"
        
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#ededed"
    },
    mycard: {
        margin: 3,
    },
    cardContent: {
        flexDirection: "row",
        padding: 8
    },
    mytext: {
        fontSize: 18,
        marginTop: 3,
        marginLeft: 5
    }
})
export default Profile;