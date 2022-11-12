import {signup} from"../controllers/authController";
import { signin } from "../controllers/authController";
import { signupValidation } from "../middleware/authMiddleware";
import { signinValidation } from "../middleware/authMiddleware";
import { updatePass } from "../controllers/authController";
import { findAllUsers } from "../controllers/authController";




export default (app?:any) => {

    app.post("/Chhayya/api/users/signup",{preHandler : signupValidation},signup);

    app.post("/Chhayya/api/users/signin",{preHandler : signinValidation},signin);

    app.put("/Chhayya/api/users", updatePass);

    app.get("/Chhayya/api/users",findAllUsers); 
}         