/**
 * JWTAuthenticate.ts
 * Middleware for authenticating timed JWT's
 * Notes:
 * - N/A
 * @author Elias Mawa <elias@emawa.io>
 * Created 20-02-15
 */

import config from "../../res/config.json";
import { TimedJWT } from "../util";
import { unauthorizedAccess, resourceNotFound, serverError } from "../util/errors";
import { UserData, Metadata } from "types";
import { ParameterizedContext } from "koa";

import mongoose from "mongoose";

const secret = config.crypt.secret;

/**
 * Validates authorization token and user.
 */
export default async (ctx: ParameterizedContext, next: any): Promise<void> => {
	
	const authentication = (ctx.headers.authorization);

	const models: { [index: string]: mongoose.Model<any, {}> } = ctx.models;
	const file_data: Metadata = await models['uploads.metadata']
	.findOne({ file_id: ctx.params.id });

	if(authentication) {
		const token = authentication.split(' ')[1];
		
		if(file_data == null) {
			ctx.status = resourceNotFound.status;
			ctx.body = resourceNotFound;
		} else if(file_data.deleted) {
			ctx.status = resourceNotFound.status;
			ctx.body = resourceNotFound;
		} else if (file_data.protected) {
			if(token == null) {
				ctx.status = unauthorizedAccess.status;
				ctx.body = unauthorizedAccess;
			} else {
				try{
					const authorization = TimedJWT.verify(token, secret);

					if(authorization) {
						const payload: UserData = authorization.payload;
			
						let user: UserData = await models.User
						.findOne({ username: payload.username });

						ctx.auth.user = payload.username;
						ctx.auth.profile = payload.profile;
						ctx.auth.flags = payload.flags;

						if(file_data.protected == true) {
							if(file_data.owner == user.username) {
								await next();
							} else {
								ctx.status = unauthorizedAccess.status;
								ctx.body = unauthorizedAccess;
							}
						} else {
							await next();
						}
					} else {
						ctx.status = unauthorizedAccess.status;
						ctx.body = unauthorizedAccess;
					}
				} catch(err) {
					ctx.status = serverError.status;
					ctx.body = serverError;
				}
			}
		} else {
			await next();
		}
	} else if (file_data) {
		if(file_data.protected == true) {
			ctx.status = unauthorizedAccess.status;
			ctx.body = unauthorizedAccess;
		} else if(file_data.deleted) {
			ctx.status = resourceNotFound.status;
			ctx.body = resourceNotFound;
		} else {
			await next();
		}
	} else {
		ctx.status = resourceNotFound.status;
		ctx.body = resourceNotFound;
	}
};

