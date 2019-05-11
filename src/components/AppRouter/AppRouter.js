// Реализуйте роутер
// Вам нужно определить корневой роут, который будет вести на страницу поиска.
// Роут шоу должен принимать id в параметрах.
import React from 'react';
import { Route } from 'react-router-dom';
import Search from '../Search';
import ShowPage from '../ShowPage';
import style from './AppRouter.css';

const AppRouter = () => (
    <div className={style.App}>
        <Route path='/' exact component={Search} />
        <Route path='/shows/:id' component={ShowPage} />
    </div>
);

export default AppRouter;