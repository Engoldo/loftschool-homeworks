// Здесь вам нужно реализовать вью

// Подключите его к редакс роутеру
// Вам потребуются селекторы для получения выбранного сола
// и списка фотографий

// Так же вы будете диспатчить экшены CHANGE_SOL и FETCH_PHOTOS_REQUEST
// Эти экшены находятся в модуле ROVER PHOTOS
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import SelectSol from '../SelectSol';
import RoverPhotos from '../RoverPhotos';
import {
  fetchPhotosRequest,
  getRoversPhotos,
  getSol,
  changeSol,
  rovers
} from '../../modules/RoverPhotos';

import Grid from '@material-ui/core/Grid';
import styles from './RoversViewer.module.css';

class RoversViewers extends PureComponent {
  componentDidCatch() {
    const { sol, fetchPhotosRequest } = this.props;
    rovers.forEach(name => fetchPhotosRequest({ 
      name, 
      sol: sol.current 
    }));
  }

  changeSol = value => {
    const { sol, changeSol } = this.props;
    value !== sol.current && changeSol(value);
  };

  renderRoversPhoto = () => {
    const { sol, photos } = this.props;

    return rovers.map(rover => {
      const currentPhotos = photos[rover][sol.current];
      const roverPhotos =
        !currentPhotos || !currentPhotos.isLoaded ? [] : currentPhotos.photos;

      if (currentPhotos && currentPhotos.error) {
        return <div>{currentPhotos.error}</div>;
      }

      return <RoverPhotos name={rover} photos={roverPhotos} key={rover} />;
    });
  };

  render() {
    const { sol } = this.props;

    return (
      <div className={styles.root}>
        <SelectSol
          minSol={sol.min}
          maxSol={sol.max}
          selectedSol={sol.current}
          changeSol={this.changeSol}
        />
        <Grid container alignItems="flex-start" justify="space-between">
          {this.renderRoversPhoto()}
        </Grid>
      </div>
    );
  };

}

const mapStateToProps = state => ({
  sol: getSol(state),
  photos: getRoversPhotos(state)
});

const mapDispatchToProps = {
  fetchPhotosRequest,
  changeSol
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoversViewers);
