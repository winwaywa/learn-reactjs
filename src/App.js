import './App.css';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import AlbumFeature from './features/Album';
import TodoFeature from './features/Todo';
import NotFound from './components/NotFound';
import { useEffect } from 'react';

import productApi from './api/productApi';

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
            <div className="navlink">
                <NavLink to="/todos">Todos</NavLink>
                <NavLink to="/albums">Albums</NavLink>
            </div>
            <Routes>
                <Route path="/todos" element={<TodoFeature />} />
                <Route path="/albums" element={<AlbumFeature />} />
                <Route path="/*" element={<NotFound />}></Route>
            </Routes>
            Footer
        </div>
    );
}

export default App;
