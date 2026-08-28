// * STYLES
import './style.css';
import '../public/fontawesome/css/fontawesome.css';
import '../public/fontawesome/css/brands.css';
import '../public/fontawesome/css/solid.css';

// * BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// * REACT LIBRARIES
import ReactDOM from 'react-dom/client';
import { lazy, Suspense } from 'react-lazy-no-flicker';

// * COMPONENTS
import useNotebook from './store/useNotebook.jsx';
import LoadingScreen from './Components/LoadingScreen/LoadingScreen.jsx';
import FaviconHelper from './Components/FaviconHelper/FaviconHelper.jsx';

const ExperienceWrapper = lazy(
  () => {
    return import('./Components/ExperienceWrapper/ExperienceWrapper.jsx');
  },
  {
    time_before_fallback: 2000,
  }
);

const App = () => {
  const isPoweredOn = useNotebook((state) => state.isPoweredOn);

  return (
    <>
      <FaviconHelper isPoweredOn={isPoweredOn} />
      <Suspense delay={2000} fallback={<LoadingScreen />}>
        <ExperienceWrapper />
      </Suspense>
    </>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
