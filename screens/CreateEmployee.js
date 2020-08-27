import React, {useState} from 'react';
import { StyleSheet, Text, View, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CreateEmployee = ({navigation, route}) => {
    const getDetails = (type) => {
    if(route.params){
        
        switch(type) {
            case "name": 
                return route.params.name
            case "phone":
                return route.params.phone
            case "email":
                return route.params.email
            case "salary":
                return route.params.salary
            case "picture":
                return route.params.picture
            case "position":
                return route.params.position
            
        }
        
    }
    return ""
}
    const [name, setName] = useState(getDetails("name"))
    const [phone, setPhone] = useState(getDetails("phone"))
    const [email, setEmail] = useState(getDetails("email"))
    const [salary, setSalary] = useState(getDetails("salary"))
    const [picture, setPicture] = useState(getDetails("picture"))
    const [position, setPosition] = useState(getDetails("position"))
    const [enableshift, setenableShift] = useState(false)

    const [modal, setModal] = useState(false)

    const submitData = () => {
        
        fetch("http://10.0.2.2:3000/send-data", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(`${data.name} is saved successfully`)
            navigation.navigate('Home')
        }).catch(err=> {
            Alert.alert("Error while uploading")
        })
    }

    const updateDetails = () => {
        fetch("http://10.0.2.2:3000/update", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                id: route.params._id,
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(`${data.name} is updated successfully`)
            navigation.navigate('Home')
        }).catch(err=> {
            Alert.alert("Something went wrong")
        })
    }

    const pickFromGallery = async () => {
      const {granted} =  await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if(granted){
            const data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1,1],
                quality: 0.3,
            })
            if(!data.cancelled){
                let newfile = { 
                    uri: data.uri, 
                    type: `test/${data.uri.split(".")[1]}`, 
                    name:`test.${data.uri.split(".")[1]}`          
                }
                handleUpload(newfile)    
            }
      }else {
        Alert("Unable to upload Image due to permission issues")
      }
    }
    const pickFromCamera = async () => {
      const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
      if(granted){
            const data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1,1],
                quality: 0.3,
            })
            if(!data.cancelled){
                let newfile = { 
                    uri: data.uri, 
                    type: `test/${data.uri.split(".")[1]}`, 
                    name:`test.${data.uri.split(".")[1]}`          
                }
                handleUpload(newfile)    
            }
            
      }else {
        Alert("Unable to upload Image due to permission issues")
      }
    }
    
    const handleUpload = (image) => {
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset','employeeApp')
        data.append("cloud_name","balajiraop")

        fetch("https://api.cloudinary.com/v1_1/balajiraop/image/upload",{
            method: "post",
            body: data
        }).then(res => res.json())
        .then(data => {
            
            setPicture(data.url)
            setModal(false)
        }).catch(err=> {
            Alert.alert("Image not uploaded")
        })
    }
    return (
        <KeyboardAvoidingView  behavior="position" style={styles.root} enabled={enableshift}>
        <View >
            
             <TextInput
                label="Name"
                style={styles.inputStyle}
                value={name}
                onFocus={() => setenableShift(false)}
                mode="outlined"
                theme = {theme}
                onChangeText={text => setName(text)}
                />
            <TextInput
                label="Email"
                style={styles.inputStyle}
                value={email}
                onFocus={() => setenableShift(false)}
                mode="outlined"
                theme = {theme}
                onChangeText={text => setEmail(text)}
                />
            <TextInput
                label="Phone"
                style={styles.inputStyle}
                value={phone}
                mode="outlined"
                onFocus={() => setenableShift(false)}
                keyboardType="number-pad"
                theme = {theme}
                onChangeText={text => setPhone(text)}
                />
            <TextInput
                label="Salary"
                style={styles.inputStyle}
                value={salary}
                onFocus={() => setenableShift(true)}
                mode="outlined"
                keyboardType="number-pad"
                theme = {theme}
                onChangeText={text => setSalary(text)}
                />
            <TextInput
                label="Position"
                style={styles.inputStyle}
                value={position}
                onFocus={() => setenableShift(true)}
                mode="outlined"
                keyboardType="number-pad"
                theme = {theme}
                onChangeText={text => setPosition(text)}
                />

            <Button 
            style={styles.inputStyle} 
            icon={picture == "" ? "upload":"check"} 
            mode="contained" 
            theme={theme}
            onPress={() => setModal(true)}>
                Upload image
            </Button>

            {route.params ?
            <Button 
            style={styles.inputStyle} 
            icon="content-save" 
            mode="contained" 
            theme={theme}
            onPress = { () => updateDetails() }>
                Update details
            </Button>
            :
            <Button 
            style={styles.inputStyle} 
            icon="content-save" 
            mode="contained" 
            theme={theme}
            onPress = { () => submitData() }>
                Save
            </Button>
            }
            
                        
            <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => {
                setModal(false)
            }}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalButtonView}>
                        <Button 
                        icon="camera" 
                        mode="contained" 
                        theme={theme}
                        onPress={() => pickFromCamera()}>
                            Camera
                        </Button>
                        
                        <Button 
                        icon="image-area" 
                        mode="contained" 
                        theme={theme}
                        onPress={() => pickFromGallery()}>
                            Gallery
                        </Button>

                    </View>
                    <Button theme={theme} onPress={() => setModal(false)}>
                        cancel
                    </Button>
                </View>

            </Modal>
            
        </View>
        </KeyboardAvoidingView>
    )
}

const theme = {
    colors: {
        primary: "#0A79DF"
        
    }
}

const styles = StyleSheet.create ({
    root: {
        flex: 1,
    },
    inputStyle: {
        margin: 4,
        
    },
    modalView: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        backgroundColor: "#f0f0f0",
    },
    modalButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
})
export default CreateEmployee;