import {signup} from"../controllers/authController";
import { signin } from "../controllers/authController";
import { signupValidation } from "../middleware/authMiddleware";
import { signinValidation } from "../middleware/authMiddleware";
import { updatePass } from "../controllers/authController";
import { findAllUsers } from "../controllers/authController";




export default (app?:any) => {

    app.post("/testing/api/users/signup",{preHandler : signupValidation},signup);

    app.post("/testing/api/users/signin",{preHandler : signinValidation},signin);

    app.put("/testing/api/users", updatePass);

    app.get("/tesing/api/users",findAllUsers); 
}         