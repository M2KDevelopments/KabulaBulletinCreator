import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

//Main CSS Styles
import "./index.css";
import 'alertifyjs/build/css/alertify.css'; //imported with npm


//components
import ScrollToTop from './components/ScrollToTop';
import Footer from "./components/Footer";

// Pages
import PagePrivacyPolicy from './pages/PagePrivacyPolicy';
import PageTerms from './pages/PageTerms';
import Page404 from './pages/Page404';
import Navigation from './components/Navigation';
import PageBulletin from './pages/PageBulletin';
import SectionPreview from './components/SectionPreview';

export default function App() {
  return (
    <Router>
        <ScrollToTop />
        <Navigation/>
        <Switch>
          <Route exact path="/" component={() => <SectionPreview page={true}/>} />
          <Route exact path="/bulletin" component={() => <PageBulletin />} />
          <Route exact path="/privacyPolicy" component={() => <PagePrivacyPolicy />} />
          <Route exact path="/terms" component={() => <PageTerms />} />
          <Route exact path="/404" component={() => <Page404 />} />
          <Redirect to="/404"/>
        </Switch>
      <Footer />
    </Router>
  );
}
