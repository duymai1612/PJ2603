import Joi from "joi"
import { routes } from "../../constants/routes"
import { postGateway } from "../../gateways"

const getPosts = {
  method: "GET",
  path: routes.posts.value,
  options: {
    tags: ['api'],
    description: 'Get all posts',
    handler: async function (): Promise<object> {
      return postGateway.getPosts()
    },
    auth: {
      strategy: "jwt",
      scope: ["admin"],
    },
    validate: {
      headers: Joi.object({
        Authorization: Joi.string().required()
      }).options({ allowUnknown: true }),
    }
  },
}

module.exports = getPosts
