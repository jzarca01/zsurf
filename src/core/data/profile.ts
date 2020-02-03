import { Gender, Profile, ProfileSocials } from "@src/core/model";
import { imageProfile5 } from "@src/assets/images";

export const profile5: Profile = {
  photo: imageProfile5,
  about:
    "Hi! My name is Kristen. I'm 25 and I live in Berlin." +
    " I'm interested in computer science, music, sport and fantasy literature",
  firstName: "Kirsten",
  lastName: "Crarke",
  gender: Gender.FEMALE,
  age: 25,
  weight: 48,
  height: 174,
  inseam: 44,
  email: "kirs.clarke@gmail.com",
  phoneNumber: "+375 44 123 12 12",
  location: "Australia",
  friends: [],
  onLine: true
};

export const profileSocials1: ProfileSocials = {
  followers: 1500,
  following: 86,
  posts: 116
};
