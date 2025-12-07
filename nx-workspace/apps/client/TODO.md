# TODO

Once you start a new project from client consider the following steps:

- [ ] Rename angular project with the desired name. You can consider <https://nx.dev/nx-api/workspace/generators/move> to rename project `npm run nx g @nx/workspace:move -- --project client --destination apps/client-app`.
      Or rename all folders, config files, and config content in client project.
- [ ] If @nrwl/workspace:move doesn't update package.json scripts, update them by yourself.
- [ ] Rename angular_template.run.xml file inside .run folder and update command.
- [ ] Replace all client and ANGULAR_TEMPLATE coincidences inside project code.
- [ ] Change project prefixes in project.json and other places to have custom ones in each project.
