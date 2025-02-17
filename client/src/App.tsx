import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/HomePage";
import StoryPage from "@/pages/StoryPage";
import StoriesPage from "@/pages/StoriesPage";
import NotFound from "@/pages/not-found";

// Get the base path from the deployment environment
const basePath = import.meta.env.BASE_URL || "/";

function Router() {
  return (
    <WouterRouter base={basePath}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/story" component={StoryPage} />
        <Route path="/stories" component={StoriesPage} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;