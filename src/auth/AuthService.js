import { EventEmitter } from "events";
// import ParametrosSistemaActions from "../actions/ParametrosSistemaActions";
import { isTokenExpired } from "./../helpers/JwtHelper";

export default class AuthService extends EventEmitter {
  constructor () {
    super();
  }

  login (username, password, callback) {
  }

  async signup (email, password, connectionDB, callback) {
  }

  loggedIn () {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !isTokenExpired(token);
  }

  setToken (accessToken, idToken) {
    // Saves user access token and ID token into local storage
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("jwt", idToken);
    this.getUserInfo(accessToken);
  }

  setProfile (profile) {
    // Saves profile data to localStorage
    localStorage.setItem("profile", JSON.stringify(profile));
    // Triggers profile_updated event to update the UI
    this.emit("profile_updated", profile);
  }

  getProfile () {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem("profile");
    return profile ? JSON.parse(localStorage.profile) : {};
  }

  getToken () {
    // Retrieves the user token from localStorage
    return localStorage.getItem("jwt");
  }

  getUserInfo (accessToken) {
  }

  logout () {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    localStorage.removeItem("profile");
  }
}
