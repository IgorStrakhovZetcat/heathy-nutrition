import NetworkIcon from "../models/NetworkIkon";
import google from '../components/images/auth/google.png'
import facebook from '../components/images/auth/facebook.png'
import twitter from '../components/images/auth/twitter.png'


export const GOOGLE = "google";
export const TWITTER = "twitter";
export const FACEBOOK = "facebook";
export const serviceSupportedNetworks: NetworkIcon[] = [
    {name: GOOGLE, iconURL: google},
    {name: FACEBOOK, iconURL: facebook},
    {name: TWITTER, iconURL: twitter}
 ];
