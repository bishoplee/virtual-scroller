import {jsonp} from './jsonp-promise.js';

const apiKey = '241fe87a3ad5e19014a2ed498f4afcb5';

export async function searchFlickr(query) {
  const ret =
      await jsonp(
          `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
              apiKey}&text=${
              query}&sort=interestingness-desc&extras=o_dims%2C+url_o&format=json`,
          {param: 'jsoncallback'})
          .promise;
  return ret.photos;
}

export function getDims(photo, constraint) {
  if (!constraint) {
    return {
      width: photo.width_o, height: photo.height_o
    }
  }
  const ratio = photo.width_o / photo.height_o;
  return {
    width: constraint.width || Math.round(constraint.height * ratio),
        height: constraint.height || Math.round(constraint.width / ratio)
  }
}

export function getUrl(photo) {
  const {farm, server, id, secret} = photo;
  const size = 'c';
  return true ? `https://farm${farm}.staticflickr.com/${server}/${id}_${
                    secret}_${size}.jpg` :
                'http://via.placeholder.com/200x200&text=+';
}
