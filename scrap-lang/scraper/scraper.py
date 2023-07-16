from bs4 import BeautifulSoup
from selenium import webdriver

import requests

# gets all the content of an html page same for dynamic pages #
def scrap_page_html(url: str): 
    
    driver = webdriver.Chrome()
    driver.get(url)
    html_content = driver.page_source
    
    soup = BeautifulSoup(html_content, 'html.parser')
    return soup


# gets all the content of a table passed by id #
def scrap_table(content: BeautifulSoup , table_id):
    
    table_id = table_id.replace('"' , "")
    table = content.find('table' , id=table_id.replace('"' , ""))
    if (table == None):
        raise Exception("the table with the id " , table_id ," is not found")
    return table 


def fetch_all(data: BeautifulSoup):
    if isinstance(data, list):
        titles = [header.text.strip() for header in data if header.name.startswith('h')]
        texts = [tag.text.strip() for tag in data if tag.name == 'p']
        links = [a.get('href') for a in data if a.get('href') is not None]
        
        
        if len(links) > 0 and len(titles) == 0 and len(texts) == 0:
            return links
        elif len(titles) > 0 and len(links) == 0 and len(texts) == 0:
            return titles
        elif len(texts) > 0 and len(titles) == 0 and len(links) == 0:
            return texts
        else:
            results = {}
            results['texts'] = texts
            results['titles'] = titles
            results['links'] = links
            
            return results
        
    elif data.name == 'table':
        table_data = []

        header_rows = data.find_all('th')
        headers = [header.text.strip() for header in header_rows]

        body_rows = data.find('tbody').find_all('tr') if data.find('tbody') else data.find_all('tr')

        scraping_completed = False
        while not scraping_completed:
            for row in body_rows:
                row_data = {}
                cells = row.find_all('td')
                for index, cell in enumerate(cells):
                    header = headers[index]
                    cell_text = cell.text.strip()
                    row_data[header] = cell_text
                table_data.append(row_data)

            scraping_completed = True

        return table_data

    else:
        return None


def get_all_links(html_content: BeautifulSoup):
    content = html_content.find_all("a")
    return content


# gets all the texts in the passed html element 
def get_texts(html_content: BeautifulSoup):
    heading_tags = html_content.find_all('p')
    return heading_tags


# gets all the heading tags in a passed content # 
def get_page_titles(html_content: BeautifulSoup):
    heading_tags = html_content.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
    return heading_tags


# get one selected element by it's class name 
def get_one_by_classname(html_content: BeautifulSoup , tag: str , class_name: str):
        
    selected_element = html_content.find(tag, class_=class_name)
    return selected_element
    

# finds all the elements with passed class name
from bs4 import BeautifulSoup

def get_all_by_classname(html_content: BeautifulSoup, tag: str, class_name: str):
    selected_elements = html_content.find_all(tag, class_=class_name)
    return selected_elements



def filter_data(content: BeautifulSoup , filter_word: str):
    
    filter_word = filter_word.replace('"' , "").lower()

    results = []
    seen_elements = set()

    for element in content.find_all():
        if filter_word in element.text.lower() and element not in seen_elements:
            results.append(element)
            seen_elements.add(element)
    
    return list(seen_elements)
    
