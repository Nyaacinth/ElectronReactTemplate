import { createRoot } from "react-dom/client"
import { Route, Router } from "wouter"
import { Splash } from "./views/Splash"

// biome-ignore lint/style/noNonNullAssertion: Non-null by index.html
createRoot(document.getElementById("root")!).render(
    <Router>
        <Route path="/" component={Splash} />
    </Router>
)
