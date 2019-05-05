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

  renderMenu = props => {
    const { label, endpoint, classname } = props;

    return (
      <li className={style.navElement}>
        <NavLink
          to={endpoint}
          exact
          activeClassName="active"
          className={classNames(style.link, classname)}
          onClick={this.setActivePage}
        >
          {label}
        </NavLink>
      </li>
    );
  };

  setActivePage = e => {
    this.setState({
      title: e.target.innerHTML
    });
  };

  render() {
    const { title } = this.state;
    const listLink =  [
      { label: 'Home', endpoint: 'app', classname: 't-link-home' },
      { label: 'Inbox', endpoint: '/app/inbox', classname: 't-link-inbox' },
      { label: 'Outbox', endpoint: '/app/outbox', classname: 't-link-outbox'}
    ].map(row => this.renderMenu(row));

    return (
      <div className={style.wrapper}>
        <div className={style.container}>
          <nav className={style.nav}>
            <ul className={classNames(style.navList, 't-nav-list')}>
              {listLink}
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
