// Реализуйте страницу поиска.

// Используйте метод connect и mapStateToProps, mapDispatchToProps,
// чтобы получить ссылку на поле search вашего стейта
// и экшн searchRequest.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchRequest } from '../../actions';
import ShowPreview from '../ShowPreview';
import classNames from 'classnames';
import style from './Search.module.css';

class Search extends Component {
  state = { inputValue: '' };

  handleChange = event => {
    this.setState({
        inputValue: event.target.value
    });
  };

  handleSearch = () => {
    const { searchRequest } = this.props;
    const { inputValue } = this.state;

    searchRequest(inputValue);
    this.setState({ inputValue: '' });
  };

  handleSearchByEnter = event => {
    if (event.key === 'Enter') {
        this.handleSearch();
    }
  };

  render() {
    const { inputValue } = this.state;
    const { isLoading, series, error } = this.props;

    if (isLoading) {
      return <p>Данные загружаются...</p>;
    }

    if (error) {
      return <p>Произошла сетевая ошибка</p>;
    }

    return (
      <div>
        <div className={style.previewList}>
          <input
            className={classNames(style.input, 't-input')}
            value={inputValue}
            onChange={this.handleChange}
            onKeyDown={this.handleSearchByEnter}
            placeholder="Название сериала"
          />
          <div className={style.buttonWrapper}>
            <button
              className={classNames(style.button, 't-search-button')}
              onClick={this.handleSearch}
            >
              Найти
            </button>
          </div>
        </div>
        <div className={classNames(style.searchPanel, 't-search-result')}>
          {series.map(({ id, name, summary, image }) => (
            <ShowPreview
              key={id}
              id={id}
              name={name}
              summary={summary}
              image={image}
            />
          ))}
          ;
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = state => {
    const { series, isLoading, error } = state.search;
    return {
        series,
        isLoading,
        error
    };
};

const mapStateToProps = { searchRequest };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
