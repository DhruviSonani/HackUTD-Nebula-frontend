import './App.css';
import './Components/CSS/custom.scss'

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from './Components/Redux/reducer'
import HackUTDA_App from './HackUTD/Components/App'
import { composeWithDevTools } from "redux-devtools-extension";
function App() {

  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return (
    <Provider store={store}>
      <HackUTDA_App />
      {/* <ContactTable /> */}
    </Provider>
  );
}

export default App;
