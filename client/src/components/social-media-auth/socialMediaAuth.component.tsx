import { FormattedMessage } from "react-intl";
import { ReactComponent as GitIconLight } from "../../assets/light-theme/git-logo.light.svg";
import { ReactComponent as GoogleIconLight } from "../../assets/light-theme/google-logo.light.svg";
import getGoogleOAuthUrl from "../../utils/getGoogleUrl";

const SocialMediaAuthentication = () => {
   return (
      <div className="flex justify-evenly">
         {/* <button className="flex text-xl border-2 border-color-border-primary-m rounded-md py-1 px-2 items-center hover:bg-color-border-primary-m">
            <GitIconLight />
            <span className="text-base ml-2">
               <FormattedMessage
                  id="socialMedia.github"
                  defaultMessage="Login with GitHub"
               />
            </span>
         </button> */}
         <a
            href={getGoogleOAuthUrl()}
            className="flex text-xl border-2 border-color-border-primary-m hover:bg-color-border-primary-m rounded-md py-1 px-2 items-center"
         >
            <GoogleIconLight />
            <span className="text-base ml-2">
               <FormattedMessage
                  id="socialMedia.google"
                  defaultMessage="Login with Google"
               />
            </span>
         </a>
      </div>
   );
};

export default SocialMediaAuthentication;
