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
`shutup` - disables the automatic replies<br>
`speak` - undos `shutup`<br>
`reload` - pulls changes from GitHub and reloads the commands file on the fly<br>
`test` - useless, was used for testing `reload` but could come in handy

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
* Let `sayin` use a normal channel link with something like `jake, sayin #general`<br>
  (basically add ID parsing)<br>
* Autodelete certain commands and their calls.<br>
* Make a role pingable, send a message that pings the role, then undo changes.<br>
* Make commands that allow for user input across multiple messages.