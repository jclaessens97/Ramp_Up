import {
  createContainer,
  asClass,
  Lifetime,
  InjectionMode,
} from 'awilix';

export default function configureContainer() {
  return createContainer()
    .loadModules(
      [
        ['features/**/*Controller.js', { register: asClass }],
        ['features/**/*Service.js', { register: asClass }],
        ['features/**/*Client.js', { register: asClass }],
      ], {
        cwd: __dirname,
        formatName: 'camelCase',
        resolverOptions: {
          lifetime: Lifetime.SCOPED,
          injectionMode: InjectionMode.PROXY,
        },
      },
    );
}
