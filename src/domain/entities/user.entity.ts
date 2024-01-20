import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { EUserRole, EUserStatus } from "src/application/enums";

export interface IUser {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  password?: string;
  status: EUserStatus;
  role: EUserRole;
  dob?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

@Schema({ versionKey: false, timestamps: true })
export class User extends Document {
  @Prop({
    type: String,
  })
  firstname: string;

  @Prop({
    type: String,
  })
  lastname: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    enum: EUserStatus,
    default: EUserStatus.PENDING,
  })
  status: EUserStatus;

  @Prop({
    type: String,
    enum: EUserRole,
    default: EUserRole.USER,
  })
  role: EUserRole;

  @Prop({
    type: Date,
  })
  dob: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
