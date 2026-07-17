import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Game from './components/game/Game'
import Homepage from './components/homepage/Homepage'
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui';
import * as reactRouterDom from "react-router-dom";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.com/docs/references/frontend-sdks/reference#sdk-configuration
    appName: "Wurdle",
    apiDomain: "http://localhost:8080",
    websiteDomain: "http://localhost:5173/wurdle",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  getRedirectionURL: async (context) => {
    if (context.action === "SUCCESS" && context.newSessionCreated) {
      if (context.redirectToPath !== undefined) {
          // we are navigating back to where the user was before they authenticated
          return context.redirectToPath;
      }
      return "/wurdle" 
    }
  },
  recipeList: [EmailPassword.init(), Session.init()],
});

function App() {
  return (
    <>
      <div className="App">
        <SuperTokensWrapper>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/wurdle" />} />
                <Route path="/wurdle" element={<Homepage />} />
                <Route path="/wurdle/game/:rows/:columns" element={<Game />} />
                {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [EmailPasswordPreBuiltUI])}
              </Routes>
            </BrowserRouter>
        </SuperTokensWrapper>
      </div>
    </>
  )
}

export default App
