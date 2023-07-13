from bs4 import BeautifulSoup
from selenium import webdriver

import requests

def scrap_page_html(url: str): 

    response = requests.get(url)
    html_content = response.content    
    soup = BeautifulSoup(html_content, 'html.parser')
    return soup


def scrap_table(content: BeautifulSoup , table_id):
    
    table = content.find('table' , id=table_id.replace('"' , ""))
    if (table == None):
        raise Exception("the table with the id " , table_id ," is not found")
    
    return table 