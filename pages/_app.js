import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import "@material-tailwind/react/tailwind.css";
import Layout from '../Layout/Layout';
import { Provider } from 'react-redux';
import { store } from '../app/store';

function MyApp(props) {


  return (
    <Provider store={store}>
      <Layout {...props} />
    </Provider>
  )
}

export default MyApp
