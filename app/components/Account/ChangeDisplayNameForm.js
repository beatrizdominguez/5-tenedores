import React, {useState} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'

export default function ChangeDisplayNameForm (props) {
    const { displayName, setShowModal, toastRef, setRealoadUserInfo } = props
    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const disabled = !newDisplayName

    const handleOnChange = (e) => {
        setError(null)
        setNewDisplayName(e.nativeEvent.text)
    }
    
    
    const onSubmit = () => {
        setError(null)
        if(!newDisplayName){
            setError('EL nombre no puede estar vacío')
        }else if (displayName === newDisplayName){
            setError('No mismo nombre')
        } else {
            console.log(`todo ok`)
        }
    }

    const closeModal = () => setShowModal(false)
   
      return (
          <View style={styles.view}>
            <Input
                placeholder="Nombre y apellidos"
                containerStyle={styles.input}
                rightIcon={{
                type: "material-community",
                name: "account-circle-outline",
                color: "#c2c2c2",
                }}
                defaultValue={displayName || ""}
                onChange={handleOnChange}
                errorMessage={error}
            />
             <Button
                title="Cambiar nombre"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                disabled={disabled}
            />
          </View>
      )
}


const styles = StyleSheet.create({
    view: {
      alignItems: "center",
      paddingTop: 10,
      paddingBottom: 10,
    },
    input: {
      marginBottom: 10,
    },
    btnContainer: {
      marginTop: 20,
      width: "95%",
    },
    btn: {
      backgroundColor: "#00a680",
    },
  })  