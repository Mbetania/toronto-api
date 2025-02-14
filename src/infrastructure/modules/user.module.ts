import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Entity, PORT } from "src/application/enums";
import { ChangeUserStatus, ChangeProfilePicture, GetAuthSession, GetUserProfile, ListPendingUsers, Onboarding, RequestRecovery, ChangePassword } from "src/application/use-cases";
import { AdminLogSchema, SessionSchema, UserSchema } from "src/domain/entities";

import { UserControllerV1 } from "../controllers";
import { AdminLogRepository, RedisRepository, SessionRepository, StorageRepository, UserRepository } from "../repositories";
import { BcryptService } from "../config";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Entity.User, schema: UserSchema },
      { name: Entity.Session, schema: SessionSchema },
      { name: Entity.AdminLog, schema: AdminLogSchema },
    ]),
  ],
  controllers: [UserControllerV1],
  providers: [
    GetUserProfile,
    ListPendingUsers,
    ChangeUserStatus,
    Onboarding,
    GetAuthSession,
    ChangeProfilePicture,
    RequestRecovery,
    ChangePassword,
    BcryptService,
    {
      provide: PORT.User,
      useClass: UserRepository,
    },
    {
      provide: PORT.Session,
      useClass: SessionRepository,
    },
    {
      provide: PORT.Storage,
      useClass: StorageRepository,
    },
    {
      provide: PORT.AdminLog,
      useClass: AdminLogRepository,
    },
    {
      provide: PORT.Redis,
      useClass: RedisRepository,
    },
  ],
  exports: [],
})
export class UserModule {}
