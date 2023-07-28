import './App.scss';

import Header from './components/Header/Header';
import Form from './components/Form/Form';
import TaskContainer from './components/TaskContainer/TaskContainer';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Form />
        <TaskContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
