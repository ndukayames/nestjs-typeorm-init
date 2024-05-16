// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Request } from 'express';
// import { REQUIRED_ROLES_KEY } from 'src/shared/decorators/roles.decorator';
// import { User } from 'src/user/entity/user.entity';
// import { Roles } from '../roles';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(
//       REQUIRED_ROLES_KEY,
//       [context.getHandler(), context.getClass()],
//     );
//     if (!requiredRoles) {
//       return true;
//     }
//     const user = context.switchToHttp().getRequest<Request>().user as User;

//     return (
//       user.userType === Roles.SUPER_ADMIN ||
//       requiredRoles.some((role) => user.userType?.includes(role))
//     );
//   }
// }
