import React, { Fragment, PureComponent } from 'react';
import { getShowInfo } from '../../api';
import './Show.css';

class Show extends PureComponent {
  state = {
    showId: '',
    data: {}
  };

  innerHtml = html => {
    return { toHtml: html };
  };

  componentDidMount = async () => {
    const { showId } = this.props;

    if (showId) {
      let data = await getShowInfo(showId);
      this.setState({
        showId,
        data: data
      });
    }
  };

  render() {
    const { showId, data } = this.state;
    const { name, image, genres, summary } = data;

    return (
      <div className="show">
        {showId ? (
          <Fragment>
            <img className="show-image" src={image.medium} alt={name} />
            <h2 className="show-label t-show-name">{name}</h2>
            <p className="show-text t-show-genre">
              <b>Жанр: </b>
              {genres.join(', ')}
            </p>
            <p
              className="show-text t-show-summary"
              dangerouslySetInnerHTML={this.innerHtml(summary)}
            />
          </Fragment>
        ) : (
          <p className="show-inforation t-show-info">Шоу не выбрано</p>
        )}
      </div>
    );
  }
}

export default Show;
