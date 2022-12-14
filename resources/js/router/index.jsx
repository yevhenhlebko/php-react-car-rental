import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Welcome from "../pages/welcome";
import Home from "../pages/home";
import Login from "../pages/auth/login";
import Join from "../pages/auth/join";
import ForgotPassword from "../pages/auth/forgot-password";
import ResetPassword from "../pages/auth/reset-password";
import NotFound from "../pages/404";
import CarSelect from "../pages/car-select";
import DateSelect from "../pages/date-select";
import ReservationConfirm from "../pages/reservation-confirm";
import UserApproval from "../pages/user-approval";
import SlotManagement from "../pages/slot-management";
import PaymentConfirmation from "../pages/payment-confirm";
import AuthRoute from "./auth-route";
import AdminRoute from "./admin-route";
import GuestRoute from "./guest-route";
import { useAuth } from "../context/auth";
import FullPageSpinner from "../components/full-page-spinner";

function App() {
  const { initializing } = useAuth();
  return initializing ? (
    <FullPageSpinner />
  ) : (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Switch>
          <GuestRoute exact path="/" component={Welcome} title="welcome" />
          <GuestRoute path="/login" component={Login} title="login" />
          <GuestRoute path="/join" component={Join} title="join" />
          <GuestRoute path="/forgot-password" component={ForgotPassword} title="forgot password" />
          <GuestRoute path="/reset-password/:token" component={ResetPassword} title="reset password" />

          <AuthRoute path="/home" component={Home} title="Home" />
          <AuthRoute path="/date-select" component={DateSelect} title="Select Date & Time" />
          <AuthRoute path="/reservation-confirm" component={ReservationConfirm} title="Reservation Confirm" />
          <AuthRoute path="/reservation-confirm" component={ReservationConfirm} title="Reservation Confirm" />
          <AuthRoute path="/car-select" component={CarSelect} title="Car Select" />
          <AuthRoute path="/payment-confirm" component={PaymentConfirmation} title="Payment Confirm" />

          <AdminRoute path="/user-approve" component={UserApproval} title="User Approval" />
          <AdminRoute path="/slot-management" component={SlotManagement} title="Time Slot Management" />

          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
