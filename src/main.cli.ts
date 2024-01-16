import {CliApplication, HelpCommand, VersionCommand} from './cli/index.js';

function bootstrap() {
  const cliApplication = new CliApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand()
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
