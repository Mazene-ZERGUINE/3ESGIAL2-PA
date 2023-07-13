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

def fetch_all(data: BeautifulSoup):
    if isinstance(data, list):
        return [header.text.strip() for header in data if header.name.startswith('h')]
    
    elif data.name == 'table':
        table_data = []
        
        header_rows = data.find_all('th')
        headers = [header.text.strip() for header in header_rows]
        
        body_rows = data.find('tbody').find_all('tr') if data.find('tbody') else data.find_all('tr')
        
        for row in body_rows:
            row_data = {}
            cells = row.find_all('td')
            for index, cell in enumerate(cells):
                header = headers[index]
                cell_text = cell.text.strip()
                row_data[header] = cell_text
            table_data.append(row_data)

        return table_data
    
    else:
        return None




    

def get_page_titles(html_content: BeautifulSoup):
    heading_tags = html_content.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
    return heading_tags


def filter_data(content: BeautifulSoup , heading):
    
    heading_tag = heading.replace('"' , "")
    data = content.find_all(heading_tag)
    
