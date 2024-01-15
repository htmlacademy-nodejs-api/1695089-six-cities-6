import {Command} from './commands/command.interface.js';
import {CommandParser} from './command-parser.js';


type CommandCollection = Record<string, Command>

export class CliApplication {
  private commands: CommandCollection = {};

  constructor(
    private readonly defaultCommand = '--help'
  ) {}

  public registerCommands(commandList: Command[]) {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} is already registered`);
      }

      this.commands[command.getName()] = command;
    });
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultPublicCommand();
  }

  public getDefaultPublicCommand(): Command | never {
    if (! this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }
    return this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]) {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
