// import { generateTokenAndSetCookie } from "../utils/generateToken";

export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "invalid email" })

        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "password must be at least 6 char" })
        }
        var existingUserByEmail = await User.findone({ email: email })

        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" })
        }
        var existingUserByEmail = await User.findone({ username: username })

        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "Username already exists" })
        }

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

        const image = PROFILE_PICS[(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            email,
            password,
            username,
            image,
        });

        // if (newUser) {
        //     generateTokenAndSetCookie(newUser._id, res)
        // }

        await newUser.save();

        res.status(201).json({
            success: true,
            user: {
                ...newUser_doc,
                password: "",
            },
        });


    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({ success: false, message: "internal server error" });
    }


}

export async function login(req, res) {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({ success: false, message: "All fields are required" })
//         }
//     const user = await User.findone ({email:email})
//     if(!user){
//         return res.status(404).json({ success: false, message: "invalid credentials" })
//     }
// // const ispassword

//     }
}

export async function logout(req, res) {
    try {
        res.clearcookie("jwt-netflix");
        res.status(200).json({ success: true, message: "Logged out" })
    }
    catch (error) {
        console.log("error in log out controller", error.message);
        res.status(500).json({ success: false, message: "internal server error" });
    }
}