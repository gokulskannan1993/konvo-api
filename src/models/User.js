import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    bio: {
        type: String,
        default: "",
    },
    profilePicture: {
        type: String,
        default: "",
    },
    nativeLanguage: {
        type: String,
        default: "",
    },
    learningLanguage: {
        type: String,
        default: "",
    },
    country: {
        type: String,
        default: "",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
}, {
    timestamps: true,
});


const User = mongoose.model("User", userSchema);    // Create a model from the schema and export it 

userSchema.pre("save", async function (next) { // Middleware to hash password before saving
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next(); // Proceed to the next middleware
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
}


export default User; // Export the User model for use in other parts of the application
// This code defines a Mongoose schema for a User model in a MongoDB database. The schema includes fields for user information such as name, email, password, and various other attributes. It also includes timestamps for when the user was created and last updated. The model is then exported for use in other parts of the application.
// The schema is used to define the structure of the user documents in the MongoDB collection, including data types and validation rules. The model provides an interface for interacting with the database, allowing for operations like creating, reading, updating, and deleting user records.