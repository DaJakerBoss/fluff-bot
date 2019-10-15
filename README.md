# fluff bot
my node.js bot shenanigans

## Purpose
this bot exists for me to learn node.js with. that's pretty much it.

## Commands
`help` - prints help menu<br>
`hello` - returns a friendly message<br>
`returnid` - returns id of the current channel<br>
`say` - repeats a user's message<br>
`sayin` - repeats a user's message in a specified channel<br>
`sleep` - kills bot (admin only command)
`shutup` - disables the automatic replies<br>
`speak` - undos `shutup`<br>
`reload` - pulls changes from GitHub and reloads the commands file on the fly<br>
`test` - useless, was used for testing `reload` but could come in handy<br>
`announce` - pings a given role in a given channel, then immediately makes it unmentionable<br>
`edit` - edits announcements<br>
`setperm` - sets minimum required role to use permission-restricted commands<br>
`eval` - executes javascript code and returns any output to the channel where the command was issued

# Command Notes
The following commands are permission-restricted:
- `announce`<br>
- `edit`<br>
- `setperm`<br>
- `shutup/speak`<br>

The following commands are locked to the Admin ID:
- `sleep`<br>
- `reload`<br>
- `eval`<br>

The following commands require specific syntax (assume no brackets):
`announcement`:<br>
`{prefix} announce {role name (case sensitive)} #{channel} {message}`<br>
Example:
```
fluff, announce test role #announcements this is an announcement!
```
Returns:
```
[in specified channel, #announcements]
@test role: this is an announcement!
```

`edit`:<br>
`{prefix} edit {announcement ID} #{announcement channel} {new message}`<br>
Example:
```
[on the announcement above]
fluff, edit 123456789012345678 #annoucements edited message!
```
Returns:
```
[in specified channel, #announcements]
@test role: edited message! (edited)
```

`sayin`:<br>
`{prefix} sayin #{channel} message`
Example:
```
fluff, sayin #general hello all!
```
Returns:
![Example Return](https://i.imgur.com/ZqLrNNO.png)
*Please note, the Rich Embed will send to the specified channel, and will insert the user icon and nickname in the footer*

`setperm`:<br>
`{prefix} setperm {role name (case sensitive)}`<br>
Example:
```
fluff, setperm test role
```
Returns:<br>
`minimum role set`

The following commands return a Rich Embed to the channel where the command was issued:<br>
- `announce`
![Example Announcement Return](https://i.imgur.com/7GelZyc.png)
- `edit`
![Example Announcement Edit Return](https://i.imgur.com/2Ix8d70.png)
## Notes
this bot does not include a token or a prefix, but by default I use `fluff,` as a prefix.<br>
Here's the format of the `config.json`<br>
```
{
    "token" : "tokentokentokentoken"
    "prefix" : "prefix"
    "admin" : "ID of user running the bot"
}
```

## Special Thanks
@LoeDoesCode for helping me understand what the fuck JavaScript was doing.<br>
@eslachance for the [example bot](https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3) which helped shape the bot and get ideas.<br>
@cyber_sec_0 for helping with JavaScript formatting

## Planned Changes
* ~~Let `sayin` use a normal channel link with something like `jake, sayin #general`~~ Completed!<br>
  (basically add ID parsing)<br>
* Autodelete certain commands and their calls. [WIP]<br>
* ~~Make a role pingable, send a message that pings the role, then undo changes.~~ Completed!<br>
* Make commands that allow for user input across multiple messages.