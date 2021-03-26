import Joi from "joi";
import { routes } from "../../constants/routes";
import { Authenticate } from "../../services";
import { ICredential } from "../../types/authenticate";

interface ILoginRequest {
  email: string;
  password: string;
}

const usersLogin = {
  method: "POST",
  path: routes.users.login.value,
  options: {
    tags: ['api'],
    description: 'Login with admin@admin.com/admin',
    handler: function (req: { payload: ILoginRequest }): ICredential {
      const loginData: ILoginRequest = {
        email: req?.payload?.email || "",
        password: req?.payload?.password || "",
      };
      const authenticate = new Authenticate();
      const credential = authenticate.loginWithEmail(loginData);
      return credential;
    },
    validate: {
      payload: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
      })
    }
  },
};

module.exports = usersLogin;
