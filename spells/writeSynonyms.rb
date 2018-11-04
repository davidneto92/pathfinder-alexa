require "json"
require_relative "parseCSV"

all_spells = ParseCSV.perform

def roman_numeral_synonyms(numeral, string) # returns an array of synonyms
  synonyms = []
  case numeral
    when 1
      synonyms << string.gsub(" i", " one")
      synonyms << string.gsub(" i", "")
    when 2
      synonyms << string.gsub(" ii", " two")
      synonyms << string.gsub(" ii", " too")
      synonyms << string.gsub(" ii", " to")
    when 3
      synonyms << string.gsub(" iii", " three")
      synonyms << string.gsub(" iii", " free")
      synonyms << string.gsub(" iii", " tree")
    when 4
      synonyms << string.gsub(" iv", " four")
      synonyms << string.gsub(" iv", " for")
      synonyms << string.gsub(" iv", " fore")
    when 5
      synonyms << string.gsub(" v", " five")
      synonyms << string.gsub(" v", " i've")
    when 6
      synonyms << string.gsub(" vi", " six")
      synonyms << string.gsub(" vi", " sex")
    when 7
      synonyms << string.gsub(" vii", " seven")
      synonyms << string.gsub(" vii", " evan")
    when 8
      synonyms << string.gsub(" viii", " eight")
      synonyms << string.gsub(" viii", " ate")
    when 9
      synonyms << string.gsub(" ix", " nine")
      synonyms << string.gsub(" ix", " time")
    when 10
      synonyms << string.gsub(" x", " ten")
      synonyms << string.gsub(" x", " tin")
    else
      puts "No roman numerals found in #{string}"
  end

  return synonyms
end

values = []
all_spells.map do |spell|
  synonym_list = []

  if spell[:name].include?("greater") || spell[:name].include?("mass")
    actual_name = spell[:name].split(",").first
    if spell[:name].include?("greater")
      synonym_list = ["greater #{actual_name}", "#{actual_name} greater"]
    else
      synonym_list = ["mass #{actual_name}", "#{actual_name} mass"]
    end
  elsif spell[:name][-2..-1] == " i"
    synonym_list = roman_numeral_synonyms(1, spell[:name])
  elsif spell[:name][-3..-1] == " ii"
    synonym_list = roman_numeral_synonyms(2, spell[:name])
  elsif spell[:name][-4..-1] == " iii"
    synonym_list = roman_numeral_synonyms(3, spell[:name])
  elsif spell[:name][-3..-1] == " iv"
    synonym_list = roman_numeral_synonyms(4, spell[:name])
  elsif spell[:name][-2..-1] == " v"
    synonym_list = roman_numeral_synonyms(5, spell[:name])
  elsif spell[:name][-3..-1] == " vi"
    synonym_list = roman_numeral_synonyms(6, spell[:name])
  elsif spell[:name][-4..-1] == " vii"
    synonym_list = roman_numeral_synonyms(7, spell[:name])
  elsif spell[:name][-5..-1] == " viii"
    synonym_list = roman_numeral_synonyms(8, spell[:name])
  elsif spell[:name][-3..-1] == " ix"
    synonym_list = roman_numeral_synonyms(9, spell[:name])
  elsif spell[:name][-2..-1] == " x"
    synonym_list = roman_numeral_synonyms(10, spell[:name])
  end

  if spell[:name].include?("summon")
    if synonym_list.empty?
      synonym_list << spell[:name].gsub("summon", "simon")
    else
      synonym_list_length = synonym_list.length
      synonym_list_length.times do |index|
        synonym_list << synonym_list[index].gsub("summon", "simon")
      end
    end
  end

  values << {name: {value: spell[:name].to_s, synonyms: synonym_list} }
end

File.open("./slots_values.json","w") do |f|
  f.write({name: "SPELLSLOT", values: values}.to_json)
end