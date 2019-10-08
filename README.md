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

## Notes
this bot does not include a token or a prefix, but by default I use `jake,` as a prefix.<br>
when you make your config.ini, be sure to include a token field with your bot token, and a prefix field with your prefix

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