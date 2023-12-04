const mockSpells = [
  {
    _id: { $oid: "65556d69a6267eddc64bb67d" },
    name: "Blindness",
    level: 2,
    school: "Wizard",
    components: ["V"],
    range: "30 yds. + 10 yds./level",
    areaOfEffect: "1 creature",
    save: "Neg.",
    castingTime: 2,
    duration: "Special",
    description:
      "The blindness spell causes the victim to become blind, able to see only a grayness before its eyes. Various cure spells will not remove this effect, and only a dispel magic or the spellcaster can do away with the blindness if the creature fails its initial saving throw vs. spell. A blinded creature suffers a -4 penalty to its attack rolls, and its opponents gain a +4 bonus to their attack rolls.",
  },
  {
    _id: { $oid: "65556d69a6267eddc64bb679" },
    name: "Grease",
    level: 1,
    school: "Wizard",
    components: ["V", "S", "M"],
    range: "10 yds.",
    areaOfEffect: "10 x 10 ft.",
    save: "Special",
    castingTime: 1,
    duration: "3 rds. + 1 rd./level",
    description:
      "A grease spell covers a material surface with a slippery layer of a fatty, greasy nature. Any creature entering the area or caught in it when the spell is cast must save vs. spell or slip, skid, and fall. Those who successfully save can reach the nearest nongreased surface by the end of the round. Those who remain in the area are allowed a saving throw each round until they escape the area. The DM should adjust saving throws by circumstance; for example, a creature charging down an incline that is suddenly greased has little chance to avoid the effect, but its ability to exit the affected area is almost assured! The spell can also be used to create a greasy coating on an item--a rope, ladder rungs, weapon handle, etc. Material objects not in use are always affected by this spell, while creatures wielding or employing items receive a saving throw vs. spell to avoid the effect. If the initial saving throw is failed, the creature immediately drops the item. A saving throw must be made each round the creature attempts to use the greased item. The caster can end the effect with a single utterance; otherwise, it lasts for three rounds plus one round per level. The material component of the spell is a bit of pork rind or butter.",
  },
  {
    _id: { $oid: "65556d69a6267eddc64bb686" },
    name: "Hold Person",
    level: 3,
    school: "Wizard",
    components: ["V", "S", "M"],
    range: "120 yds.",
    areaOfEffect: "1-4 persons, 20-ft. cube",
    save: "Neg.",
    castingTime: 3,
    duration: "2 rds./level",
    description:
      "This spell holds 1d4 humans, demihumans, or humanoid creatures rigidly immobile for five or more rounds. The hold person spell affects any bipedal human, demihuman or humanoid of man size or smaller, including brownies, dryads, dwarves, elves, gnolls, gnomes, goblins, half-elves, halflings, half-orcs, hobgoblins, humans, kobolds, lizard men, nixies, orcs, pixies, sprites, troglodytes, and others...",
  },
];

const newSpell = {
  name: "Otto's Irresistible Dance",
  level: 8,
  school: "Wizard",
  components: ["V"],
  range: "Touch",
  areaOfEffect: "Creature touched",
  save: "None",
  castingTime: 5,
  duration: "1d4+1 rounds",
  description:
    "When an Otto's irresistible dance spell is placed upon a creature, the spell causes the recipient to begin dancing, complete with feet shuffling and tapping. This dance makes it impossible for the victim to do anything other than caper and prance; this cavorting worsens the Armor Class of the creature by -4, makes saving throws impossible except on a roll of 20, and negates any consideration of a shield. Note that the creature must be touched, as if melee combat were taking place and the spellcaster were striking to do damage.",
};

module.exports = { mockSpells, newSpell };
