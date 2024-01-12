import { Module } from '@nestjs/common'
import { EnvModule } from './env/env.module'
import { AuthModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'
import { EventsModule } from './events/events.module'

@Module({
  imports: [EnvModule, AuthModule, HttpModule, EventsModule],
})
export class AppModule {}
