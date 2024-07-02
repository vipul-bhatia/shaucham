const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');
const nodemailer = require('nodemailer');

// let serviceAccount = require("./shaucham-web-firebase-adminsdk-g8lbd-8663865fcf.json");

require('dotenv').config();

const config = {
    "type": 'service_account',
    "project_id": 'shaucham-web',
    "private_key_id": '8663865fcfe1c6a051757c98e48bf20b3dbb1ac3',
    "private_key": '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCnkgTesPYVEoU9\nXTRZhvMHC8PwEpUUnklxESvVh+TNoDvfz9RaI/Z0Yo0ZNQ5qLOPKsUYf35PLnSqB\nEZVW0HLQm1Ql1S4V5l6qN9nsDWyADGoDYwvkdK1VP1MLBzOvnN4/JR8mBnpHFFQW\n00OMDI6L27C6T93RFYmlOnDGpjyHXJi7YkFfrES4Fw7rRIHj3Au8U7iL0QIXT09C\nSodk/cmuMoN/1li9oRnyAt4GMGxe44EwFzxN+i8zGjjPz1m2mNolMKXIKUf/zVth\nf7nBqier0ZH6gSlSnMX0rhDZLNqPBsM0gBETVsUe9sVl4GqPOMKa9uoBdVRUDt1/\nn/SPqwl/AgMBAAECggEAGxoHNpspWbQin4+dAWPNl5SkDoZ63RhSqXpM/B6b91PU\nizi6UA/j8uPjjTGjELIM74HnZQ1MgpB7SN+2pxFUmH+exvWpG/qj0eTxlnd/VmBr\nnvucd0kVpaV1wWFbTypQWacf2A8RJMDZbs2hbZu0TFNuTFvRdNkGZ5ZBmidVv9CL\nFBF5MYo4lewsdeH0IdVKQBUpRKhVdLt43SW9tWFDzxrqRHdh4CW5Z647xo06ZIDe\nkgGdZHDM/+lgUvp6QB+0ZjUq5EYTXry9KPOGsOVz+3FgJCheTZ8hzcsBqI9k+MAP\nMzZu98TY/Aa+e9dB9+uTLPde7DtsgeTUGJMYGTU3QQKBgQDqO+WfpVHlsX1tvJi2\njhglgGrRWgQ1D4A7Wndcx8O15BlirrCzSgTp+67DEUYMNtYSkeuvdXj+oF9A6w7z\nKk7jeW0n3Uf1hoJSV8r5asnqNO/hmUTmyVcVXss6bzE1FAhbMvLDSY9t7R3QI47S\n/0EpEkuufw2+rMsKNUsJzQ8svwKBgQC3JEmOTBnPROTnBEYvpM4HdVJIQQmZ3Nss\n9eD8JIPxH00hdbpReV4zI/j+HLrrCZQKvWse89Dkny8JnNTaE7kJ1naBNB9Ezujc\nDNEy9Hb8/i9cLDvA77cARvAAabEf1+4kG6UjOjLxr8JEVLd+iVk1Q/eXidXI5XwT\nZ4boXKGTQQKBgQDR6ZPDGnjmi8WITnfdQkJJeWhA7ZbPpnCYwF4v+6Zcn2pQkZUx\nV6hHuJHJpvVLhOkcA0FgILqqFjbHCuB+8u931B4Kl7ghRMYN3Te9hgIlrgM7/gtN\neCpesHEYkQVcN/O1J1d/w7CSJumM2hDo7nAKyqagXqSGuHvNTi1NP0PWKQKBgAHL\nRzUvpakUIbHpps5crPABxDaU/IUXVsZP+k4+BVTdW6ISRyr5J2UU2yGSInqe82ZP\niLca6Fb1AD713FfujYd9JFgLrKq95CYTshDvuCKuUsRyYnt3XbGRAFTgtC19rgWI\nh8uajFk1wY9tzQZeThNpgQlo/kEjjl2aTAYGskaBAoGBAJ4V9y46BOUKCdpJKW3Q\n7G1Ql9+zbTkXuDEqhBSh0X46CIjbJXVXHEutSugeZztCQvCEzAmHJPgbEWRm23ID\n8IOfJ57PMwJpnWYDkG59KQifJmsobtKAAOcPbHoCmNylvbQW++SJzRulVkn6Xho7\nsZh1UroApMLTuyZnrxSvGJFf\n-----END PRIVATE KEY-----\n',
    "client_email": 'firebase-adminsdk-g8lbd@shaucham-web.iam.gserviceaccount.com',
    "client_id": '109364799977036116019',
    "auth_uri": 'https://accounts.google.com/o/oauth2/auth',
    "token_uri": 'https://oauth2.googleapis.com/token',
    "auth_provider_x509_cert_url": 'https://www.googleapis.com/oauth2/v1/certs',
    "client_x509_cert_url": 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-g8lbd%40shaucham-web.iam.gserviceaccount.com',
    "universe_domain": 'googleapis.com'
};

