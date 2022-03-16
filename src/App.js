import Header from 'components/Header';
import CartFeature from 'features/Cart';
import ProductFeature from 'features/Product';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import productApi from './api/productApi';
import './App.css';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';

function App() {
    return (
        <div className="App">
            <Header />
            <Switch>
                <Route path="/" component={CounterFeature} exact />
                <Route path="/todos" component={TodoFeature} />
                <Route path="/albums" component={AlbumFeature} />
                <Route path="/products" component={ProductFeature} />
                <Route path="/cart" component={CartFeature} />
                <Route path="/*" component={NotFound}></Route>
            </Switch>
        </div>
    );
}

export default App;
