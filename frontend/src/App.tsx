import { lazy, onMount } from "solid-js";
import { Router, Route } from "@solidjs/router";
import './App.css';

import Body from './pages/Body';
import Header from './components/All/Header';

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { configStore } from "./store/configs";

function App() {

  onMount(async () => {
    await Promise.all([
      configStore.syncDate(),
      configStore.reload(),
    ]);
  });

  const Config = lazy(() => import("./pages/Config"));

  return (
    <>
    <Header></Header>
    <div class="container-lg">
      <Router>
        <Route path="/" component={Body}/>
        <Route path="/config" component={Config}/>
      </Router>
    </div>
    </>
  )
}

export default App
