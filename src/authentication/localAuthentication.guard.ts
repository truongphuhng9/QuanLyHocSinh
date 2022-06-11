import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable() 
export class LocalSAuthenticationGuard extends AuthGuard('local') {}s