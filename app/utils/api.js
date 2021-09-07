import * as firebase from "firebase"

export function reauthenticate(password) {
    // bea-todo but it is a promisse, why is this working like so?
  const user = firebase.auth().currentUser
  const credentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  )

  return user.reauthenticateWithCredential(credentials)
}
