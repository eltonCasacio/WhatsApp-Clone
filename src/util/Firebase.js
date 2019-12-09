const firebase = require('firebase')
require('firebase/firebase-firestore')

export class Firebase {

    constructor() {

        this._config = {

            apiKey: "AIzaSyBEX-UmoT7eSwCb3YtT1pZmEsXSpVG4eVg",
            authDomain: "whatsapp-clone-93b70.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-93b70.firebaseio.com",
            projectId: "whatsapp-clone-93b70",
            storageBucket: "whatsapp-clone-93b70.appspot.com",
            messagingSenderId: "75764119880",
            appId: "1:75764119880:web:1b61f1321c77983600db7d",
            measurementId: "G-DGYZ13EWV9"

        }
        this.init();
    }

    init() {

        if (!this._initialize) {
            firebase.initializeApp(this._config);

            firebase.firestore().settings({});

            this._initialize = true;
        }

    }

    static db() {
        return firebase.firestore();
    }

    static hd() {
        return firebase.storage();
    }

    initAuth() {

        return new Promise((resolve, reject) => {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
                .then(result => {

                    let token = result.credential.accessToken;
                    let user = result.user;

                    resolve(user, token);
                })
                .catch(err => {
                    console.error(err);
                    reject(err)
                });
        })
    }

}