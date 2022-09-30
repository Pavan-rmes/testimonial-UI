import './App.css';
import AppScreen from "./Home/MainContent";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {FirstTestimonialForm} from "./Form/FirstTestimonial"
import {LoginPage} from "./Auth/Login"
import { SignupPage } from "./Auth/Signup";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login/*' element={<LoginPage />} />
          <Route path='/signup/*' element={<SignupPage />} />
          <Route path="/*" element={<AppScreen />} />
          <Route path='/onboarding-details' element ={<FirstTestimonialForm />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;

