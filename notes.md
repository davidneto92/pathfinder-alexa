# Pathfinder Alexa skill

This skill is meant to provide quick information on the spells found in the Pathfinder roleplaying game.

## Tasks

Building the spells table

- ~~parse spells csv~~
- ~~deploy spells to a local dynamo table~~
- ~~deploy spells to a live dynamo table~~
- sanitize strings & spell names
  - remove any ampersands and correct transcoding errors
  - remove `/`, `-` from spell names and adjust table entries
  - ~~change names from `arcane sight, greater` --> `greater arcane sight`~~
  - add spell synonyms

Building the skill

- ~~initialiize unit tests~~
- ~~launch requests~~
- standard intents
- ~~localize language strings~~
- select spell

## Intents

- SpellIntent
  - function similar to Dialogflow context
    - "ask about enlarge person"
    - Enlarge Person spell is saved to context, so calling other intents will read attribute of spell
  - asking about a new spell will replace the context (re-invoking this intent with a new slot value)
- MoreDetailsIntent (returns specific element of spell based on slot)
  - use CATEGORY slot to determine the requested attribute (need to create all values in model)
    - spell description (default to description_short, saying "more" will play all)
    - spell school
    - spell components
    - spell casting time
    - spell range
    - spell saving throw
    - spell targets
  - if a user asks for more without a spell, go to spell intent to get their spell
  - then with the spell and category filled the user will hear specifically about that spell's requested attribute
- SummoningIntent
  - tells the user which monsters/creatures they can summon with the specified spell
  - can either read from the spell slot in session or direct to the spell intent to get their spell?
  - can ask about a spell found in spell intent what can be summoned
    - routes to summon, or tells user its not a summoning spell
    - send card of spells
- RandomSpellIntent
  - updates current spell with a randomly selected spell
  - slots:
    - school
    - class/level
- HelpIntent (finalize dialog)
- StopIntent/CancelIntent (finalize dialog)

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