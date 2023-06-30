names = {}
functions = {}
global_vars = {}

def evalInst(p):
    # Normalement faire que 

    if p == 'empty' : return 

    if type(p) != tuple : 
        print("inst non tuple")
        return 

    if p[0] == 'bloc':
        evalInst(p[1])
        evalInst(p[2])
        return 
    if p[0] == 'global' : global_vars[p[1]] = evalExpr(p[2])
    if p[0] == 'ASSIGN':
        if type(p[1]) == tuple:
            eval_multi_assignes(p[1] , p[2])
        else:    
            names[p[1]] = evalExpr(p[2])
            
    if p[0] == 'PRINT':
        if len(p) == 3:
            print("CALC >> " , evalExpr(p[2]))
            return evalInst(p[1])
        else:
            print("CALC >> ", evalExpr(p[1]))
    if p[0] == 'PRINTSTR' : print("CALC >> " , p[1].replace('"',''))
    if p[0] == "IF": eval_if_elseif_else(p)
    if p[0] == "FOR" : eval_for_loop(p)
    if p[0] == "WHILE" : eval_while_loop(p)
    if p[0] == 'function' : eval_function(p) 
    if p[0] == 'CALL' : eval_function_call(p)
    if p[0] == 'RETURN' : print('CALC >>  return value : ' , evalExpr(p[1]))

            

    return 'undifined'


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
            t = ('PRINTSTR' , p)
            return evalInst(t)
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

        if(type(call_params) == int or type(function_params) == str) :
            names[function_params] = call_params
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
        if evalExpr(p[1]) == True : return evalInst(p[2])
    elif len(p) == 4:
        if evalExpr(p[1]) == True : return evalInst(p[2]) 
        else : return evalInst(p[3])
    else :
        if evalExpr(p[1]) == True : return evalInst(p[2])
        elif evalExpr(p[3]) == True : return evalInst(p[4]) 
        else : return evalInst(p[5])

