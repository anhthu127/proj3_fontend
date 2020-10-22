export const api_url = "http://localhost:3003/api/"

export const instagram = {
   clientId: "346189446612906",
   //  redirectUri:'https://cloneinsta-398a2.firebaseapp.com/',
   // redirectUri: 'https://a052bf489711.ngrok.io/home',
   redirectUri: 'https://google.com/',
   responseType: 'code',
   scope: ['user_profile', 'user_media']

}

export const app_icon = "../../icon_app.png"

export const lettersRegex = RegExp(/^[0-9a-zA-Z]+$/);
export const phoneRegex = RegExp(/^[0-9]+$/);
export const emailRegex = RegExp(
   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);