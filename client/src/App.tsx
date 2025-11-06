import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Team from "@/pages/Team";
import Booking from "@/pages/Booking";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminCalendar from "@/pages/AdminCalendar";
import AdminCustomers from "@/pages/AdminCustomers";
import AdminServices from "@/pages/AdminServices";
import AdminMarketing from "@/pages/AdminMarketing";
import AdminSEO from "@/pages/AdminSEO";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/team" component={Team} />
      <Route path="/booking" component={Booking} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/calendar" component={AdminCalendar} />
      <Route path="/admin/customers" component={AdminCustomers} />
      <Route path="/admin/services" component={AdminServices} />
      <Route path="/admin/marketing" component={AdminMarketing} />
      <Route path="/admin/seo" component={AdminSEO} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Route path="/admin/*">
            {() => null}
          </Route>
          <Route path="/((?!admin).*)">
            {() => <Navbar />}
          </Route>
          
          <main className="flex-1">
            <Router />
          </main>
          
          <Route path="/((?!admin).*)">
            {() => <Footer />}
          </Route>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
