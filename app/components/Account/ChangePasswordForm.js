import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { size } from "lodash";
import * as firebase from "firebase";
import { reauthenticate } from "../../utils/api";

export default function ChangePasswordForm(props) {
    const { setShowModal, toastRef } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defualtValue());
    const [errors, setErrors] = useState({other: 'jemplos'});
    const [loading, setLoading] = useState(false);

    const onChange = (e, type) => {
        setErrors({ ...errors, [type]: undefined })
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    };

    const onSubmit = async () => {
        setErrors({})

        if (
            !formData.password ||
            !formData.newPassword ||
            !formData.repeatNewPassword
        ) {
            setErrors({
                password: !formData.password
                    ? "La contraseña no puede estar vacia."
                    : "",
                newPassword: !formData.newPassword
                    ? "La contraseña no puede estar vacia."
                    : "",
                repeatNewPassword: !formData.repeatNewPassword
                    ? "La contraseña no puede estar vacia."
                    : "",
            })
        } else if (formData.newPassword !== formData.repeatNewPassword) {
            setErrors({
                newPassword: "Las contraseñas no son iguales",
                repeatNewPassword: "Las contraseñas no son iguales",
            })
        } else if (size(formData.newPassword) < 6) {
            setErrors({
                newPassword: "La contraseña tiene que ser mayor a 5 caracteres.",
                repeatNewPassword: "La contraseña tiene que ser mayor a 5 caracteres.",
            })
        } else {
            setLoading(true)
            await reauthenticate(formData.password)
                .then(async () => {
                    setLoading(false)
                    await firebase.auth().currentUser.updatePassword(formData.password)
                        .then(() => {
                            setLoading(false)
                            setShowPassword(false)
                            setShowModal(false)
                        })
                        .catch(() => {
                            setLoading(false)
                            setErrors({
                                other: 'no se ha podido cambiar'
                            })
                        })
                })
                .catch(() => {
                    setLoading(false)
                })
        }
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Contraseña actual"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword),
                }}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errors.password}
            />
            <Input
                placeholder="Nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword),
                }}
                onChange={(e) => onChange(e, "newPassword")}
                errorMessage={errors.newPassword}
            />
            <Input
                placeholder="Repetir nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword),
                }}
                onChange={(e) => onChange(e, "repeatNewPassword")}
                errorMessage={errors.repeatNewPassword}
            />
            <Button
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
            <Text>{errors.other}</Text>
        </View>
    );
}

function defualtValue() {
    return {
        password: "",
        newPassword: "",
        repeatNewPassword: "",
    };
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
});
