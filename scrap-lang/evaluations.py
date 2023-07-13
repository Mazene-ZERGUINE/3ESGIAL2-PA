from urllib.parse import urlparse

from scraper.scraper import fetch_all, scrap_page_html, scrap_table



names = {}
functions = {}
global_vars = {}

def evalInst(p):
    # Normalement faire que 
    if p == 'empty' : return 

    if p[0] == 'bloc':
        evalInst(p[1])
        evalInst(p[2])
        return 
    if p[0] == 'global' : global_vars[p[1]] = evalExpr(p[2])
    if p[0] == 'ASSIGN':
        if type(p[1]) == tuple:
            eval_multi_assignes(p[1] , p[2])
        else:
            if evalExpr(p[2]) != 'undifined': 
                names[p[1]] = evalExpr(p[2])
            else:
                names[p[1]] = evalInst(p[2])
            
    if p[0] == 'PRINT':
        if len(p) == 3:

            print("scrape-lang >> " , evalExpr(p[2]))
            return evalInst(p[1])
        else:
            
            
            if evalExpr(p[1]) != 'undifined':
                print("scrap-lang >> ", evalExpr(p[1]))
                return evalInst(p[1])
            else:
                
                print("scrap-lang >> ", evalInst(p[1]))
                return evalInst(p[1])
    if p[0] == "IF": eval_if_elseif_else(p)
    if p[0] == "FOR" : eval_for_loop(p)
    if p[0] == "WHILE" : eval_while_loop(p)
    if p[0] == 'function' : eval_function(p) 
    if p[0] == 'CALL' : eval_function_call(p)
    if p[0] == 'RETURN' : print('scrap-lang >>  return value : ' , evalExpr(p[1]))
    if p[0] == 'is_html': return check_if_website(p)
    if p[0] == 'concat': return str_concat(p)
    if p[0] == 'scan' : return scrap_data(p)
    if p[0] == "table_id" : return get_table_by_id(p)
    if p[0] == 'fetch_all': return fetch_table_data(p)


    return 'undifined'

def fetch_table_data(p):
    if p[1] not in names: 
        raise Exception( p[1],"is not a table element")
    table_to_fetch = names[p[1]]
    
    data = fetch_all(table_to_fetch)
    return data

def get_table_by_id(p):
    content = names[p[1]]
    tabe_id = p[2]
    return scrap_table(content=content , table_id=tabe_id) 


def scrap_data(p):
    print("scraping")
    html_data = scrap_page_html(names[p[1]])
    return html_data
    

def str_concat(p):
    if isinstance(p, str):
        return evalExpr(p)
    elif len(p) > 1:
        return str_concat(p[1]) + str_concat(p[2])
    else:
        return str_concat(p[1])  

    
def check_if_website(p):
    parsed_url = urlparse(names[p[1]])
    
    if parsed_url.scheme.lower() not in ('http', 'https'):
        return False
    
    if not parsed_url.netloc:
        return False
    
    return True


def eval_multi_assignes(p , t):
    for item1 , item2 in zip(p , t):
        if isinstance(item1, tuple) and isinstance(item2 , tuple) :
            eval_multi_assignes(item1 , item2)
        else:
            names[item1] = item2 
def evalExpr(p):
    if type(p) == int : return p
    if type(p) == str : 
        if '"' in p :
            return p.replace('"' , "")
        if p not in names and p not in global_vars:
            raise Exception(p + " variable not initialized") 
        if p in global_vars :
            return global_vars[p]
        else:
            
            return names[p]
    if type(p) == tuple:
        if p[0] == '+' : return evalExpr(p[1])+evalExpr(p[2])
        if p[0] == '-' : return evalExpr(p[1])-evalExpr(p[2])
        if p[0] == '*' : return evalExpr(p[1])*evalExpr(p[2])
        if p[0] == '/' : return evalExpr(p[1])/evalExpr(p[2])
        if p[0] == 'AND' : return evalExpr(p[1]) and evalExpr(p[2])
        if p[0] == 'OR' : return evalExpr(p[1]) or evalExpr(p[2])
        if p[0] == '>' : return evalExpr(p[1]) > evalExpr(p[2])
        if p[0] == '<' : return evalExpr(p[1]) < evalExpr(p[2])
        if(p[0] == "==") : return evalExpr(p[1]) == evalExpr(p[2])
        if(p[0] == "!=") : return evalExpr(p[1]) != evalExpr(p[2])
        if(p[0] == "&") : return evalExpr(p[1]) & evalExpr(p[2])
        if(p[0] == "|") : return evalExpr(p[1]) | evalExpr(p[2])
        
    return 'undifined'

def eval_function(p):
    if p[3] == 'empty' :
        functions[p[1]] = p[2]
    else :
        functions[p[1]] = (p[2] , p[3])
        
        
def eval_function_call(p):
    if p[2] == 'empty':
        return evalInst(functions[p[1]])
    else:
        call_params = p[2]
        function_params = functions[p[1]][1]
        print(call_params)
        if(type(call_params) == int or type(function_params) == str) :
            names[function_params] = names[call_params]
            return evalInst(functions[p[1]][0])
        
        if type(call_params[0]) == int  :
            names[function_params[1]] = call_params[1]
            names[function_params[0]] = call_params[0]
            return evalInst(functions[p[1]][0])

        if(len(call_params) != len(function_params)):
            raise ValueError("function" + p[1] + "expectes " + len(function_params[0]) + 1 + "params")
        else :
            names[function_params[1]] = call_params[1]
            for i in range(len(call_params)):
                names[function_params[0][i]] = call_params[0][i]
        
        return evalInst(functions[p[1]][0]) 
    
              
def eval_for_loop(p):
    evalInst(p[1])
    if names[p[1][1]] < p[2] :
        while names[p[1][1]] <= p[2] :
            evalInst(p[4])
            evalInst(p[3])
    elif names[p[1][1]] > p[2] :
        while names[p[1][1]] >= p[2] :
            evalInst(p[4])
            evalInst(p[3]) 


def eval_while_loop(p):
    while  evalExpr(p[1]):
        evalInst(p[2])
    



def eval_if_elseif_else(p) : 
    
    if (len(p) == 3) : 
        if evalExpr(p[1]) != 'undifined':
            if evalExpr(p[1]) == True : return evalInst(p[2])
        else:
            if evalInst(p[1]) == True : return evalInst(p[2])
    elif len(p) == 4:
        if evalExpr(p[1]) == True : return evalInst(p[2]) 
        else : return evalInst(p[3])
    else :
        if evalExpr(p[1]) == True : return evalInst(p[2])
        elif evalExpr(p[3]) == True : return evalInst(p[4]) 
        else : return evalInst(p[5])

