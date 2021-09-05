import React, {useState} from 'react'
import { size, isEmpty } from 'lodash'
import { StyleSheet, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { validateEmail } from './../../utils/validations'
import * as firebase from 'firebase'

export default function RegisterForm (props) {
    const  toastRef = props.toastRef;
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValue)
    
    const onSubmit = () => {
        if(
        isEmpty(formData.email) || 
        isEmpty(formData.password) || 
        isEmpty(formData.passwordRepeat)){
            toastRef.current.show('Todos los campos son obligatorios')
        }else if(!validateEmail(formData.email)){
            toastRef.current.show('El email no es correcto')
        } else if(formData.password !== formData.passwordRepeat){
            toastRef.current.show('Las contraseñas tienen que ser iguales')
        } else if(size(formData.password) < 6){
            toastRef.current.show('La contraseña tiene que tener al menos 6 caracteres')
        }else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                console.log(`ok register`)
                })
                .catch(() => {
                    console.log(`fail register`)
                })
        }
    }

    const onChange = (e, type) => {
        const value = e.nativeEvent.text
        setFormData({...formData, [type]: value})
    }

 return (
    <View style={styles.formContainer}>
        <Input
            placeholder='Correo electrónico'
            containerStyle={styles.inputForm}
            onChange={(e) => onChange(e, 'email')}
            rightIcon={
                <Icon
                    type="material-community"
                    name="at"
                    iconStyle={styles.iconRight}
                />
            }
        />
        <Input
            placeholder='Contraseña'
            containerStyle={styles.inputForm}
            password={true}
            secureTextEntry={showPassword ? false : true}
            onChange={(e) => onChange(e, 'password')}
            rightIcon={
                <Icon
                    type="material-community"
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconRight}
                    onPress={() => setShowPassword(!showPassword)}
                />
            }
        />
        <Input
            placeholder='Repite tu contraseña'
            containerStyle={styles.inputForm}
            password={true}
            secureTextEntry={showRepeatPassword ? false : true}
            onChange={(e) => onChange(e, 'passwordRepeat')}
            rightIcon={
                <Icon
                    type="material-community"
                    name={showRepeatPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconRight}
                    onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                />
            }
        />
        <Button
            title="Unirse"
            containerStyle={styles.btnContainerRegister}
            buttonStyle={styles.btnRegister}
            onPress={onSubmit}
        />
    </View>
 )
}

function defaultFormValue() {
    return {
      email: "",
      password: "",
      passwordRepeat: "",
    }
  }

const styles = StyleSheet.create({
    formContainer: {
    //   flex: 1,
    //   alignItems: "center",
    //   justifyContent: "center",
      marginTop: 30,
    },
    inputForm: {
      width: "100%",
      marginTop: 20,
    },
    btnContainerRegister: {
      marginTop: 20,
      width: "95%",
    },
    btnRegister: {
      backgroundColor: "#00a680",
    },
    iconRight: {
      color: "#c1c1c1",
    },
  });
  