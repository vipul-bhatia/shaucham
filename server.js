const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');
const nodemailer = require('nodemailer');

let serviceAccount = require("./shauchamofficial-firebase-adminsdk-s2hdn-a9637bb9ab.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

let staticPath = path.join(__dirname, "public");

const app = express();

app.use(express.static(staticPath));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "mainpage.html"));
})

//signup
app.get("/signup", (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
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

app.listen(7000, () => {
    console.log('listening on port 7000.......');
})



