import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const expectedApiKey = process.env.API_KEY;

    if (!expectedApiKey) {
      return true;
    }

    const apiKeyHeader = req.headers['x-api-key'];
    const apiKey =
      typeof apiKeyHeader === 'string' ? apiKeyHeader : apiKeyHeader?.[0];

    if (!apiKey || apiKey !== expectedApiKey) {
      throw new UnauthorizedException('Invalid API key');
    }
    return true;
  }
}
