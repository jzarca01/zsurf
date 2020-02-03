import {
  ImageSource,
  RemoteImage,
} from './type';

export {
  ImageSource,
  RemoteImage,
} from './type';

export const imageSignIn1Bg: ImageSource = {
  imageSource: require('./source/signin.jpg'),
};

export const imageSignUp1Bg: ImageSource = {
  imageSource: require('./source/signup.jpg'),
};

export const imageForgotPasswordBg: ImageSource = {
  imageSource: require('./source/forgot-password.jpg'),
};

export const imageProfile5: ImageSource = {
  imageSource: require('./source/image-profile-5.jpg'),
};

export const splash: ImageSource = {
  imageSource: require('./source/splash.png'),
};

export const imageSurfboard = {
  default: require('./source/default-surfboard.png'),
  Fish: require('./source/fish.png'),
  Gun: require('./source/gun.png'),
  Shortboard: require('./source/shortboard.png'),
  Longboard: require('./source/longboard.png')
}

export const addButton: ImageSource = {
  imageSource: require('./source/add.png')
}

export const defaultPic = {
  Male: require('./source/avatar-male.png'),
  Female: require('./source/image-profile-5.jpg')
}

// export const SessionImage: ImageSource = new RemoteImage('https://source.unsplash.com/800x600/?surf')