import express, { Request, Response, NextFunction } from "express";
import cors from "cors"
import SuperTokens from "supertokens-node"
import Session from "supertokens-node/recipe/session"
import EmailPassword from "supertokens-node/recipe/emailpassword"

import bodyParser from "body-parser";
import {
    errorHandler,
    SessionRequest,
    middleware
} from "supertokens-node/framework/express"
import { verifySession } from "supertokens-node/recipe/session/framework/express"
import dotenv from "dotenv"
import z from "zod"

dotenv.config();

SuperTokens.init({
    framework: "express",
    supertokens: {
        connectionURI: process.env.SUPERTOKENS_CONNECTION_URI!,
        apiKey: process.env.SUPERTOKENS_API_KEY!,
    },
    appInfo: {
        appName: "Wurdle",
        apiDomain: process.env.API_BASE_URL!,
        websiteDomain: process.env.APP_BASE_URL!,
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        EmailPassword.init(), // initializes signin / sign up features
        Session.init() // initializes session features
    ]
});

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.use(
    cors({
        origin: process.env.APP_BASE_URL!,
        allowedHeaders: ["content-type", ...SuperTokens.getAllCORSHeaders()],
        credentials: true
    })
)

app.use(middleware());

app.get("/", (request: Request, response: Response) => {
    response.json({message: "Server is running"})
})

app.post (
    "/change-email",
    verifySession(),
    async (request: SessionRequest, response: express.Response) => {
        let session = request.session!;
        let email = request.body.email;

        const emailSchema = z.string().email();
        const result = emailSchema.safeParse(email);

        if (!result.success) {
            response.status(400).json({error:"Invalid email address"});
            return;
        }

        // Update the email without requiring a password
        const resp = await EmailPassword.updateEmailOrPassword({
            recipeUserId: session.getRecipeUserId(),
            email: email,
        });

        if (resp.status === "OK") {
            response.status(200).json({message: "Email updated successfully"});
            return;
        }
        if (resp.status === "EMAIL_ALREADY_EXISTS_ERROR") {
            response
                .status(403)
                .json({error: "Email already exists. Please use a different email"});
            return;
        }
        if (resp.status === "EMAIL_CHANGE_NOT_ALLOWED_ERROR") {
            response
                .status(403)
                .json({error: "Email change not allowed. Please contact support"});
            return;
        }

        response.status(500).json({error: "Internal server error"})
    }
);

app.use(errorHandler());

app.use((error: unknown, request: Request, response: Response, next: NextFunction) => {
    console.log("Error:", error);
    response.status(500).json({error: "Internal server error"});
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`SuperTokens APIs available at http://localhost:${PORT}/auth`);
})