export default function (photosUrl = [], action) {

  switch (action.type) {
    case 'savePhoto':
      const photosCopy = [...photosUrl]
      photosCopy.push(action.photoUrl)

      return photosCopy

    default:
      return photosUrl
  }

}