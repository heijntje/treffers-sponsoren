import urllib.request
from html.parser import HTMLParser
import json

class SponsorLinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.current_a = None
        self.current_text = ""

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == "a" and "href" in attrs_dict:
            self.current_a = {
                "href": attrs_dict["href"],
                "title": attrs_dict.get("title", ""),
                "alt": ""
            }
            self.current_text = ""
        elif tag == "img" and self.current_a is not None:
            if "alt" in attrs_dict:
                self.current_a["alt"] = attrs_dict["alt"]

    def handle_data(self, data):
        if self.current_a is not None:
            self.current_text += data

    def handle_endtag(self, tag):
        if tag == "a" and self.current_a is not None:
            text = self.current_text.strip()
            alt = self.current_a["alt"].strip()
            title = self.current_a["title"].strip()
            href = self.current_a["href"].strip()
            
            name = text or alt or title
            if name and href:
                self.links.append({"name": name, "href": href})
            self.current_a = None

url = "https://www.detreffers.nl/sponsoren/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

try:
    with urllib.request.urlopen(req) as response:
        html_content = response.read().decode('utf-8')

    parser = SponsorLinkParser()
    parser.feed(html_content)

    print(f"Extracted {len(parser.links)} links")
    
    # Store in JSON
    with open("scratch/scraped_links.json", "w", encoding="utf-8") as f:
        json.dump(parser.links, f, indent=2, ensure_ascii=False)

except Exception as e:
    print(f"Error: {e}")
