# TODO

- [ ] Improve the complexity of the hash in `register` function in `authController.ts`
- [ ] Intercept requests from non-authenticated users (e.g. Postman?)
- [ ] Verify the auth/anon routing

## For the template project

Al comenzar un proyecto a partir de server considera los siguientes pasos:

- [ ] Ejecutar: `npm run nx g @nx/workspace:move -- --project server --destination apps/server-app`
- [ ] Renombrar todas las coincidencias de server por el nombre del proyecto nuevo
- [ ] Revisar que las ENV vars estén bien configuradas y los valores se tomen en el package.json principal (para migraciones y seeders)
- [ ] Comandos para crear usuario y base de datos en psql:
  - CREATE USER <user_name> WITH PASSWORD '<wanted_password>';
  - CREATE DATABASE <data_base> OWNER <user_name>;
- [ ] Si la base de datos requiere instalar cosas durante la fase de migración (e.g. PostGIS), se necesitarán permisos:
  - ALTER USER <user_name> WITH SUPERUSER;
- [ ] Revisar que los scripts de package.json funcionen correctamente
- [ ] Validar las migraciones
