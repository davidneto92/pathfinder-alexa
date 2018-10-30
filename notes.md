# Pathfinder Alexa skill

This skill is meant to provide quick information on the spells found in the Pathfinder roleplaying game.

## Tasks

Building the spells db

- ~~parse spells csv into jsons~~
- ~~deploy spells to a local dynamo table~~
- deploy spells to a live dynamo table
- sanitize strings
  - remove any ampersands and correct transcoding errors

Building the skill

- initialiize unit tests
- launch requests
- standard intents
- select spell
- spell data + slots

## Intents

- select spell
  - function similar to Dialogflow context
    - "ask about enlarge person"
    - Enlarge Person spell is saved to context, so calling other intents will read attribute of spell
  - asking about a new spell will replace the context (re-invoking this intent with a new slot value)
- spell data (returns specific element of spell based on slot)
  - spell description (default to description_short, saying "more" will play all)
  - spell school
  - spell components
  - spell casting time
  - spell range
  - spell saving throw
  - spell targets
- random spell
  - updates current spell with a randomly selected spell
  - slots:
    - school
    - class/level
- Help/Stop/Cancel

## Ideas

- add reference intent that can rattle off common questions
  - status conditions (sickened, fear, blinded etc.)
  - weapon properties (cold iron, silver etc.,)
  - enchantments (weapons and armor)
  - grappled note/blurb?
- dice roller
  - "roll a d12"

<!-- ### Uploading/deploying
To deploy skill and lambda ➜ `ask deploy -p davidneto92`
To update lambda ➜ `ask lambda upload -s lambda -f ask-custom-Pathfinder_Spells-davidneto92 -p davidneto92` -->