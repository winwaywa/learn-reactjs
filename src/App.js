import Header from 'components/Header';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import productApi from './api/productApi';
import './App.css';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';

function App() {
    useEffect(() => {
        const fetchProducts = async () => {
            const params = {
                _limit: 5,
            };
            const productList = await productApi.getAll(params);
            console.log(productList);
        };
        fetchProducts();
    }, []);

    return (
        <div className="App">
            <Header />
            <Switch>
                <Route path="/" component={CounterFeature} exact />
                <Route path="/todos" component={TodoFeature} />
                <Route path="/albums" component={AlbumFeature} />
                <Route path="/*" component={NotFound}></Route>
            </Switch>
        </div>
    );
}

export default App;
