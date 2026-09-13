import json

# Load scraped matches
with open("public/overige/overigesponsoren.json", "r", encoding="utf-8") as f:
    overige_sponsors = json.load(f)

with open("public/links.json", "r", encoding="utf-8") as f:
    links_db = json.load(f)

# The 34 matched websites from detreffers.nl/sponsoren/
matched_websites = {
    "Aannemingsbedrijf Janssen-Groesbeek B.V.": "https://www.janssen-groesbeek.nl/",
    "Agile Welzijn B.V.": "https://agilewelzijn.nl/",
    "ALBO B.V.": "https://albomilsbeek.nl/",
    "Café Y Mas": "https://cafeymas.nl/",
    "De Wolfsberg B.V.": "https://www.wolfsberg.nl/",
    "DHD Drukkerij": "https://www.dhddrukkerij.nl/",
    "El Toro Restaurant & Steakhouse e.K.": "https://www.restaurant-el-toro.de/",
    "EP: Heinz van Benthum": "https://www.epheinzvanbenthum.nl/",
    "Financieringsgilde Nijmegen": "https://www.financieringsgilde.nl/nijmegen/",
    "Frank Lemmers Bouw": "https://franklemmersbouw.nl/",
    "Garage De Ren": "https://www.garagederen.nl/",
    "Hagemans Verf": "https://www.hagemansverf.nl/",
    "Handelsonderneming Coenen B.V.": "https://www.coenen-groesbeek.nl/",
    "Herberg - Restaurant 't Zwaantje": "https://www.t-zwaantje.nl/",
    "Hout & Kozijn B.V.": "https://www.hout-en-kozijn.nl/",
    "HV Makelaardij": "https://www.hv.nl/",
    "Jumbo Groesbeek": "https://www.jumbo.com/winkel/groesbeek/jumbo-groesbeek-de-meent",
    "Kerkhoff Installatiebedrijf": "https://www.kerkhoff-bredeweg.nl/",
    "Konbanwa B.V.": "https://www.konbanwa.nl/",
    "New York Pizza": "https://www.newyorkpizza.nl/vestigingen/pizza-bestellen-groesbeek-bellevue",
    "Niveau Glas": "https://www.niveaugroep.nl/glas/",
    "Numblees Corporate Finance": "https://numblees.nl/",
    "Optiek Groesbeek": "https://www.optiekgroesbeek.nl/",
    "Rikken Reclame": "https://www.rikkenreclame.nl/",
    "Roverwood": "http://www.roverwood.nl",
    "Sanders Tweewielers": "https://www.sanderstweewielers.nl/home.html",
    "STABA Maatwerk": "https://stabamaatwerk.nl/",
    "Stadsherberg Gennep": "https://www.stadsherberggennep.nl/",
    "Suselbeek Deuren": "https://www.suselbeek.nl/",
    "'t Soetrijck": "https://soetrijck.nl/",
    "Valeres Industriebouw B.V.": "https://www.valeres.nl/home/",
    "Van Altena Groothandel": "https://www.vanaltenawijchen.nl/",
    "Van Kesteren Holding B.V.": "https://www.vankesterenbv.nl/",
    "Weijerseikhout B.V.": "https://www.weijerseikhout.nl/"
}

# Update overigesponsoren.json
updated_overige = []
for item in overige_sponsors:
    name = item["name"]
    entry = {"name": name}
    if name in matched_websites:
        entry["website"] = matched_websites[name]
    updated_overige.append(entry)

with open("public/overige/overigesponsoren.json", "w", encoding="utf-8") as f:
    json.dump(updated_overige, f, indent=2, ensure_ascii=False)

# Update links.json with all new pairs
for name, url in matched_websites.items():
    links_db[name] = url

with open("public/links.json", "w", encoding="utf-8") as f:
    json.dump(links_db, f, indent=2, ensure_ascii=False)

print(f"Successfully updated overigesponsoren.json and links.json with {len(matched_websites)} sponsor websites!")
