"use strict";
exports.__esModule = true;
var app_1 = require("firebase/app");
var firebaseConfig = {
    apiKey: "AIzaSyCZffmSnNW9Zhryv5D0Km5ltkaQCzAkTz8",
    authDomain: "coder-36664.firebaseapp.com",
    projectId: "coder-36664",
    storageBucket: "coder-36664.appspot.com",
    messagingSenderId: "546841242119",
    appId: "1:546841242119:web:ae88e02820428cb01358a2"
};
var app = (0, app_1.initializeApp)(firebaseConfig);
var initFirebase = function () { return app; };
exports["default"] = initFirebase;