console.log(config, 'configgggg')



admin.initializeApp({
    credential: admin.credential.cert(config)
});

let db = admin.firestore();

let staticPath = path.join(__dirname, "public");

const app = express();



app.use(express.json());
app.get('/logs', (req, res) => {
    res.status(200).json({ config })
})
app.use(express.static(staticPath));

app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})


//signup
app.get("/signup", (req, res) => {
    res.sendFile(path.join(staticPath, "signup"));
})

app.post('/signup', (req, res) => {
    let { name, email, password, number, tac, notification } = req.body;

    if (name.length < 3) {
        return res.json({ 'alert': 'name must be 3 letters long' });
    } else if (!email.length) {
        return res.json({ 'alert': 'enter your email' });
    } else if (password.length < 8) {
        return res.json({ 'alert': 'password should be 8 letters long' });
    } else if (!number.length) {
        return res.json({ 'alert': 'enter your phone number' });
    } else if (!Number(number) || number.length < 10) {
        return res.json({ 'alert': 'invalid number, please enter valid one' });
    } else if (!tac) {
        return res.json({ 'alert': 'you must agree to our terms and conditions' });
    }

    // store user in db
    db.collection('user').doc(email).get()
        .then(user => {
            if (user.exists) {
                return res.json({ 'alert': 'email already exists' });
            } else {
                // encrypt the password before storing it.
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        db.collection('user').doc(email).set(req.body)
                            .then(data => {
                                res.json({
                                    name: req.body.name,
                                    email: req.body.email,
                                })
                            })
                    })
                })
            }
        })
})

//login
app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"));
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;

    if (!email.length || !password.length) {
        return res.json({ 'alert': 'fill all the inputs' })
    }

    db.collection('user').doc(email).get()
        .then(user => {
            if (!user.exists) { // if email doesnot exists
                return res.json({ 'alert': 'log in email does not exists' })
            } else {
                bcrypt.compare(password, user.data().password, (err, result) => {
                    if (result) {
                        let data = user.data();
                        return res.json({
                            name: data.name,
                            email: data.email,
                        })
                    }
                    else {
                        return res.json({ 'alert': 'password in incorrect' });
                    }
                })
            }
        })
})


//product
app.get("/product", (req, res) => {
    res.sendFile(path.join(staticPath, "product.html"));
})

app.get('/data/products.json', (req, res) => {
    res.sendFile(path.join(staticPath, 'data/products.json'));
});


//search
app.get("/search", (req, res) => {
    res.sendFile(path.join(staticPath, "search.html"));
})

//bath&body
app.get("/Soap", (req, res) => {
    res.sendFile(path.join(staticPath, "bath&body.html"));
})

//cream&lipbalm
app.get("/cream&lipbalm", (req, res) => {
    res.sendFile(path.join(staticPath, "cream&lipbalm.html"));
})

//whyshaucham
app.get("/why", (req, res) => {
    res.sendFile(path.join(staticPath, "whyshaucham.html"));
})

//facewash&oil
app.get("/facewash&oil", (req, res) => {
    res.sendFile(path.join(staticPath, "facewash&oil.html"));
})

//cart
app.get("/cart", (req, res) => {
    res.sendFile(path.join(staticPath, "cart.html"));
})

//checkout
app.get("/checkout", (req, res) => {
    res.sendFile(path.join(staticPath, "checkout.html"));
})

app.listen(3000, () => {
    console.log('listening on port 3000.......');
})



