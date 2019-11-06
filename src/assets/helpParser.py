from bs4 import BeautifulSoup
from os import listdir, path
import json
html_files = [ htm for htm in listdir("help") if ".htm" in htm]
mapped_html = {}
for html_file in html_files:
	html_path = path.abspath("help\\" + html_file)
	with open(html_path, "r") as f:
		html_doc = f.read()
		soup = BeautifulSoup(html_doc, 'html.parser')
		titleNode = soup.body.find_all("h1")
		if(len(titleNode) > 0):
			title = titleNode[0].get_text()
			if(title != ""):
				mapped_html[title.strip()] = html_file
json_txt = json.dumps(mapped_html)
with open("static_help.json", "w") as fw:
	fw.write(json_txt)
	