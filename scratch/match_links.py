import json
import re

# Load scraped links
with open("scratch/scraped_links.json", "r", encoding="utf-8") as f:
    scraped_links = json.load(f)

# Load current overigesponsoren.json
with open("public/overige/overigesponsoren.json", "r", encoding="utf-8") as f:
    overige_sponsors = json.load(f)

# Load current links.json
with open("public/links.json", "r", encoding="utf-8") as f:
    links_db = json.load(f)

def normalize(name):
    s = name.lower()
    s = re.sub(r"[’']", "", s)
    s = re.sub(r"\b(bv|b\.v\.|e\.k\.|groep|holding|corporate finance|groothandel|restaurant|steakhouse)\b", "", s)
    s = re.sub(r"[^\w\s]", "", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s

matches_found = {}

# Map scraped links by normalized name
scraped_dict = {}
for item in scraped_links:
    name = item["name"]
    href = item["href"]
    if href and href != "#" and not href.startswith("https://www.detreffers.nl") and not href.startswith("http://www.detreffers.nl"):
        norm_name = normalize(name)
        if norm_name:
            scraped_dict[norm_name] = href
            scraped_dict[name.lower()] = href

# Try matching overige sponsors
for sponsor in overige_sponsors:
    s_name = sponsor["name"]
    n_name = normalize(s_name)
    
    matched_url = None
    
    # 1) Direct lookup in scraped_dict
    if n_name in scraped_dict:
        matched_url = scraped_dict[n_name]
    elif s_name.lower() in scraped_dict:
        matched_url = scraped_dict[s_name.lower()]
    else:
        # Check substring match in scraped_dict
        for scraped_n, href in scraped_dict.items():
            if (len(n_name) > 3 and n_name in scraped_n) or (len(scraped_n) > 3 and scraped_n in n_name):
                matched_url = href
                break
    
    # 2) Fallback to existing links.json
    if not matched_url:
        for k, v in links_db.items():
            if v and (normalize(k) == n_name or k.lower() in s_name.lower() or s_name.lower() in k.lower()):
                matched_url = v
                break
                
    if matched_url:
        matches_found[s_name] = matched_url

print(f"Found website URLs for {len(matches_found)} / {len(overige_sponsors)} sponsors:")
for s_name, url in matches_found.items():
    print(f"- {s_name} => {url}")

print(f"\nSponsors without website on detreffers.nl: {len(overige_sponsors) - len(matches_found)}")
for sponsor in overige_sponsors:
    if sponsor["name"] not in matches_found:
        print(f"- {sponsor['name']}")
