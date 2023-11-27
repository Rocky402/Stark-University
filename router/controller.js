const express = require('express');

const router = express.Router();

const multer = require('multer');

const registration = require('../models/register_schema')// registration data

const admission = require('../models/admission_schema') //admissions data

const contact = require('../models/contact_schema') // contact schema


router.get('/', function (req, res) {
    res.render("index");
})


router.get('/login', function (req, res) {
    res.render("login")
})


router.get('/register', function (req, res) {
    res.render("register")
})

// sign up page api


router.get('/contactus', function (req, res) {
    res.render("contact")
})

router.get('/admitted', async (req, res) => {
    try {
        const viewAdmin = await admission.find({}); //this code is for connecting admitted to mongo data
        res.render("admitted", { viewAdmin: viewAdmin });
        // console.log(viewAdmin);
    } catch (err) {
        console.log(err);
    }
})

router.get('/accessory', function (req, res) {
    res.render("accessory")
})

// router.post('/dlogin', function (req, res) {
//     const user = registration.findOne({
//         email: req.body.email,
//         password: req.body.password,
//     }, (err, user) => {
//         if (err) {
//             res.render('/admin', {
//                 message: 'something wong',
//             });
//         } else if (user) {
//             if (user.email === 'admin@gmail.com') {
//                 res.render('/dashboard');
//             } else {
//                 res.redirect('/admin');
//             } else {
//                 res.render('/admin', {
//                     message: 'invalid data',
//                 });
//             }
//         }
//     });
// }); 

router.get('/admin', function (req, res) {
    res.render("dashboard/d-login");
})

// router.get('/showDetail', function (req, res) {
//     res.render("show_detail")
// })

router.get('/show/:id', async (req, res) => {

    try {
        const showdata = await admission.findById(req.params.id);
        res.render('show_detail', { showdata: showdata });
        // console.log(showdata);
    } catch (err) {
        console.log(err);
    }
});


router.get('/dashboard/contact', async (req, res) => {
    try {
        const viewCon = await contact.find({});
        res.render("dashboard/view_contact", { viewCon: viewCon });
        // console.log(viewCon);    
    } catch (err) {
        console.log(err);
    }
})

router.get('/dashboard/nettable', function (req, res) {
    res.render("dashboard/netTable");
})

// router.get('/dashboard/viewreg', function (req, res) {
//     res.render("dashboard/view_regis")
// })

router.get("/dashboard/viewreg", async (req, res) => {
    try {
        const viewReg = await registration.find({});
        res.render('dashboard/view_regis', { viewReg: viewReg });
        // console.log(viewReg);
    } catch (err) {
        console.log(err);
    }
});


router.get('/dashboard/viewadmin', async (req, res) => {
    try {
        const viewAdmin = await admission.find({}); //this code is for connecting dashboard to mongo
        res.render("dashboard/view_admissions", { viewAdmin: viewAdmin });
        // console.log(viewAdmin);
    } catch (err) {
        console.log(err);
    }
});

router.get('/dashboard/admissions', function (req, res) {
    res.render("dashboard/admissions")
})

router.get("/delete/:id", async (req, res) => {
    try {
        const register1 = await registration.findByIdAndRemove(req.params.id);

        res.redirect("../dashboard/viewreg");
        // res.send('<script>window.location.href="http://localhost:8080/dashboard/viewreg"');

    } catch (err) {
        console.log(err);
    }
});

router.get("/edit/:id", async (req, res) => {
    try {
        const reg1 = await registration.findById(req.params.id);
        res.render('dashboard/edit-registration', { reg1: reg1 });

        // res.send('<script>window.location.href="http://localhost:8080/dashboard/viewreg"');

    } catch (err) {
        console.log(err);
    }
});

router.post("/edit/:id", async (req, res) => {

    try {
        let editSchema = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email
        }
        const data = await registration.findByIdAndUpdate(req.params.id, editSchema);
        res.redirect('../dashboard/viewreg');
    }
    catch (err) {
        console.log(err);

    }
});


router.get("/deleteA/:id", async (req, res) => {
    try {
        const register1 = await admission.findByIdAndRemove(req.params.id);

        res.redirect("../dashboard/viewadmin");
        // res.send('<script>window.location.href="http://localhost:8080/dashboard/viewreg"');

    } catch (err) {
        console.log(err);
    }
});

router.get("/editA/:id", async (req, res) => {
    try {
        const reg2 = await admission.findById(req.params.id);
        res.render("dashboard/edit-admissions", { reg2: reg2 });

        // res.send('<script>window.location.href="http://localhost:8080/dashboard/viewreg"');

    } catch (err) {
        console.log(err);
    }
});

// code for editing info after posting data
router.post("/editA/:id", async (req, res) => {

    try {
        let editSchema1 = {
            sfname: req.body.sfname,
            slname: req.body.slname,
            semail: req.body.semail,
            saddress: req.body.saddress,
            scourse: req.body.scourse,
            syear: req.body.syear,
            sfile: req.file.sfile,
            inlineRadioOptions: req.body.inlineRadioOptions
        }
        const data = await admission.findByIdAndUpdate(req.params.id, editSchema1);
        res.redirect('../dashboard/viewadmin');
    }
    catch (err) {
        console.log(err);

    }
});

router.get("/deleteC/:id", async (req, res) => {
    try {
        const contact1 = await contact.findByIdAndRemove(req.params.id);

        res.redirect("../dashboard/contact");
        // res.send('<script>window.location.href="http://localhost:8080/dashboard/viewreg"');

    } catch (err) {
        console.log(err);
    }
});



router.post('/register', (req, res) => {

    var register = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password

    };
    var regpost = new registration(register);
    regpost.save()
        .then(() =>
            res.json('registered successfully'))
        // res.redirect("/login")
        .catch(err => res.status(400).json('error' + err));
})

router.post('/login', async (req, res) => {
    var email = req.body.email,
        password = req.body.password;

    try {
        var user = await registration.findOne({ email: email })
            .exec();
        if (!user) {
            res.redirect('/login');
        }

        user.comparePassword(password, (error, match) => {
            if (!match) {
                res.redirect("/login");
            }
        });


        req.session.user = user;
        res.redirect('/');

    } catch (error) {
        console.log(error);
    }
});

router.get("/logout", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie("user_sid");
        res.redirect("/");
    } else {
        res.redirect("/login");
    }
});

router.get('/dashboard', (req, res) => {

    if (req.session.user && req.cookies.user_sid) {
        res.render("dashboard/d-index")
    }


    else {
        res.redirect("/login");
    }
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');

    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const filefilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, filefilter });




router.post('/admission', upload.single('sfile'), (req, res) => {

    var admissions = {
        sfname: req.body.sfname,
        slname: req.body.slname,
        semail: req.body.semail,
        saddress: req.body.saddress,
        scourse: req.body.scourse,
        syear: req.body.syear,
        sfile: req.file.filename,
        inlineRadioOptions: req.body.inlineRadioOptions

    };
    var regpost1 = new admission(admissions);
    regpost1.save()
        .then(() =>
            res.json('admitted successfully'))
        .catch(err => res.status(400).json('error' + err));
})



router.post('/contact', (req, res) => {

    var contacts = {
        cname: req.body.cname,
        cemail: req.body.cemail,
        ctext: req.body.ctext

    };
    var regpost2 = new contact(contacts);
    regpost2.save()
        .then(() =>
            res.json('We will contact you soon'))
        .catch(err => res.status(400).json('error' + err));
})



// router.get('/dashboard/viewreg', function (req, res) {
//     res.render("dashboard/view_regis")
// })














module.exports = router;
