from bs4 import BeautifulSoup
from selenium import webdriver

import requests

def scrap_page_html(url: str): 
    
    driver = webdriver.Chrome()

    driver.get(url)
    html_content = driver.page_source

    
    soup = BeautifulSoup(html_content, 'html.parser')
    return soup


def scrap_table(content: BeautifulSoup , table_id):
    
    table_id = table_id.replace('"' , "")
    table = content.find('table' , id=table_id.replace('"' , ""))
    if (table == None):
        raise Exception("the table with the id " , table_id ," is not found")
    return table 


def fetch_all(table: BeautifulSoup):
    
    table_data = []
    
    rows = table.find('tbody').find_all('tr') if table.find('tbody') else table.find_all('tr')
    
    for row in rows:
        row_data = [cell.text.strip() for cell in row.find_all('td')]
        table_data.append(row_data)

    return table_data
    

def get_page_titles(html_content: BeautifulSoup):
    heading_tags = html_content.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
    headings = [tag.get_text() for tag in heading_tags]
    return headings


def filter_data(content: BeautifulSoup , heading):
    
    heading_tag = heading.replace('"' , "")
    data = content.find_all(heading_tag)
    
    print(data)