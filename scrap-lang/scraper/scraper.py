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
    
    table = content.find('table' , id=table_id.replace('"' , ""))
    if (table == None):
        raise Exception("the table with the id " , table_id ," is not found")
    return table 


def fetch_all(table: BeautifulSoup):
    
    table_data = []
    
    # Find all the rows within the table body (tbody)
    rows = table.find('tbody').find_all('tr') if table.find('tbody') else table.find_all('tr')
    
    for row in rows:
        row_data = [cell.text.strip() for cell in row.find_all('td')]
        table_data.append(row_data)

    return table_data
    
