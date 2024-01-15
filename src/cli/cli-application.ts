import {Command} from './commands/command.interface.js';


type CommandCollection = Record<string, Command>

export class CliApplication {
  private commands: CommandCollection = {};

  public registerCommands(commandList: Command[]) {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} is already registered`);
      }

      this.commands[command.getName()] = command;
    });
  }
}
