/**
 * meta.controller.ts
 * Workflows for getting system and usage information.
 * Notes:
 * - N/A
 * @author Elias Mawa <elias@emawa.io>
 * Created by Elias Mawa on 20-02-14
 */

import Router from 'koa-router';

const router: Router = new Router();

// router.all("/filestats", async (ctx: ParameterizedContext) => {
// 	const body: UploadRequest = ctx.request.body;
// 	const db: Connection = ctx.mysql;
	
// 	const file_collection = db.manager.getRepository(MetadataModel);
	
// 	const count = await file_collection.count();
// 	const private_count = await file_collection.findAndCount({
// 		protected: true,
// 	})

// 	const bytes = await file_collection.createQueryBuilder()
// 		.select("SUM(bytes)", "sum").getRawOne();
// 	const latest = await file_collection.findOne({
// 		select: [ "filename", "bytes", "create_date", "file_id"],
// 		where: {
// 			protected: false,
// 			hidden: false,
// 		},
// 		order: {
// 			create_date: "DESC"
// 		},
// 	});

// 	ctx.body = {
// 		count: count,
// 		private_count: private_count[1],
// 		bytes: bytes.sum,
// 		latest,
// 	}
// });

// router.all("/userstats", async (ctx: ParameterizedContext) => {
// 	const body: UploadRequest = ctx.request.body;
// 	const db: Connection = ctx.mysql;
	
// 	const profile_repo = db.manager.getRepository(UserModel);

// 	const count = await profile_repo.count();
// 	const latest = await profile_repo.findOne({
// 		order: {
// 			id: "DESC"
// 		},
// 		select: [ "username" ]
// 	});
	
// 	ctx.body = {
// 		count: count,
// 		latest: latest?.username
// 	}
// });

// router.all("/usage", async (ctx: ParameterizedContext) => {
// 	const usage_data = await system_usage();
// 	const payload = {
// 		memory_usage: usage_data.memory_usage,
// 		cpu_usage: usage_data.cpu_usage,
// 		disk_usage: usage_data.disk_usage,
// 	};

// 	ctx.body = payload;
// });

// router.all("/full_usage", async (ctx: ParameterizedContext) => {
// 	ctx.body = await system_usage();
// });

const Controller: Router = router;

export default Controller;