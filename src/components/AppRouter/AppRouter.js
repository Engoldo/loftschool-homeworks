// Реализуйте роутер приложения.
// Здесь должны быть обьявлены роуты,
// которые будут доступны авторизованному пользователю.
// - Home
// - InboxList
// - InboxMail
// - OutboxList
// - OutboxMail

// Так же в этом файле обьявите лейаут,
// используйте стили из AppRouter.module.css

import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import Home from '../Home';
import InboxList from '../InboxList';
import InboxMail from '../InboxMail';
import OutboxList from '../OutboxList';
import OutboxMail from '../OutboxMail';

import classNames from 'classnames';
import style from './AppRouter.module.css';

class AppRouter extends Component {
  state = {
    title: 'Home'
  };

  setActivePage = e => {
    this.setState({
      title: e.target.innerHTML
    });
  };

  render() {
    const { title } = this.state;

    return (
      <div className={style.wrapper}>
        <div className={style.container}>
          <nav className={style.nav}>
            <ul className={classNames(style.navList, 't-nav-list')}>
              <li className={style.navElement}>
                <NavLink
                  to="/app"
                  exact
                  activeClassName="active"
                  className={classNames(style.link, 't-link-home')}
                  onClick={this.setActivePage}
                >
                  Home
                </NavLink>
              </li>
              <li className={style.navElement}>
                <NavLink
                  to="/app/inbox"
                  exact
                  activeClassName="active"
                  className={classNames(style.link, 't-link-inbox')}
                  onClick={this.setActivePage}
                >
                  Inbox
                </NavLink>
              </li>
              <li className={style.navElement}>
                <NavLink
                  to="/app/outbox"
                  exact
                  activeClassName="active"
                  className={classNames(style.link, 't-link-outbox')}
                  onClick={this.setActivePage}
                >
                  Outbox
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={style.content}>
            <h3 className={style.title}>{title}</h3>
            <Switch>
              <Route path="/app" exact component={Home} />
              <Route path="/app/inbox" exact component={InboxList} />
              <Route path="/app/outbox" exact component={OutboxList} />
              <Route path="/app/inbox/:id" component={InboxMail} />
              <Route path="/app/outbox/:id" component={OutboxMail} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default AppRouter;
