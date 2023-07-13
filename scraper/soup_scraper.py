# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # ---
# VGK Internal Web Scraper 6/27/23                                    #
# Saving site data for migration from Homebase to Forge.              #
# Author: Henry Burke, Web Development Intern                         #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # ---

import requests
from bs4 import BeautifulSoup
import re
import os.path

# makes an output folder in this project folder to place files
dir_name = os.path.dirname(__file__)
file_name = os.path.join(dir_name, "output")

if not os.path.exists(file_name):
    os.mkdir(file_name)
    print("Output Folder Created.")

# open text file with links to scrape
test_file = open("page_links.txt", "r", encoding="utf-8")
file = test_file.readlines()
print("Link File Opened.")

for URL in file:
    print("URL: " + str(URL))
    # save html code from URL into string form
    URL = URL[:-1]
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    result = soup.find(id="content-wrap")
    raw_code = str(result)

    # save raw code into a html file that goes into save_path folder
    name = URL[30:] + ".html"
    name = name.replace("/", "-")
    full_name = os.path.join(file_name, name)
    file = open(full_name, "w", encoding="utf-8")
    file.write("<html>\n")
    text_URL = "<a href=\"" + URL + "\">" + URL + "</a>"
    file.write(text_URL)

    for letter in raw_code:
        file.write(letter)

    file.write("\n</html>")
    file.close()

    # open .txt file for reading and writing
    file1 = open(full_name, "r", encoding="utf-8")
    read_file = file1.readlines()
    write_file = open(full_name, "w", encoding="utf-8")

    for line in read_file:
        # format images to appear correctly in new files
        if "<img" in line:
            line = re.sub("data-srcset", "src", line)
            line = re.sub(r"(\.png).*\s\d{0,4}w\"/?>", ".png\" width=\"25%\" height=\"25%\">", line)
            line = re.sub(r"(\.PNG).*\s\d{0,4}w\"/?>", ".PNG\" width=\"25%\" height=\"25%\">", line)
            line = re.sub(r"(\.jpg).*\s\d{0,4}w\"/?>", ".jpg\" width=\"25%\" height=\"25%\">", line)
            line = re.sub(r"(\.JPG).*\s\d{0,4}w\"/?>", ".JPG\" width=\"25%\" height=\"25%\">", line)
            line = re.sub(r"(\.jpeg).*\s\d{0,4}w\"/?>", ".jpeg\" width=\"25%\" height=\"25%\">", line)
        # format links to work correctly in new files
        if "href=\"/goldenknights" in line:
            line = re.sub("/goldenknights/", "https://www.nhl.com/goldenknights/", line)
        write_file.write(line)
    file1.close()
print("Links Successfully Scraped!")
