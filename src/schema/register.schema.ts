import joi, { object } from "joi";

export default object({
	email: joi.string()
		.email({ tlds: { allow: true } })
		.required(),
		
	username: joi.string()
		.alphanum()
		.lowercase()
		.min(3)
		.max(32)
		.required(),

	password: joi.string()
		.min(6)
		.max(32)
		.required(),
});